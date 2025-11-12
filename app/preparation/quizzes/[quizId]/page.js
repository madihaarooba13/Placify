// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { useParams } from "next/navigation";
// // import { useSession } from "next-auth/react";

// // export default function QuizPage() {
// //   const { quizId } = useParams();
// //   const { data: session } = useSession();
// //   const [quiz, setQuiz] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [answers, setAnswers] = useState({});
// //   const [submitted, setSubmitted] = useState(false);
// //   const [score, setScore] = useState(null);

// //   // ✅ Fetch quiz data
// //   useEffect(() => {
// //     if (!quizId) return;

// //     const fetchQuiz = async () => {
// //       try {
// //         const res = await fetch(`/api/quiz/${quizId}`);
// //         const data = await res.json();

// //         if (!res.ok) throw new Error(data.error || "Failed to load quiz");
// //         setQuiz(data.quiz);
// //       } catch (err) {
// //         console.error("🔥 Quiz load error:", err);
// //         setError("Could not load this quiz. Please try again later.");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchQuiz();
// //   }, [quizId]);

// //   // ✅ Select answer
// //   const handleSelect = (qIndex, option) => {
// //     if (submitted) return; // ❌ disable change after submit
// //     setAnswers((prev) => ({ ...prev, [qIndex]: option }));
// //   };

// //   // ✅ Submit quiz
// //   const handleSubmit = () => {
// //     if (!quiz) return;

// //     let correctCount = 0;
// //     quiz.quiz.forEach((q, i) => {
// //       if (answers[i] === q.correctAnswer) correctCount++;
// //     });

// //     setScore(correctCount);
// //     setSubmitted(true);
// //   };

// //   if (loading)
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-sky-700 font-semibold">
// //         Loading quiz...
// //       </div>
// //     );

// //   if (error)
// //     return (
// //       <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
// //         {error}
// //       </div>
// //     );

// //   return (
// //     <main className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 py-12 px-6 md:px-24 mt-16">
// //       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
// //         {/* Header */}
// //         <h1 className="text-3xl font-bold text-sky-800 text-center mb-6">
// //           🧩 {quiz.title}
// //         </h1>
// //         <p className="text-center text-gray-500 mb-8">
// //           Skill:{" "}
// //           <span className="font-semibold text-emerald-600">{quiz.skill}</span>
// //         </p>

// //         {/* Questions */}
// //         <div className="space-y-8">
// //           {quiz.quiz?.map((q, index) => {
// //             const userAnswer = answers[index];
// //             const isCorrect = userAnswer === q.correctAnswer;

// //             return (
// //               <div
// //                 key={index}
// //                 className="p-6 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-lg"
// //               >
// //                 <h3 className="text-lg font-semibold text-gray-800 mb-4">
// //                   Q{index + 1}. {q.question}
// //                 </h3>

// //                 <div className="flex flex-col gap-3">
// //                   {q.options.map((opt, i) => {
// //                     // Determine option colors after submission
// //                     let optionClass = "bg-white border-gray-300 hover:bg-sky-50";
// //                     if (submitted) {
// //                       if (opt === q.correctAnswer) {
// //                         optionClass =
// //                           "bg-emerald-100 border-emerald-400 text-emerald-700 font-semibold";
// //                       } else if (userAnswer === opt) {
// //                         optionClass =
// //                           "bg-red-100 border-red-400 text-red-700 font-medium";
// //                       }
// //                     } else if (userAnswer === opt) {
// //                       optionClass =
// //                         "bg-emerald-50 border-emerald-400 text-emerald-700";
// //                     }

// //                     return (
// //                       <label
// //                         key={i}
// //                         className={`cursor-pointer rounded-lg border px-4 py-2 transition-all duration-200 ${optionClass}`}
// //                       >
// //                         <input
// //                           type="radio"
// //                           name={`question-${index}`}
// //                           value={opt}
// //                           checked={userAnswer === opt}
// //                           onChange={() => handleSelect(index, opt)}
// //                           className="hidden"
// //                         />
// //                         {opt}
// //                       </label>
// //                     );
// //                   })}
// //                 </div>

