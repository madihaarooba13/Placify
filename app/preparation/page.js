
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
//   const [selectedFiles, setSelectedFiles] = useState({});

//   // ✅ Fetch tasks & quizzes
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

//   // ✅ File upload function (FINAL)
//   const handleFileUpload = async (taskId, file) => {
//     if (!file) return alert("Please select a file first!");
//     if (file.size > 5 * 1024 * 1024)
//       return alert("File too large! Max 5MB allowed.");

//     setUploading(true);

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("taskId", taskId); // ✅ FIXED FIELD NAME
//     formData.append("email", session.user.email);

//     try {
//       const res = await fetch("/api/tasks/submit", {
//         method: "POST",
//         body: formData,
//       });
//       const data = await res.json();

//       if (res.ok) {
//         alert("✅ Assignment submitted successfully!");
//         // ✅ Update state instantly without refresh
//         setTasks((prevTasks) =>
//           prevTasks.map((t) =>
//             t._id === taskId
//               ? { ...t, completed: true, submission: data.submission }
//               : t
//           )
//         );
//       } else {
//         alert(data.error || "Upload failed ❌");
//       }
//     } catch (err) {
//       console.error("❌ Upload Error:", err);
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

//       {/* 🟩 Assignments Section */}
//       <section className="mb-16">
//         <h2 className="text-2xl font-semibold text-sky-700 mb-4 border-b pb-2 flex items-center">
//           📘 Assignments
//         </h2>

//         {tasks.length === 0 ? (
//           <p className="text-center text-gray-500">
//             No assignments assigned yet.
//           </p>
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
//                     key={task._id || idx}
//                     className="border-t hover:bg-sky-50 transition-all duration-200"
//                   >
//                     <td className="px-4 py-3">{idx + 1}</td>
//                     <td className="px-4 py-3 font-medium">{task.title}</td>
//                     <td className="px-4 py-3 max-w-[250px] truncate">
//                       {task.description || "—"}
//                     </td>
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
//                           className="text-sky-600 underline hover:text-sky-800"
//                         >
//                           View File
//                         </a>
//                       ) : (
//                         "—"
//                       )}
//                     </td>
//                     <td className="px-4 py-3">
//                       {task.completed || task.submission ? (
//                         <span className="text-green-600 font-semibold">
//                           ✅ Completed
//                         </span>
//                       ) : (
//                         <span className="text-orange-500 font-semibold">
//                           Pending
//                         </span>
//                       )}
//                     </td>
//                     <td className="px-4 py-3 text-center">
//                       {task.submission ? (
//                         <a
//                           href={task.submission}
//                           target="_blank"
//                           className="text-sm text-green-600 underline"
//                         >
//                           View Submission
//                         </a>
//                       ) : (
//                         <div className="flex flex-col items-center space-y-2">
//                           <label
//                             htmlFor={`file-${idx}`}
//                             className="cursor-pointer text-xs bg-sky-100 hover:bg-sky-200 px-3 py-1 rounded-lg text-sky-700 border border-sky-300 transition"
//                           >
//                             Choose File
//                           </label>

//                           <input
//                             id={`file-${idx}`}
//                             type="file"
//                             className="hidden"
//                             onChange={(e) =>
//                               setSelectedFiles((prev) => ({
//                                 ...prev,
//                                 [task._id]: e.target.files?.[0],
//                               }))
//                             }
//                             disabled={uploading}
//                           />

//                           {selectedFiles[task._id] && (
//                             <p className="text-[11px] text-gray-500 truncate max-w-[150px]">
//                               {selectedFiles[task._id].name}
//                             </p>
//                           )}

//                           <button
//                             onClick={() =>
//                               handleFileUpload(
//                                 task._id,
//                                 selectedFiles[task._id]
//                               )
//                             }
//                             disabled={!selectedFiles[task._id] || uploading}
//                             className={`px-3 py-1 rounded-lg text-white text-xs ${
//                               uploading
//                                 ? "bg-gray-400"
//                                 : "bg-emerald-600 hover:bg-emerald-700"
//                             }`}
//                           >
//                             {uploading
//                               ? "Uploading..."
//                               : selectedFiles[task._id]
//                               ? "Upload"
//                               : "Select File"}
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

