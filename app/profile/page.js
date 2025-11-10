"use client";

import React, { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    college: "Jai Narain College of Technology",
    branch: "",
    cgpa: "",
    semester: {
      sem1: "",
      sem2: "",
      sem3: "",
      sem4: "",
      sem5: "",
      sem6: "",
      sem7: "",
      sem8: ""
    },
    skills: "",
    resume: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  // Prefill email & username from session
  useEffect(() => {
    if (session?.user?.email) {
      const email = session.user.email;
      const defaultUsername = email.split("@")[0]; // email without domain
      setFormData(prev => ({
        ...prev,
        email,
        username: prev.username || defaultUsername
      }));
    }

    // fetch existing profile data for this user (if you have an endpoint)
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data && data.email === session?.user?.email) {
            // merge found data
            setFormData(prev => ({ ...prev, ...data }));
          }
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    if (session?.user?.email) fetchProfile();
  }, [session]);

  // Compute aggregate CGPA whenever semester SGPA changes
  useEffect(() => {
    const sems = Object.values(formData.semester)
      .map(v => parseFloat(v))
      .filter(v => !Number.isNaN(v));
    if (sems.length === 0) {
      setFormData(prev => ({ ...prev, cgpa: "" }));
      return;
    }
    const sum = sems.reduce((a, b) => a + b, 0);
    const agg = sum / sems.length;
    // round to 2 decimals
    setFormData(prev => ({ ...prev, cgpa: agg ? agg.toFixed(2) : "" }));
  }, [formData.semester]);

  const handleChange = e => {
    const { name, value } = e.target;
    // support nested semester fields like name="sem1"
    if (/^sem\d+$/.test(name)) {
      setFormData(prev => ({
        ...prev,
        semester: { ...prev.semester, [name]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // resume upload via a simple file endpoint
  const handleResumeUpload = async e => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setMessage("Resume too large. Use file < 5MB.");
      return;
    }

    const form = new FormData();
    form.append("file", file);

    setMessage("Uploading resume...");
    try {
      const res = await fetch("/api/profile/upload", {
        method: "POST",
        body: form
      });
      const data = await res.json();
      if (res.ok && data.url) {
        setFormData(prev => ({ ...prev, resume: data.url }));
        setMessage("Resume uploaded ✅");
      } else {
        setMessage(data?.message || "Upload failed ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Upload error ❌");
    }
  };

  const validate = () => {
    const errs = {};

    // required: name, username, cgpa (aggregate), college (already set but mark)
    if (!formData.name?.trim()) errs.name = "Full name is required";
    if (!formData.username?.trim()) errs.username = "Username is required";
    // cgpa required
    if (!formData.cgpa || Number.isNaN(parseFloat(formData.cgpa))) {
      errs.cgpa = "Aggregate CGPA is required";
    } else {
      const c = parseFloat(formData.cgpa);
      if (c < 0 || c > 10) errs.cgpa = "CGPA must be between 0 and 10";
    }

    // branch required
    if (!formData.branch) errs.branch = "Branch is required";

    // optional: at least one semester value? We won't force all, but if provided, must be 0-10
    Object.entries(formData.semester).forEach(([k, v]) => {
      if (v && (isNaN(parseFloat(v)) || parseFloat(v) < 0 || parseFloat(v) > 10)) {
        errs[k] = "SGPA must be 0 - 10";
      }
    });

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    setMessage("");
    if (!validate()) {
      setMessage("Please fix the red fields ✖");
      return;
    }

    setLoading(true);
    try {
      // include session email as canonical key
      const payload = { ...formData, email: session?.user?.email || formData.email };

      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        setMessage(data.message || "Profile saved ✅");
      } else {
        setMessage(data.message || "Save failed ❌");
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-gray-600 mb-4">Please log in to view your profile.</p>
        <button onClick={() => signIn()} className="bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 py-16 px-4 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-sky-800 mb-4">Your Profile</h2>
        <p className="text-sm text-gray-500 mb-6">Update your information below. Fields with <span className="text-red-600">*</span> are required.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Email (readonly) */}
          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input value={formData.email} readOnly className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-700" />
          </div>

          {/* Username (prefilled from email but editable) */}
          <div>
            <label className="block text-gray-700 font-medium">Username <span className="text-red-600">*</span></label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={`w-full mt-1 p-3 border rounded-xl focus:ring-2 ${errors.username ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-sky-300"}`}
            />
            {errors.username && <p className="text-sm text-red-600 mt-1">{errors.username}</p>}
          </div>

          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium">Full Name <span className="text-red-600">*</span></label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full mt-1 p-3 border rounded-xl focus:ring-2 ${errors.name ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-sky-300"}`}
              placeholder="Your full name"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          {/* College (readonly) */}
          <div>
            <label className="block text-gray-700 font-medium">College <span className="text-red-600">*</span></label>
            <input
              name="college"
              value={formData.college}
              readOnly
              className="w-full mt-1 p-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-700"
            />
          </div>

          {/* Branch */}
          <div>
            <label className="block text-gray-700 font-medium">Branch <span className="text-red-600">*</span></label>
            <select
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className={`w-full mt-1 p-3 border rounded-xl focus:ring-2 ${errors.branch ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-sky-300"}`}
            >
              <option value="">Choose branch</option>
              <option value="CSE">Computer Science (CSE)</option>
              <option value="IT">Information Technology (IT)</option>
              <option value="ECE">Electronics & Communication (ECE)</option>
              <option value="ME">Mechanical (ME)</option>
              <option value="CE">Civil (CE)</option>
            </select>
            {errors.branch && <p className="text-sm text-red-600 mt-1">{errors.branch}</p>}
          </div>

          {/* Aggregate CGPA (computed) */}
          <div>
            <label className="block text-gray-700 font-medium">Aggregate CGPA <span className="text-red-600">*</span></label>
            <input
              name="cgpa"
              value={formData.cgpa}
              onChange={handleChange}
              className={`w-full mt-1 p-3 border rounded-xl focus:ring-2 ${errors.cgpa ? "border-red-500 focus:ring-red-300" : "border-gray-300 focus:ring-sky-300"}`}
            />
            {errors.cgpa && <p className="text-sm text-red-600 mt-1">{errors.cgpa}</p>}
            <p className="text-xs text-gray-400 mt-1">Aggregate is auto-calculated from entered SGPA values (you can still edit if needed).</p>
          </div>
        </div>

        {/* Semester SGPA section */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Semester SGPA (enter what you have)</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Array.from({ length: 8 }, (_, i) => {
              const key = `sem${i + 1}`;
              return (
                <div key={key}>
                  <label className="block text-gray-600">Sem {i + 1}</label>
                  <input
                    name={key}
                    value={formData.semester[key]}
                    onChange={handleChange}
                    placeholder="e.g., 8.5"
                    className={`w-full mt-1 p-3 border rounded-xl ${errors[key] ? "border-red-500" : "border-gray-300"}`}
                  />
                  {errors[key] && <p className="text-xs text-red-600 mt-1">{errors[key]}</p>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium">Skills</label>
          <textarea name="skills" value={formData.skills} onChange={handleChange} rows={3}
            className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-300"
            placeholder="React, Node, DS & Algo, ML..." />
        </div>

        {/* Resume upload custom UI */}
        <div className="mt-6">
          <label className="block text-gray-700 font-medium">Resume (PDF)</label>

          <label
            htmlFor="resume-upload"
            className="mt-2 flex items-center gap-3 cursor-pointer select-none border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-sky-500 hover:bg-sky-50 transition"
            title="Click to upload resume"
            style={{ cursor: "pointer" }}
          >
            <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M3 15.75V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3.25M7 9l5-5 5 5M12 4v12" /></svg>
            <div>
              <div className="font-medium text-gray-700">Click to upload or drag file here</div>
              <div className="text-xs text-gray-500">PDF only, max 5MB</div>
            </div>
            <input id="resume-upload" type="file" accept=".pdf" onChange={handleResumeUpload} className="hidden" />
          </label>

          {formData.resume ? (
            <p className="mt-2 text-sm text-green-600">Uploaded: <a href={formData.resume} target="_blank" className="underline text-sky-600">View resume</a></p>
          ) : (
            <p className="mt-2 text-sm text-gray-500">No resume uploaded yet.</p>
          )}
        </div>

        {/* Save/button */}
        <div className="mt-6">
          <button onClick={handleSave}
            disabled={loading}
            className={`w-full px-6 py-3 rounded-xl text-white font-semibold ${loading ? "bg-sky-400 cursor-not-allowed" : "bg-sky-600 hover:bg-sky-700"}`}>
            {loading ? "Saving..." : "Save Profile"}
          </button>

          {message && <p className="mt-3 text-center text-sm text-sky-700">{message}</p>}
        </div>
      </div>
    </div>
  );
}