// //                 {/* Feedback */}
// //                 {submitted && (
// //                   <div className="mt-3 text-sm">
// //                     {isCorrect ? (
// //                       <p className="text-emerald-700 font-medium">
// //                         ✅ Correct! Good job!
// //                       </p>
// //                     ) : (
// //                       <p className="text-red-600 font-medium">
// //                         ❌ Incorrect. Correct Answer:{" "}
// //                         <span className="font-semibold text-emerald-700">
// //                           {q.correctAnswer}
// //                         </span>
// //                       </p>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* Submit or Score */}
// //         <div className="text-center mt-10">
// //           {!submitted ? (
// //             <button
// //               onClick={handleSubmit}
// //               className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200"
// //             >
// //               Submit Quiz 🚀
// //             </button>
// //           ) : (
// //             <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
// //               <h2 className="text-2xl font-bold text-emerald-700">
// //                 ✅ Your Score: {score} / {quiz.quiz.length}
// //               </h2>
// //               <p className="text-gray-500 mt-2">
// //                 Great effort, {session?.user?.name || "Student"}!
// //               </p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }
// "use client";
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { useSession } from "next-auth/react";

// export default function QuizPage() {
//   const { quizId } = useParams();
//   const { data: session } = useSession();
//   const [quiz, setQuiz] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [answers, setAnswers] = useState({});
//   const [submitted, setSubmitted] = useState(false);
//   const [score, setScore] = useState(null);

//   // ✅ Fetch quiz data
//   useEffect(() => {
//     if (!quizId) return;

//     const fetchQuiz = async () => {
//       try {
//         const res = await fetch(`/api/quiz/${quizId}`);
//         const data = await res.json();

//         if (!res.ok) throw new Error(data.error || "Failed to load quiz");
//         setQuiz(data.quiz);
//       } catch (err) {
//         console.error("🔥 Quiz load error:", err);
//         setError("Could not load this quiz. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuiz();
//   }, [quizId]);

//   // ✅ Select answer
//   const handleSelect = (qIndex, option) => {
//     if (submitted) return; // ❌ disable after submit
//     setAnswers((prev) => ({ ...prev, [qIndex]: option }));
//   };

//   // ✅ Submit quiz + save result to DB
//   const handleSubmit = async () => {
//     if (!quiz) return;

//     let correctCount = 0;
//     quiz.quiz.forEach((q, i) => {
//       if (answers[i] === q.correctAnswer) correctCount++;
//     });

//     setScore(correctCount);
//     setSubmitted(true);

//     // 💾 Save to MongoDB
//     try {
//       const res = await fetch("/api/quiz/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           userEmail: session?.user?.email,
//           quizId,
//           answers,
//           score: correctCount,
//         }),
//       });

//       const data = await res.json();
//       console.log("📦 Save Result Response:", data);
//     } catch (error) {
//       console.error("❌ Failed to save quiz result:", error);
//     }
//   };

//   if (loading)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-sky-700 font-semibold">
//         Loading quiz...
//       </div>
//     );

//   if (error)
//     return (
//       <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
//         {error}
//       </div>
//     );

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 py-12 px-6 md:px-24">
//       <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
//         {/* Header */}
//         <h1 className="text-3xl font-bold text-sky-800 text-center mb-6">
//           🧩 {quiz.title}
//         </h1>
//         <p className="text-center text-gray-500 mb-8">
//           Skill:{" "}
//           <span className="font-semibold text-emerald-600">{quiz.skill}</span>
//         </p>

//         {/* Questions */}
//         <div className="space-y-8">
//           {quiz.quiz?.map((q, index) => {
//             const userAnswer = answers[index];
//             const isCorrect = userAnswer === q.correctAnswer;

//             return (
//               <div
//                 key={index}
//                 className="p-6 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-lg"
//               >
//                 <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                   Q{index + 1}. {q.question}
//                 </h3>

//                 <div className="flex flex-col gap-3">
//                   {q.options.map((opt, i) => {
//                     let optionClass =
//                       "bg-white border-gray-300 hover:bg-sky-50";
//                     if (submitted) {
//                       if (opt === q.correctAnswer) {
//                         optionClass =
//                           "bg-emerald-100 border-emerald-400 text-emerald-700 font-semibold";
//                       } else if (userAnswer === opt) {
//                         optionClass =
//                           "bg-red-100 border-red-400 text-red-700 font-medium";
//                       }
//                     } else if (userAnswer === opt) {
//                       optionClass =
//                         "bg-emerald-50 border-emerald-400 text-emerald-700";
//                     }

//                     return (
//                       <label
//                         key={i}
//                         className={`cursor-pointer rounded-lg border px-4 py-2 transition-all duration-200 ${optionClass}`}
//                       >
//                         <input
//                           type="radio"
//                           name={`question-${index}`}
//                           value={opt}
//                           checked={userAnswer === opt}
//                           onChange={() => handleSelect(index, opt)}
//                           className="hidden"
//                         />
//                         {opt}
//                       </label>
//                     );
//                   })}
//                 </div>

