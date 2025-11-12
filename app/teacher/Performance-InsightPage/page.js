// "use client";
// import React, { useEffect, useState } from "react";

// export default function PerformanceInsightPage() {
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPerformance = async () => {
//       try {
//         const res = await fetch("/api/performance");
//         const data = await res.json();
//         if (data.students) setStudents(data.students);
//       } catch (err) {
//         console.error("❌ Failed to fetch performance data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPerformance();
//   }, []);

//   if (loading)
//     return (
//       <div className="min-h-screen flex justify-center items-center text-lg text-sky-700 font-semibold">
//         Loading performance insights...
//       </div>
//     );

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8">
//       <header className="mb-10 text-center">
//         <h1 className="text-3xl font-bold text-emerald-700">
//           📊 Student Performance Insights
//         </h1>
//         <p className="text-gray-600 mt-2">
//           View assignments, quizzes, and progress for each student.
//         </p>
//       </header>

//       {students.length === 0 ? (
//         <p className="text-center text-gray-600">No student data available.</p>
//       ) : (
//         <div className="space-y-8">
//           {students.map((student, idx) => (
//             <div
//               key={idx}
//               className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-emerald-500 hover:shadow-xl transition"
//             >
//               {/* Student Info Header */}
//               <div className="flex justify-between items-start flex-wrap mb-4">
//                 <div>
//                   <h2 className="text-xl font-semibold text-sky-800">
//                     {student.username}
//                   </h2>
//                   <p className="text-sm text-gray-600">{student.email}</p>
//                   <p className="text-sm text-gray-500 mt-1">
//                     <strong>Enrollment:</strong> {student.enrollment}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     <strong>Branch:</strong> {student.branch}
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     <strong>College:</strong> {student.college}
//                   </p>
//                 </div>

//                 {/* Performance Stats */}
//                 <div className="text-right mt-2 md:mt-0">
//                   <p className="text-sm text-gray-500">
//                     🧩 <strong>Avg Quiz Score:</strong>{" "}
//                     <span className="text-sky-600">
//                       {student.insights.avgScore}%
//                     </span>
//                   </p>
//                   <p className="text-sm text-gray-500">
//                     📝 <strong>Task Completion:</strong>{" "}
//                     <span className="text-emerald-600">
//                       {student.insights.taskCompletion}%
//                     </span>
//                   </p>
//                 </div>
//               </div>

//               {/* Horizontal Division */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 {/* Assignments Section */}
//                 <div className="bg-gradient-to-br from-sky-50 to-white p-4 rounded-xl border border-sky-100">
//                   <h3 className="text-lg font-semibold text-emerald-700 mb-3">
//                     📝 Assignments
//                   </h3>

//                   {student.tasks.length > 0 ? (
//                     student.tasks.map((task, i) => (
//                       <div
//                         key={i}
//                         className="flex justify-between items-center mb-2 border-b pb-2"
//                       >
//                         <div>
//                           <p className="font-medium text-gray-800">
//                             {task.title}
//                           </p>
//                           <p className="text-sm text-gray-500">
//                             {task.skill || "General Skill"}
//                           </p>
//                         </div>
//                         <span
//                           className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                             task.completed
//                               ? "bg-emerald-100 text-emerald-700"
//                               : "bg-amber-100 text-amber-700"
//                           }`}
//                         >
//                           {task.completed ? "Completed" : "Pending"}
//                         </span>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 text-sm italic">
//                       No assignments assigned yet.
//                     </p>
//                   )}
//                 </div>

//                 {/* Quizzes Section */}
//                 <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border border-emerald-100">
//                   <h3 className="text-lg font-semibold text-sky-700 mb-3">
//                     🧠 Quizzes
//                   </h3>

//                   {student.quizzes.length > 0 ? (
//                     student.quizzes.map((quiz, i) => {
//                       const lastAttempt =
//                         quiz.attempts?.[quiz.attempts.length - 1];
//                       const score = lastAttempt?.score ?? null;

//                       return (
//                         <div
//                           key={i}
//                           className="flex justify-between items-center mb-2 border-b pb-2"
//                         >
//                           <div>
//                             <p className="font-medium text-gray-800">
//                               {quiz.title}
//                             </p>
//                             <p className="text-sm text-gray-500">
//                               {quiz.skill}
//                             </p>
//                           </div>

//                           <div className="text-right">
//                             <span
//                               className={`text-xs font-semibold px-3 py-1 rounded-full ${
//                                 quiz.completed
//                                   ? "bg-emerald-100 text-emerald-700"
//                                   : "bg-amber-100 text-amber-700"
//                               }`}
//                             >
//                               {quiz.completed ? "Completed" : "Pending"}
//                             </span>
//                             {score !== null && (
//                               <p className="text-xs text-gray-600 mt-1">
//                                 Score: <strong>{score}</strong>
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       );
//                     })
//                   ) : (
//                     <p className="text-gray-500 text-sm italic">
//                       No quizzes assigned yet.
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </main>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";

