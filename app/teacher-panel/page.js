"use client";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TeacherPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState("");

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading session...</p>
      </div>
    );
  }

  if (!session || session.user.role !== "teacher") {
    router.push("/dashboard");
    return null;
  }

  const loadStudent = async () => {
    setLoading(true);
    const res = await fetch(`/api/student/${email}`);
    const data = await res.json();
    setProfile(data);
    setLoading(false);
  };

  const updateSkill = async (type, name, teacherScore, feedback) => {
    await fetch("/api/teacher/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        skillType: type,
        skillName: name,
        teacherScore,
        feedback,
      }),
    });
    loadStudent();
  };

  const assignTask = async () => {
    await fetch("/api/tasks/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, skill: "General", title: task }),
    });
    setTask("");
    loadStudent();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-emerald-50 p-8 md:p-16">
      <h1 className="text-4xl font-bold text-sky-800 mb-6 text-center">
        Teacher Panel 🎓
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center gap-3 mb-8">
        <input
          type="email"
          placeholder="Enter student email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-xl w-80 focus:ring-2 focus:ring-sky-400"
        />
        <button
          onClick={loadStudent}
          className="bg-sky-600 text-white px-6 py-2 rounded-xl hover:bg-sky-700 transition"
        >
          Load
        </button>
      </div>

      {loading && <p className="text-center">Loading student data...</p>}

      {profile && (
        <div className="bg-white p-6 rounded-2xl shadow-lg max-w-4xl mx-auto">
          <h2 className="text-2xl font-semibold text-sky-700 mb-4">
            {profile.userId}'s Progress 📊
          </h2>

          {/* Skills */}
          {["softSkills", "techSkills"].map((type) => (
            <div key={type} className="mb-6">
              <h3 className="text-xl font-bold text-emerald-700 mb-3 capitalize">
                {type === "softSkills" ? "Soft Skills 🌿" : "Technical Skills 💻"}
              </h3>
              {profile[type].map((s, idx) => (
                <div
                  key={idx}
                  className="border rounded-xl p-4 mb-3 hover:bg-sky-50 transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-sm text-gray-600">
                      AI: {s.aiScore}% | Teacher: {s.teacherScore}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={s.teacherScore}
                    onChange={(e) =>
                      updateSkill(type, s.name, e.target.value, s.feedback)
                    }
                    className="w-full accent-sky-600"
                  />
                  <textarea
                    placeholder="Teacher feedback..."
                    defaultValue={s.feedback}
                    onBlur={(e) =>
                      updateSkill(type, s.name, s.teacherScore, e.target.value)
                    }
                    className="w-full border rounded-xl p-2 mt-2 text-sm"
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Task Assign */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-sky-700 mb-3">
              Assign Task ✏️
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Enter task description..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border px-4 py-2 rounded-xl flex-1"
              />
              <button
                onClick={assignTask}
                className="bg-emerald-600 text-white px-6 py-2 rounded-xl hover:bg-emerald-700"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