//                 {/* Feedback */}
//                 {submitted && (
//                   <div className="mt-3 text-sm">
//                     {isCorrect ? (
//                       <p className="text-emerald-700 font-medium">
//                         ✅ Correct! Good job!
//                       </p>
//                     ) : (
//                       <p className="text-red-600 font-medium">
//                         ❌ Incorrect. Correct Answer:{" "}
//                         <span className="font-semibold text-emerald-700">
//                           {q.correctAnswer}
//                         </span>
//                       </p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         {/* Submit or Score */}
//         <div className="text-center mt-10">
//           {!submitted ? (
//             <button
//               onClick={handleSubmit}
//               className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200"
//             >
//               Submit Quiz 🚀
//             </button>
//           ) : (
//             <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
//               <h2 className="text-2xl font-bold text-emerald-700">
//                 ✅ Your Score: {score} / {quiz.quiz.length}
//               </h2>
//               <p className="text-gray-500 mt-2">
//                 Great effort, {session?.user?.name || "Student"}!
//               </p>
//             </div>
//           )}
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function QuizPage() {
  const { quizId } = useParams();
  const { data: session } = useSession();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // ✅ Fetch quiz data
  useEffect(() => {
    if (!quizId) return;

    const fetchQuiz = async () => {
      try {
        const res = await fetch(`/api/quiz/${quizId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || "Failed to load quiz");
        setQuiz(data.quiz);
      } catch (err) {
        console.error("🔥 Quiz load error:", err);
        setError("Could not load this quiz. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // ✅ Select answer
  const handleSelect = (qIndex, option) => {
    if (submitted) return; // ❌ disable after submit
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  // ✅ Submit quiz + save result to DB
  const handleSubmit = async () => {
    if (!quiz) return;

    let correctCount = 0;
    quiz.quiz.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) correctCount++;
    });

    setScore(correctCount);
    setSubmitted(true);

    // 💾 Save to MongoDB
    try {
      const res = await fetch("/api/quiz/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: session?.user?.email,
          quizId,
          answers,
          score: correctCount,
        }),
      });

      const data = await res.json();
      console.log("📦 Save Result Response:", data);
    } catch (error) {
      console.error("❌ Failed to save quiz result:", error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-sky-700 font-semibold">
        Loading quiz...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        {error}
      </div>
    );

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 py-12 px-6 md:px-24">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-gray-200">
        {/* Header */}
        <h1 className="text-3xl font-bold text-sky-800 text-center mb-6">
          🧩 {quiz.title}
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Skill:{" "}
          <span className="font-semibold text-emerald-600">{quiz.skill}</span>
        </p>

        {/* Questions */}
        <div className="space-y-8">
          {quiz.quiz?.map((q, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div
                key={index}
                className="p-6 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Q{index + 1}. {q.question}
                </h3>

                <div className="flex flex-col gap-3">
                  {q.options.map((opt, i) => {
                    let optionClass =
                      "bg-white border-gray-300 hover:bg-sky-50";
                    if (submitted) {
                      if (opt === q.correctAnswer) {
                        optionClass =
                          "bg-emerald-100 border-emerald-400 text-emerald-700 font-semibold";
                      } else if (userAnswer === opt) {
                        optionClass =
                          "bg-red-100 border-red-400 text-red-700 font-medium";
                      }
                    } else if (userAnswer === opt) {
                      optionClass =
                        "bg-emerald-50 border-emerald-400 text-emerald-700";
                    }

                    return (
                      <label
                        key={i}
                        className={`cursor-pointer rounded-lg border px-4 py-2 transition-all duration-200 ${optionClass}`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={opt}
                          checked={userAnswer === opt}
                          onChange={() => handleSelect(index, opt)}
                          className="hidden"
                        />
                        {opt}
                      </label>
                    );
                  })}
                </div>

                {/* Feedback */}
                {submitted && (
                  <div className="mt-3 text-sm">
                    {isCorrect ? (
                      <p className="text-emerald-700 font-medium">
                        ✅ Correct! Good job!
                      </p>
                    ) : (
                      <p className="text-red-600 font-medium">
                        ❌ Incorrect. Correct Answer:{" "}
                        <span className="font-semibold text-emerald-700">
                          {q.correctAnswer}
                        </span>
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit or Score */}
        <div className="text-center mt-10">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-200"
            >
              Submit Quiz 🚀
            </button>
          ) : (
            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-6 shadow-sm">
              <h2 className="text-2xl font-bold text-emerald-700">
                ✅ Your Score: {score} / {quiz.quiz.length}
              </h2>
              <p className="text-gray-500 mt-2">
                Great effort, {session?.user?.name || "Student"}!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
