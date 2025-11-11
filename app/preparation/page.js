// "use client";
// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function PreparationModulePage() {
//   const { data: session } = useSession();
//   const router = useRouter();
//   const [tasks, setTasks] = useState([]);
//   const [quizzes, setQuizzes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] = useState(false);

//   // ✅ Fetch assignments & quizzes
//   useEffect(() => {
//     if (!session?.user?.email) return;

//     const fetchData = async () => {
//       try {
//         const res = await fetch(`/api/skills?userId=${session.user.email}`);
//         const data = await res.json();
//         setTasks(data.tasks || []);
//         setQuizzes(data.quizzes || []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [session]);

//   // ✅ Upload completed assignment
//   const handleFileUpload = async (taskIndex, file) => {
//     if (!file) return alert("Please select a file first!");
//     if (file.size > 5 * 1024 * 1024)
//       return alert("File too large! Max 5MB allowed.");

//     setUploading(true);
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("taskIndex", taskIndex);
//     formData.append("email", session.user.email);

//     try {
//       const res = await fetch("/api/tasks/submit", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Assignment submitted successfully!");
//         setTasks(data.tasks);
//       } else {
//         alert(data.error || "Upload failed ❌");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Server error ❌");
//     } finally {
//       setUploading(false);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-sky-700 font-semibold">
//         Loading preparation data...
//       </div>
//     );

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 py-12 px-6 md:px-16">
//       <h1 className="text-4xl font-bold text-center text-sky-800 mb-10">
//         📚 Preparation Module
//       </h1>

//       {/* ASSIGNMENTS SECTION */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold text-sky-700 mb-4 border-b pb-2">
//           📘 Assignments
//         </h2>