export default function PerformanceInsightPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerformance = async () => {
      try {
        const res = await fetch("/api/performance");
        const data = await res.json();
        if (data.students) setStudents(data.students);
      } catch (err) {
        console.error("❌ Failed to fetch performance data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPerformance();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-sky-700 font-semibold">
        Loading performance insights...
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sky-50 p-8 mt-35 lg:mt-25">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-emerald-700">
          📊 Student Performance Insights
        </h1>
        <p className="text-gray-600 mt-2">
          View assignments, submissions, quizzes, and progress for each student.
        </p>
      </header>

      {students.length === 0 ? (
        <p className="text-center text-gray-600">No student data available.</p>
      ) : (
        <div className="space-y-8">
          {students.map((student, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md border-l-4 border-emerald-500 hover:shadow-xl transition"
            >
              {/* Student Info */}
              <div className="flex justify-between items-start flex-wrap mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-sky-800">
                    {student.username}
                  </h2>
                  <p className="text-sm text-gray-600">{student.email}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    <strong>Enrollment:</strong> {student.enrollment}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Branch:</strong> {student.branch}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>College:</strong> {student.college}
                  </p>
                </div>

                {/* Analytics */}
                <div className="text-right mt-2 md:mt-0">
                  <p className="text-sm text-gray-500">
                    🧩 <strong>Avg Quiz Score:</strong>{" "}
                    <span className="text-sky-600">
                      {student.insights.avgScore}%
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    📝 <strong>Task Completion:</strong>{" "}
                    <span className="text-emerald-600">
                      {student.insights.taskCompletion}%
                    </span>
                  </p>
                </div>
              </div>

              {/* Horizontal Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Assignments */}
                <div className="bg-gradient-to-br from-sky-50 to-white p-4 rounded-xl border border-sky-100">
                  <h3 className="text-lg font-semibold text-emerald-700 mb-3">
                    📝 Assignments
                  </h3>

                  {student.tasks.length > 0 ? (
                    student.tasks.map((task, i) => (
                      <div
                        key={i}
                        className="border-b pb-2 mb-3 flex flex-col gap-1"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium text-gray-800">
                              {task.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {task.skill}
                            </p>
                          </div>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${
                              task.completed
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }`}
                          >
                            {task.completed ? "Completed" : "Pending"}
                          </span>
                        </div>

                        {/* ✅ Submission Info */}
                        {task.submission && (
                          <div className="ml-1 mt-1">
                            <a
                              href={task.submission}
                              target="_blank"
                              className="text-xs text-sky-600 underline hover:text-sky-800"
                            >
                              📎 View Submission
                            </a>
                            {task.submittedAt && (
                              <p className="text-xs text-gray-500 mt-1">
                                Submitted on:{" "}
                                {new Date(task.submittedAt).toLocaleString()}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      No assignments assigned yet.
                    </p>
                  )}
                </div>

                {/* Quizzes */}
                <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-xl border border-emerald-100">
                  <h3 className="text-lg font-semibold text-sky-700 mb-3">
                    🧠 Quizzes
                  </h3>

                  {student.quizzes.length > 0 ? (
                    student.quizzes.map((quiz, i) => {
                      const lastAttempt =
                        quiz.attempts?.[quiz.attempts.length - 1];
                      const score = lastAttempt?.score ?? null;

                      return (
                        <div
                          key={i}
                          className="flex justify-between items-center mb-2 border-b pb-2"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              {quiz.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {quiz.skill}
                            </p>
                          </div>

                          <div className="text-right">
                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                quiz.completed
                                  ? "bg-emerald-100 text-emerald-700"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {quiz.completed ? "Completed" : "Pending"}
                            </span>
                            {score !== null && (
                              <p className="text-xs text-gray-600 mt-1">
                                Score: <strong>{score}</strong>
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      No quizzes assigned yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
