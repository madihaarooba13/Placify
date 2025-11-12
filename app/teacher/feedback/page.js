// "use client";
// import React, { useEffect, useState } from "react";

// export default function TeacherFeedbackPage() {
//   const [students, setStudents] = useState([]);
//   const [selected, setSelected] = useState(null);
//   const [feedbackText, setFeedbackText] = useState("");
//   const [rating, setRating] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);

//   // ✅ Fetch all student profiles
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await fetch("/api/performance");
//         const data = await res.json();
//         if (data?.students) setStudents(data.students);
//       } catch (err) {
//         console.error("Error fetching students:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // ✅ Submit feedback to backend
//   const handleSubmit = async () => {
//     if (!selected || !feedbackText.trim() || !rating) {
//       alert("Please select a student and fill both feedback and rating.");
//       return;
//     }

//     setSaving(true);
//     try {
//       const res = await fetch("/api/profile", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: selected.email,
//           feedback: {
//             feedback: feedbackText,
//             rating: rating,
//             date: new Date(),
//           },
//         }),
//       });

//       const result = await res.json();
//       if (result.success) {
//         alert("✅ Feedback submitted successfully!");
//         setFeedbackText("");
//         setRating("");
//       } else {
//         alert("❌ Failed to save feedback.");
//       }
//     } catch (error) {
//       console.error("Error saving feedback:", error);
//       alert("Server error occurred.");
//     } finally {
//       setSaving(false);
//     }
//   };

//   if (loading)
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-sky-50">
//         <div className="text-sky-700 font-semibold animate-pulse">
//           Loading student data…
//         </div>
//       </main>
//     );

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 p-8">
//       <h1 className="text-3xl font-bold text-center text-sky-800 mb-8">
//         🧑‍🏫 Teacher Feedback Panel
//       </h1>
//       <p className="text-center text-gray-600 mb-10">
//         Select a student, view their progress, and submit personalized feedback.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {/* Student List */}
//         <div className="bg-white shadow-md p-4 rounded-xl border border-gray-100 overflow-y-auto max-h-[75vh]">
//           <h2 className="text-lg font-semibold text-sky-700 mb-3">
//             👩‍🎓 Students
//           </h2>
//           {students.length > 0 ? (
//             students.map((s, i) => (
//               <div
//                 key={i}
//                 onClick={() => setSelected(s)}
//                 className={`cursor-pointer p-3 rounded-lg mb-2 border ${
//                   selected?.email === s.email
//                     ? "bg-sky-100 border-sky-400"
//                     : "hover:bg-sky-50 border-gray-200"
//                 }`}
//               >
//                 <p className="font-medium text-gray-800">{s.username}</p>
//                 <p className="text-sm text-gray-600">{s.email}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-sm">No students found.</p>
//           )}
//         </div>

//         {/* Student Detail + Feedback Form */}
//         <div className="md:col-span-2 bg-white shadow-md rounded-2xl p-6 border border-gray-100">
//           {selected ? (
//             <>
//               <div className="mb-4">
//                 <h2 className="text-xl font-semibold text-sky-700 mb-1">
//                   {selected.username}
//                 </h2>
//                 <p className="text-sm text-gray-600">{selected.email}</p>
//                 <p className="text-sm text-gray-500">
//                   Branch: {selected.branch} | College: {selected.college}
//                 </p>
//               </div>

//               {/* Quick Stats */}
//               <div className="grid grid-cols-2 gap-3 mb-6">
//                 <div className="bg-sky-50 rounded-xl p-3 text-center">
//                   <p className="text-xs text-gray-500">Avg Quiz Score</p>
//                   <p className="text-lg font-bold text-sky-700">
//                     {selected.insights.avgScore}%
//                   </p>
//                 </div>
//                 <div className="bg-emerald-50 rounded-xl p-3 text-center">
//                   <p className="text-xs text-gray-500">Task Completion</p>
//                   <p className="text-lg font-bold text-emerald-700">
//                     {selected.insights.taskCompletion}%
//                   </p>
//                 </div>
//               </div>

//               {/* Feedback Input */}
//               <div>
//                 <label className="block font-semibold text-sky-700 mb-2">
//                   Feedback Message 📝
//                 </label>
//                 <textarea
//                   rows={4}
//                   value={feedbackText}
//                   onChange={(e) => setFeedbackText(e.target.value)}
//                   placeholder="Write your feedback for this student..."
//                   className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300"
//                 />

//                 <label className="block mt-4 font-semibold text-sky-700 mb-2">
//                   Rating (out of 10) ⭐
//                 </label>
//                 <input
//                   type="number"
//                   min="1"
//                   max="10"
//                   value={rating}
//                   onChange={(e) => setRating(e.target.value)}
//                   className="w-24 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-sky-300"
//                 />

