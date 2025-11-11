// "use client";
// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function TeacherTaskPage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // ✅ Protect route
//   useEffect(() => {
//     if (status === "loading") return;
//     if (!session) router.push("/login");
//     else if (session.user.role !== "teacher") router.push("/profile");
//   }, [session, status, router]);

//   // ✅ Fetch students
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await fetch("/api/assign");
//         const data = await res.json();
//         setStudents(data.students || []);
//       } catch (err) {
//         console.error("Error fetching students:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // ✅ Assign Task (Final working version)
//   const handleAssignTask = async (
//     email,
//     skill,
//     title,
//     description,
//     file,
//     dueDate
//   ) => {
//     if (!skill || !title.trim()) {
//       alert("Please select a skill and enter a title!");
//       return;
//     }

//     let attachmentUrl = "";
//     if (file) {
//       try {
//         const formData = new FormData();
//         formData.append("file", file);

//         // ✅ Upload file to Cloudinary via /api/upload route
//         const uploadRes = await fetch("/api/upload", {
//           method: "POST",
//           body: formData,
//         });
//         const uploadData = await uploadRes.json();

//         if (uploadRes.ok && uploadData.url) {
//           attachmentUrl = uploadData.url;
//           console.log("📎 File uploaded to:", attachmentUrl);
//         } else {
//           console.error("Upload failed:", uploadData);
//           alert("Error uploading file ❌");
//           return;
//         }
//       } catch (err) {
//         console.error("Upload error:", err);
//         alert("Error uploading file ❌");
//         return;
//       }
//     }

//     // ✅ Prepare final payload
//     const payload = {
//       email,
//       skill,
//       title,
//       description,
//       attachment: attachmentUrl, // 👈 Cloudinary link
//       type: "assignment",
//       dueDate,
//     };

//     console.log("📤 Sending task payload:", payload);

//     try {
//       const res = await fetch("/api/tasks/assign", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Assignment assigned successfully!");
//       } else {
//         alert(data.error || "Failed to assign task ❌");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error ❌");
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center text-lg text-sky-700 font-semibold">
//         Loading students...
//       </div>
//     );

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8">
//       <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-4">
//         <div>
//           <h1 className="text-3xl font-bold text-emerald-700">
//             Task & Quiz Assignment Center 📝
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Assign assignments or create quizzes with files, questions, and due
//             dates 🚀
//           </p>
//         </div>
//       </header>

//       <section>
//         {students.length === 0 ? (
//           <p className="text-gray-600 text-center">No students found yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {students.map((student, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-emerald-400 hover:shadow-xl transition"
//               >
//                 <h3 className="text-lg font-semibold text-sky-800">
//                   {student.username}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{student.email}</p>
//                 <p className="text-sm mt-1">
//                   <strong>Enrollment:</strong> {student.enrollment || "N/A"}
//                 </p>
//                 <p className="text-sm mb-3">
//                   <strong>Branch:</strong> {student.branch || "N/A"}
//                 </p>

//                 {/* Assignment Form */}
//                 <div className="mt-2 bg-gradient-to-b from-sky-50 to-white border border-sky-100 rounded-xl p-3">
//                   <p className="text-sm font-medium text-sky-700 mb-2">
//                     Assign Assignment 💡
//                   </p>

//                   {/* Skill */}
//                   <select
//                     id={`skill-${idx}`}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 text-sm focus:ring-2 focus:ring-emerald-400"
//                   >
//                     <option value="">-- Select a Skill --</option>
//                     <optgroup label="Soft Skills 🗣️">
//                       <option value="Communication">Communication</option>
//                       <option value="Confidence">Confidence</option>
//                       <option value="Teamwork">Teamwork</option>
//                       <option value="Leadership">Leadership</option>
//                       <option value="Problem Solving">Problem Solving</option>
//                       <option value="Attitude">Attitude</option>
//                     </optgroup>
//                     <optgroup label="Technical Skills 💻">
//                       <option value="Data Structures & Algorithms">
//                         Data Structures & Algorithms
//                       </option>
//                       <option value="Web Development">Web Development</option>
//                       <option value="Database Management">
//                         Database Management
//                       </option>
//                       <option value="AI / Machine Learning">
//                         AI / Machine Learning
//                       </option>
//                     </optgroup>
//                   </select>