//         {tasks.length === 0 ? (
//           <p className="text-center text-gray-500">No assignments assigned yet.</p>
//         ) : (
//           <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
//             <table className="min-w-full table-auto text-sm text-gray-700">
//               <thead className="bg-sky-100 text-sky-800">
//                 <tr>
//                   <th className="px-4 py-3 text-left">S.No</th>
//                   <th className="px-4 py-3 text-left">Title</th>
//                   <th className="px-4 py-3 text-left">Description</th>
//                   <th className="px-4 py-3 text-left">Due Date</th>
//                   <th className="px-4 py-3 text-left">Attachment</th>
//                   <th className="px-4 py-3 text-left">Status</th>
//                   <th className="px-4 py-3 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tasks.map((task, idx) => (
//                   <tr
//                     key={idx}
//                     className="border-t hover:bg-sky-50 transition-all"
//                   >
//                     <td className="px-4 py-3">{idx + 1}</td>
//                     <td className="px-4 py-3 font-medium">{task.title}</td>
//                     <td className="px-4 py-3 max-w-[250px] truncate">{task.description || "—"}</td>
//                     <td className="px-4 py-3">
//                       {task.dueDate
//                         ? new Date(task.dueDate).toLocaleDateString()
//                         : "—"}
//                     </td>
//                     <td className="px-4 py-3">
//                       {task.attachment ? (
//                         <a
//                           href={task.attachment}
//                           target="_blank"
//                           className="text-sky-600 underline"
//                         >
//                           View File
//                         </a>
//                       ) : (
//                         "—"
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       {task.completed || task.submission ? (
//                         <span className="text-green-600 font-semibold">✅ Completed</span>
//                       ) : (
//                         <span className="text-orange-500 font-semibold">Pending</span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       {task.submission ? (
//                         <span className="text-sm text-gray-500">Uploaded</span>
//                       ) : (
//                         <div>
//                           <input
//                             type="file"
//                             className="text-xs mb-1"
//                             onChange={(e) =>
//                               handleFileUpload(idx, e.target.files?.[0])
//                             }
//                             disabled={uploading}
//                           />
//                           <button
//                             disabled={uploading}
//                             className={`px-3 py-1 rounded-lg text-white text-xs ${
//                               uploading
//                                 ? "bg-gray-400"
//                                 : "bg-emerald-600 hover:bg-emerald-700"
//                             }`}
//                           >
//                             {uploading ? "Uploading..." : "Upload"}
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </section>

//       {/* QUIZZES SECTION */}
//       <section>
//         <h2 className="text-2xl font-semibold text-emerald-700 mb-4 border-b pb-2">
//           🧩 Quizzes
//         </h2>

//         {quizzes.length === 0 ? (
//           <p className="text-center text-gray-500">No quizzes assigned yet.</p>
//         ) : (
//           <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
//             <table className="min-w-full table-auto text-sm text-gray-700">
//               <thead className="bg-emerald-100 text-emerald-800">
//                 <tr>
//                   <th className="px-4 py-3 text-left">S.No</th>
//                   <th className="px-4 py-3 text-left">Title</th>
//                   <th className="px-4 py-3 text-left">Skill</th>
//                   <th className="px-4 py-3 text-left">Questions</th>
//                   <th className="px-4 py-3 text-center">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {quizzes.map((quiz, idx) => (
//                   <tr
//                     key={idx}
//                     className="border-t hover:bg-emerald-50 transition-all"
//                   >
//                     <td className="px-4 py-3">{idx + 1}</td>
//                     <td className="px-4 py-3 font-medium">{quiz.title}</td>
//                     <td className="px-4 py-3">{quiz.skill}</td>
//                     <td className="px-4 py-3">{quiz.quiz?.length || 0}</td>
//                     <td className="px-4 py-3 text-center">
//                       <button
//                         onClick={() =>
//                           router.push(`/dashboard/quizzes/${idx}`)
//                         }
//                         className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-xs transition"
//                       >
//                         Start Quiz ➡️
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
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

export default function PreparationModulePage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState({});

  // ✅ Fetch tasks + quizzes
  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/skills?userId=${session.user.email}`);
        const data = await res.json();
        setTasks(data.tasks || []);
        setQuizzes(data.quizzes || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session]);

  // ✅ Handle file upload
  const handleFileUpload = async (taskIndex, file) => {
    if (!file) return alert("Please select a file first!");
    if (file.size > 5 * 1024 * 1024)
      return alert("File too large! Max 5MB allowed.");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("taskIndex", taskIndex);
    formData.append("email", session.user.email);

    try {
      const res = await fetch("/api/tasks/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Assignment submitted successfully!");
        // Update task list with new status
        setTasks(data.tasks);
        setSelectedFiles((prev) => {
          const newFiles = { ...prev };
          delete newFiles[taskIndex];
          return newFiles;
        });
      } else {
        alert(data.error || "Upload failed ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    } finally {
      setUploading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-sky-700 font-semibold">
        Loading preparation data...
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 py-12 px-6 md:px-16">
      <h1 className="text-4xl font-bold text-center text-sky-800 mb-10">
        📚 Preparation Module
      </h1>

      {/* ASSIGNMENTS SECTION */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold text-sky-700 mb-4 border-b pb-2 flex items-center">
          📘 Assignments
        </h2>

        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">
            No assignments assigned yet.
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead className="bg-sky-100 text-sky-800">
                <tr>
                  <th className="px-4 py-3 text-left">S.No</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Description</th>
                  <th className="px-4 py-3 text-left">Due Date</th>
                  <th className="px-4 py-3 text-left">Attachment</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, idx) => (
                  <tr
                    key={idx}
                    className="border-t hover:bg-sky-50 transition-all duration-200"
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium">{task.title}</td>
                    <td className="px-4 py-3 max-w-[250px] truncate">
                      {task.description || "—"}
                    </td>
                    <td className="px-4 py-3">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {task.attachment ? (
                        <a
                          href={task.attachment}
                          target="_blank"
                          className="text-sky-600 underline hover:text-sky-800"
                        >
                          View File
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {task.completed || task.submission ? (
                        <span className="text-green-600 font-semibold transition-all duration-500">
                          ✅ Completed
                        </span>
                      ) : (
                        <span className="text-orange-500 font-semibold transition-all duration-500">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {task.submission ? (
                        <a
                          href={task.submission}
                          target="_blank"
                          className="text-sm text-green-600 underline"
                        >
                          View Submission
                        </a>
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          {/* ✅ Label triggers hidden input */}
                          <label
                            htmlFor={`file-${idx}`}
                            className="cursor-pointer text-xs bg-sky-100 hover:bg-sky-200 px-3 py-1 rounded-lg text-sky-700 border border-sky-300 transition"
                          >
                            Choose File
                          </label>

                          <input
                            id={`file-${idx}`}
                            type="file"
                            className="hidden"
                            onChange={(e) =>
                              setSelectedFiles((prev) => ({
                                ...prev,
                                [idx]: e.target.files?.[0],
                              }))
                            }
                            disabled={uploading}
                          />

                          {selectedFiles[idx] && (
                            <p className="text-[11px] text-gray-500 truncate max-w-[150px]">
                              {selectedFiles[idx].name}
                            </p>
                          )}

                          <button
                            onClick={() =>
                              handleFileUpload(idx, selectedFiles[idx])
                            }
                            disabled={!selectedFiles[idx] || uploading}
                            className={`px-3 py-1 rounded-lg text-white text-xs ${
                              uploading
                                ? "bg-gray-400"
                                : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                          >
                            {uploading
                              ? "Uploading..."
                              : selectedFiles[idx]
                              ? "Upload"
                              : "Select File"}
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* QUIZZES SECTION */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-4 border-b pb-2 flex items-center">
          🧩 Quizzes
        </h2>

        {quizzes.length === 0 ? (
          <p className="text-center text-gray-500">
            No quizzes assigned yet.
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-2xl shadow-lg border border-gray-200">
            <table className="min-w-full table-auto text-sm text-gray-700">
              <thead className="bg-emerald-100 text-emerald-800">
                <tr>
                  <th className="px-4 py-3 text-left">S.No</th>
                  <th className="px-4 py-3 text-left">Title</th>
                  <th className="px-4 py-3 text-left">Skill</th>
                  <th className="px-4 py-3 text-left">Questions</th>
                  <th className="px-4 py-3 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {quizzes.map((quiz, idx) => (
                  <tr
                    key={idx}
                    className="border-t hover:bg-emerald-50 transition-all duration-200"
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium">{quiz.title}</td>
                    <td className="px-4 py-3">{quiz.skill}</td>
                    <td className="px-4 py-3">{quiz.quiz?.length || 0}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/quizzes/${idx}`)
                        }
                        className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-xs transition"
                      >
                        Start Quiz ➡️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