//                 <div className="mt-6">
//                   <button
//                     onClick={handleSubmit}
//                     disabled={saving}
//                     className={`${
//                       saving
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-sky-600 hover:bg-sky-700"
//                     } text-white px-6 py-2 rounded-xl font-semibold transition-transform hover:scale-105`}
//                   >
//                     {saving ? "Saving..." : "Submit Feedback ✅"}
//                   </button>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <div className="text-center text-gray-500 mt-20">
//               Select a student from the left to review or add feedback 👈
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";

export default function TeacherFullFeedbackPage() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Fetch all students and their skill data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/performance");
        const data = await res.json();
        setStudents(data.students || []);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // ✅ Load selected student skill data
  const loadStudentSkills = async (email) => {
    try {
      const res = await fetch(`/api/skills?userId=${email}`);
      const data = await res.json();
      setSkills([
        ...(data.softSkills || []),
        ...(data.techSkills || []),
      ]);
      setSelected(students.find((s) => s.email === email));
    } catch (err) {
      console.error("Error loading skill data:", err);
    }
  };

  // ✅ Handle update and save
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/skills/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selected.email,
          updatedSkills: skills,
        }),
      });
      const data = await res.json();
      if (res.ok) alert("✅ Updated successfully!");
      else alert(data.message || "Error updating");
    } catch (err) {
      console.error("Save error:", err);
      alert("Server error");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Handle local edits
  const handleEdit = (index, field, value) => {
    const updated = [...skills];
    updated[index][field] = value;
    setSkills(updated);
  };

  if (loading)
    return (
      <main className="min-h-screen flex justify-center items-center bg-sky-50">
        <div className="text-sky-600 font-semibold animate-pulse">
          Loading students…
        </div>
      </main>
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-sky-50 p-8">
      <h1 className="text-3xl font-bold text-center text-sky-800 mb-6">
        🧑‍🏫 Teacher Skill & Feedback Control
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 🧩 Student List */}
        <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 overflow-y-auto max-h-[80vh]">
          <h2 className="font-semibold text-sky-700 mb-3">Students</h2>
          {students.map((s, i) => (
            <div
              key={i}
              onClick={() => loadStudentSkills(s.email)}
              className={`cursor-pointer p-3 rounded-lg mb-2 border ${
                selected?.email === s.email
                  ? "bg-sky-100 border-sky-400"
                  : "hover:bg-sky-50 border-gray-200"
              }`}
            >
              <p className="font-medium text-gray-800">{s.username}</p>
              <p className="text-sm text-gray-600">{s.email}</p>
            </div>
          ))}
        </div>

        {/* 🧠 Skill Control Panel */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          {!selected ? (
            <p className="text-gray-500 text-center mt-20">
              Select a student to view & edit their skills 👈
            </p>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-sky-700 mb-4">
                Editing: {selected.username}
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                Email: {selected.email} | Branch: {selected.branch || "N/A"}
              </p>

              {/* Skill Editing Table */}
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-sky-50 text-sky-800 border-b">
                      <th className="p-2 text-left">Skill</th>
                      <th className="p-2">AI %</th>
                      <th className="p-2">Teacher %</th>
                      <th className="p-2">Task %</th>
                      <th className="p-2">Feedback</th>
                      <th className="p-2">Tips / Goals</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((s, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium text-gray-800">
                          {s.name}
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={s.aiScore}
                            className="w-16 border rounded px-2 py-1"
                            onChange={(e) =>
                              handleEdit(i, "aiScore", e.target.value)
                            }
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={s.teacherScore}
                            className="w-16 border rounded px-2 py-1"
                            onChange={(e) =>
                              handleEdit(i, "teacherScore", e.target.value)
                            }
                          />
                        </td>
                        <td className="p-2">
                          <input
                            type="number"
                            value={s.taskScore}
                            className="w-16 border rounded px-2 py-1"
                            onChange={(e) =>
                              handleEdit(i, "taskScore", e.target.value)
                            }
                          />
                        </td>
                        <td className="p-2">
                          <textarea
                            rows={2}
                            value={s.feedback || ""}
                            className="border rounded px-2 py-1 w-full"
                            onChange={(e) =>
                              handleEdit(i, "feedback", e.target.value)
                            }
                          ></textarea>
                        </td>
                        <td className="p-2">
                          <textarea
                            rows={2}
                            value={(s.tips || s.goals)?.join(", ") || ""}
                            className="border rounded px-2 py-1 w-full"
                            onChange={(e) =>
                              handleEdit(
                                i,
                                s.tips ? "tips" : "goals",
                                e.target.value.split(",")
                              )
                            }
                          ></textarea>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className={`px-6 py-2 rounded-xl font-semibold text-white transition-transform hover:scale-105 ${
                    saving
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-sky-600 hover:bg-sky-700"
                  }`}
                >
                  {saving ? "Saving..." : "💾 Save All Changes"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