//                   {/* Title */}
//                   <input
//                     type="text"
//                     id={`title-${idx}`}
//                     placeholder="Enter title..."
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2 focus:ring-2 focus:ring-emerald-400"
//                   />

//                   {/* Description */}
//                   <textarea
//                     id={`desc-${idx}`}
//                     placeholder="Add description or instructions..."
//                     rows="3"
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2 focus:ring-2 focus:ring-emerald-400"
//                   ></textarea>

//                   {/* File Upload */}
//                   <label
//                     htmlFor={`file-${idx}`}
//                     className="block text-sm text-gray-700 font-medium mb-1"
//                   >
//                     Upload File (optional)
//                   </label>
//                   <input
//                     type="file"
//                     id={`file-${idx}`}
//                     className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 mb-2"
//                   />

//                   {/* Due Date */}
//                   <label className="block text-sm text-gray-700 font-medium mb-1">
//                     Due Date (optional)
//                   </label>
//                   <input
//                     type="date"
//                     id={`due-${idx}`}
//                     className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:ring-2 focus:ring-emerald-400"
//                   />

//                   {/* Assign Button */}
//                   <button
//                     onClick={() =>
//                       handleAssignTask(
//                         student.email,
//                         document.getElementById(`skill-${idx}`).value,
//                         document.getElementById(`title-${idx}`).value,
//                         document.getElementById(`desc-${idx}`).value,
//                         document.getElementById(`file-${idx}`)?.files[0],
//                         document.getElementById(`due-${idx}`).value
//                       )
//                     }
//                     className="bg-emerald-600 hover:bg-emerald-700 text-white w-full py-2 rounded-lg font-semibold text-sm transition mb-2"
//                   >
//                     📘 Assign Assignment
//                   </button>