//       {/* 🟩 Quizzes Section */}
//       <section>
//         <h2 className="text-2xl font-semibold text-emerald-700 mb-4 border-b pb-2 flex items-center">
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
//                     key={quiz._id || idx}
//                     className="border-t hover:bg-emerald-50 transition-all duration-200"
//                   >
//                     <td className="px-4 py-3">{idx + 1}</td>
//                     <td className="px-4 py-3 font-medium">{quiz.title}</td>
//                     <td className="px-4 py-3">{quiz.skill}</td>
//                     <td className="px-4 py-3">{quiz.quiz?.length || 0}</td>
//                     <td className="px-4 py-3 text-center">
//                       <button
//                         onClick={() =>
//                           router.push(`/dashboard/quizzes/${quiz._id}`)
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
  const [selectedTask, setSelectedTask] = useState(null); // 🧩 Modal for assignment details

  // ✅ Fetch tasks & quizzes
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

  // ✅ File upload function
  const handleFileUpload = async (taskId, file) => {
    if (!file) return alert("Please select a file first!");
    if (file.size > 5 * 1024 * 1024)
      return alert("File too large! Max 5MB allowed.");

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("taskId", taskId);
    formData.append("email", session.user.email);

    try {
      const res = await fetch("/api/tasks/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (res.ok) {
        alert("✅ Assignment submitted successfully!");
        setTasks((prevTasks) =>
          prevTasks.map((t) =>
            t._id === taskId
              ? { ...t, completed: true, submission: data.submission }
              : t
          )
        );
      } else {
        alert(data.error || "Upload failed ❌");
      }
    } catch (err) {
      console.error("❌ Upload Error:", err);
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

      {/* 🟩 Assignments Section */}
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
                    key={task._id || idx}
                    className="border-t hover:bg-sky-50 transition-all duration-200 cursor-pointer"
                    onClick={() => setSelectedTask(task)} // 👈 Click opens modal
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-sky-700 hover:underline">
                      {task.title}
                    </td>
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
                          onClick={(e) => e.stopPropagation()}
                        >
                          View File
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {task.completed || task.submission ? (
                        <span className="text-green-600 font-semibold">
                          ✅ Completed
                        </span>
                      ) : (
                        <span className="text-orange-500 font-semibold">
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
                          onClick={(e) => e.stopPropagation()}
                        >
                          View Submission
                        </a>
                      ) : (
                        <div
                          className="flex flex-col items-center space-y-2"
                          onClick={(e) => e.stopPropagation()}
                        >
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
                                [task._id]: e.target.files?.[0],
                              }))
                            }
                            disabled={uploading}
                          />

                          {selectedFiles[task._id] && (
                            <p className="text-[11px] text-gray-500 truncate max-w-[150px]">
                              {selectedFiles[task._id].name}
                            </p>
                          )}

                          <button
                            onClick={() =>
                              handleFileUpload(
                                task._id,
                                selectedFiles[task._id]
                              )
                            }
                            disabled={!selectedFiles[task._id] || uploading}
                            className={`px-3 py-1 rounded-lg text-white text-xs ${
                              uploading
                                ? "bg-gray-400"
                                : "bg-emerald-600 hover:bg-emerald-700"
                            }`}
                          >
                            {uploading
                              ? "Uploading..."
                              : selectedFiles[task._id]
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

      {/* 🟩 Quizzes Section */}
      <section>
        <h2 className="text-2xl font-semibold text-emerald-700 mb-4 border-b pb-2 flex items-center">
          🧩 Quizzes
        </h2>

        {quizzes.length === 0 ? (
          <p className="text-center text-gray-500">No quizzes assigned yet.</p>
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
                    key={quiz._id || idx}
                    className="border-t hover:bg-emerald-50 transition-all duration-200 cursor-pointer"
                    onClick={() => router.push(`/dashboard/quizzes/${quiz._id}`)}
                  >
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 font-medium text-emerald-700 underline">
                      {quiz.title}
                    </td>
                    <td className="px-4 py-3">{quiz.skill}</td>
                    <td className="px-4 py-3">{quiz.quiz?.length || 0}</td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/preparation/quizzes/${quiz._id}`);
                        }}
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

      {/* 🪟 Assignment Modal */}
      {selectedTask && (
        <div
          className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
          onClick={() => setSelectedTask(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedTask(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h3 className="text-2xl font-semibold text-sky-700 mb-3">
              {selectedTask.title}
            </h3>
            <p className="text-gray-700 mb-3">
              {selectedTask.description || "No description available."}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              Due Date:{" "}
              <strong>
                {selectedTask.dueDate
                  ? new Date(selectedTask.dueDate).toLocaleDateString()
                  : "—"}
              </strong>
            </p>
            {selectedTask.attachment && (
              <a
                href={selectedTask.attachment}
                target="_blank"
                className="text-sky-600 underline hover:text-sky-800 text-sm"
              >
                View Attached File
              </a>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