//                   {/* ➕ Navigate to Quiz Creation */}
//                   <button
//                     onClick={() =>
//                       router.push(
//                         `/teacher/quiz-setup?student=${encodeURIComponent(
//                           student.email
//                         )}`
//                       )
//                     }
//                     className="bg-amber-500 hover:bg-amber-600 text-white w-full py-2 rounded-lg font-semibold text-sm transition"
//                   >
//                     ➕ Add Quiz
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TeacherTaskPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false); // ✅ Added

  // ✅ Protect route
  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
    else if (session.user.role !== "teacher") router.push("/profile");
  }, [session, status, router]);

  // ✅ Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/assign");
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

  // ✅ Assign Task (with uploading state)
  const handleAssignTask = async (
    email,
    skill,
    title,
    description,
    file,
    dueDate
  ) => {
    if (!skill || !title.trim()) {
      alert("Please select a skill and enter a title!");
      return;
    }

    setUploading(true); // 🔹 Start uploading state
    let attachmentUrl = "";

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();

        if (uploadRes.ok && uploadData.url) {
          attachmentUrl = uploadData.url;
          console.log("📎 File uploaded to:", attachmentUrl);
        } else {
          console.error("Upload failed:", uploadData);
          alert("Error uploading file ❌");
          setUploading(false);
          return;
        }
      } catch (err) {
        console.error("Upload error:", err);
        alert("Error uploading file ❌");
        setUploading(false);
        return;
      }
    }

    // ✅ Final payload
    const payload = {
      email,
      skill,
      title,
      description,
      attachment: attachmentUrl,
      type: "assignment",
      dueDate,
    };

    console.log("📤 Sending task payload:", payload);

    try {
      const res = await fetch("/api/tasks/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Assignment assigned successfully!");
      } else {
        alert(data.error || "Failed to assign task ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    } finally {
      setUploading(false); // 🔹 End uploading
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-sky-700 font-semibold">
        Loading students...
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8">
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-emerald-700">
            Task & Quiz Assignment Center 📝
          </h1>
          <p className="text-gray-600 mt-2">
            Assign assignments or create quizzes with files, questions, and due
            dates 🚀
          </p>
        </div>
      </header>

      <section>
        {students.length === 0 ? (
          <p className="text-gray-600 text-center">No students found yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-emerald-400 hover:shadow-xl transition"
              >
                <h3 className="text-lg font-semibold text-sky-800">
                  {student.username}
                </h3>
                <p className="text-gray-600 text-sm">{student.email}</p>
                <p className="text-sm mt-1">
                  <strong>Enrollment:</strong> {student.enrollment || "N/A"}
                </p>
                <p className="text-sm mb-3">
                  <strong>Branch:</strong> {student.branch || "N/A"}
                </p>

                {/* Assignment Form */}
                <div className="mt-2 bg-gradient-to-b from-sky-50 to-white border border-sky-100 rounded-xl p-3">
                  <p className="text-sm font-medium text-sky-700 mb-2">
                    Assign Assignment 💡
                  </p>

                  {/* Skill */}
                  <select
                    id={`skill-${idx}`}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 text-sm focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="">-- Select a Skill --</option>
                    <optgroup label="Soft Skills 🗣️">
                      <option value="Communication">Communication</option>
                      <option value="Confidence">Confidence</option>
                      <option value="Teamwork">Teamwork</option>
                      <option value="Leadership">Leadership</option>
                      <option value="Problem Solving">Problem Solving</option>
                      <option value="Attitude">Attitude</option>
                    </optgroup>
                    <optgroup label="Technical Skills 💻">
                      <option value="Data Structures & Algorithms">
                        Data Structures & Algorithms
                      </option>
                      <option value="Web Development">Web Development</option>
                      <option value="Database Management">
                        Database Management
                      </option>
                      <option value="AI / Machine Learning">
                        AI / Machine Learning
                      </option>
                    </optgroup>
                  </select>

                  {/* Title */}
                  <input
                    type="text"
                    id={`title-${idx}`}
                    placeholder="Enter title..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2 focus:ring-2 focus:ring-emerald-400"
                  />

                  {/* Description */}
                  <textarea
                    id={`desc-${idx}`}
                    placeholder="Add description or instructions..."
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-2 focus:ring-2 focus:ring-emerald-400"
                  ></textarea>

                  {/* File Upload */}
                  <label
                    htmlFor={`file-${idx}`}
                    className="block text-sm text-gray-700 font-medium mb-1"
                  >
                    Upload File (optional)
                  </label>
                  <input
                    type="file"
                    id={`file-${idx}`}
                    className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 mb-2"
                  />

                  {/* Due Date */}
                  <label className="block text-sm text-gray-700 font-medium mb-1">
                    Due Date (optional)
                  </label>
                  <input
                    type="date"
                    id={`due-${idx}`}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-3 focus:ring-2 focus:ring-emerald-400"
                  />

                  {/* Assign Button */}
                  <button
                    onClick={() =>
                      !uploading &&
                      handleAssignTask(
                        student.email,
                        document.getElementById(`skill-${idx}`).value,
                        document.getElementById(`title-${idx}`).value,
                        document.getElementById(`desc-${idx}`).value,
                        document.getElementById(`file-${idx}`)?.files[0],
                        document.getElementById(`due-${idx}`).value
                      )
                    }
                    disabled={uploading}
                    className={`w-full py-2 rounded-lg font-semibold text-sm transition mb-2 ${
                      uploading
                        ? "bg-gray-400 cursor-not-allowed text-white"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white"
                    }`}
                  >
                    {uploading ? "⏳ Uploading..." : "📘 Assign Assignment"}
                  </button>

                  {/* ➕ Navigate to Quiz Creation */}
                  <button
                    onClick={() =>
                      router.push(
                        `/teacher/quiz-setup?student=${encodeURIComponent(
                          student.email
                        )}`
                      )
                    }
                    className="bg-amber-500 hover:bg-amber-600 text-white w-full py-2 rounded-lg font-semibold text-sm transition"
                  >
                    ➕ Add Quiz or Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

