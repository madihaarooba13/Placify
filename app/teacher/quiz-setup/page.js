// // // // // "use client";
// // // // // import React, { useState } from "react";
// // // // // import { useRouter, useSearchParams } from "next/navigation";

// // // // // export default function QuizSetupPage() {
// // // // //   const router = useRouter();
// // // // //   const searchParams = useSearchParams();
// // // // //   const studentEmail = searchParams.get("student");

// // // // //   const [skill, setSkill] = useState("");
// // // // //   const [numQuestions, setNumQuestions] = useState(1);
// // // // //   const [questionType, setQuestionType] = useState("mcq");
// // // // //   const [questions, setQuestions] = useState([]);

// // // // //   const handleGenerate = () => {
// // // // //     const num = Math.min(Math.max(numQuestions, 1), 10); // min 1, max 10
// // // // //     const newQuestions = Array.from({ length: num }, () => ({
// // // // //       question: "",
// // // // //       options: ["", "", "", ""],
// // // // //       correctAnswer: "",
// // // // //     }));
// // // // //     setQuestions(newQuestions);
// // // // //   };

// // // // //   const handleSaveQuiz = async () => {
// // // // //     if (!skill.trim() || questions.length === 0) {
// // // // //       alert("Please fill in all details!");
// // // // //       return;
// // // // //     }

// // // // //     const payload = {
// // // // //       email: studentEmail,
// // // // //       skill,
// // // // //       title: `Quiz on ${skill}`,
// // // // //       type: "quiz",
// // // // //       quiz: questions,
// // // // //     };

// // // // //     try {
// // // // //       const res = await fetch("/api/tasks/assign", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify(payload),
// // // // //       });
// // // // //       const data = await res.json();
// // // // //       if (res.ok) {
// // // // //         alert("✅ Quiz assigned successfully!");
// // // // //         router.push("/teacher/tasks");
// // // // //       } else {
// // // // //         alert(data.error || "Failed to assign quiz ❌");
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error(err);
// // // // //       alert("Server error ❌");
// // // // //     }
// // // // //   };

// // // // //   const updateQuestion = (i, field, value) => {
// // // // //     const updated = [...questions];
// // // // //     updated[i][field] = value;
// // // // //     setQuestions(updated);
// // // // //   };

// // // // //   const updateOption = (i, optIdx, value) => {
// // // // //     const updated = [...questions];
// // // // //     updated[i].options[optIdx] = value;
// // // // //     setQuestions(updated);
// // // // //   };

// // // // //   return (
// // // // //     <main className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 py-12 px-6">
// // // // //       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8">
// // // // //         <h1 className="text-3xl font-bold text-sky-800 mb-4 text-center">
// // // // //           Create New Quiz 🧩
// // // // //         </h1>
// // // // //         <p className="text-center text-gray-600 mb-8">
// // // // //           {studentEmail ? `For Student: ${studentEmail}` : "No student selected"}
// // // // //         </p>

// // // // //         {/* Skill Selection */}
// // // // //         <label className="block text-gray-700 font-semibold mb-2">
// // // // //           Select Skill/Topic
// // // // //         </label>
// // // // //         <select
// // // // //           value={skill}
// // // // //           onChange={(e) => setSkill(e.target.value)}
// // // // //           className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-sky-400"
// // // // //         >
// // // // //           <option value="">-- Select Skill --</option>
// // // // //           <optgroup label="Soft Skills 🗣️">
// // // // //             <option value="Communication">Communication</option>
// // // // //             <option value="Confidence">Confidence</option>
// // // // //             <option value="Teamwork">Teamwork</option>
// // // // //             <option value="Leadership">Leadership</option>
// // // // //             <option value="Problem Solving">Problem Solving</option>
// // // // //             <option value="Attitude">Attitude</option>
// // // // //           </optgroup>
// // // // //           <optgroup label="Technical Skills 💻">
// // // // //             <option value="Data Structures & Algorithms">
// // // // //               Data Structures & Algorithms
// // // // //             </option>
// // // // //             <option value="Web Development">Web Development</option>
// // // // //             <option value="Database Management">Database Management</option>
// // // // //             <option value="AI / Machine Learning">AI / Machine Learning</option>
// // // // //           </optgroup>
// // // // //         </select>

// // // // //         {/* Number of Questions */}
// // // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// // // // //           <div>
// // // // //             <label className="block text-gray-700 font-semibold mb-2">
// // // // //               Number of Questions (1 - 10)
// // // // //             </label>
// // // // //             <input
// // // // //               type="number"
// // // // //               min="1"
// // // // //               max="10"
// // // // //               value={numQuestions}
// // // // //               onChange={(e) => setNumQuestions(Number(e.target.value))}
// // // // //               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400"
// // // // //             />
// // // // //           </div>

// // // // //           <div>
// // // // //             <label className="block text-gray-700 font-semibold mb-2">
// // // // //               Question Type
// // // // //             </label>
// // // // //             <select
// // // // //               value={questionType}
// // // // //               onChange={(e) => setQuestionType(e.target.value)}
// // // // //               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400"
// // // // //             >
// // // // //               <option value="mcq">MCQ (Multiple Choice)</option>
// // // // //               <option value="tf">True / False</option>
// // // // //               <option value="short">Short Answer</option>
// // // // //             </select>
// // // // //           </div>
// // // // //         </div>

// // // // //         <div className="flex justify-center mb-6">
// // // // //           <button
// // // // //             onClick={handleGenerate}
// // // // //             className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
// // // // //           >
// // // // //             🎯 Generate Quiz Layout
// // // // //           </button>
// // // // //         </div>

// // // // //         {/* Questions Display */}
// // // // //         {questions.length > 0 && (
// // // // //           <div className="mt-8 space-y-6">
// // // // //             {questions.map((q, i) => (
// // // // //               <div
// // // // //                 key={i}
// // // // //                 className="border border-gray-200 p-6 rounded-2xl shadow-sm"
// // // // //               >
// // // // //                 <h3 className="text-lg font-semibold text-sky-700 mb-3">
// // // // //                   Question {i + 1}
// // // // //                 </h3>
// // // // //                 <input
// // // // //                   type="text"
// // // // //                   value={q.question}
// // // // //                   onChange={(e) =>
// // // // //                     updateQuestion(i, "question", e.target.value)
// // // // //                   }
// // // // //                   placeholder="Enter question text..."
// // // // //                   className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-3 focus:ring-2 focus:ring-sky-400"
// // // // //                 />

// // // // //                 {questionType === "mcq" && (
// // // // //                   <>
// // // // //                     {q.options.map((opt, idx) => (
// // // // //                       <input
// // // // //                         key={idx}
// // // // //                         type="text"
// // // // //                         value={opt}
// // // // //                         onChange={(e) =>
// // // // //                           updateOption(i, idx, e.target.value)
// // // // //                         }
// // // // //                         placeholder={`Option ${String.fromCharCode(65 + idx)}`}
// // // // //                         className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-2 focus:ring-1 focus:ring-emerald-300"
// // // // //                       />
// // // // //                     ))}
// // // // //                     <select
// // // // //                       value={q.correctAnswer}
// // // // //                       onChange={(e) =>
// // // // //                         updateQuestion(i, "correctAnswer", e.target.value)
// // // // //                       }
// // // // //                       className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2 focus:ring-2 focus:ring-emerald-400"
// // // // //                     >
// // // // //                       <option value="">Select Correct Answer</option>
// // // // //                       <option value="A">A</option>
// // // // //                       <option value="B">B</option>
// // // // //                       <option value="C">C</option>
// // // // //                       <option value="D">D</option>
// // // // //                     </select>
// // // // //                   </>
// // // // //                 )}

// // // // //                 {questionType === "tf" && (
// // // // //                   <select
// // // // //                     value={q.correctAnswer}
// // // // //                     onChange={(e) =>
// // // // //                       updateQuestion(i, "correctAnswer", e.target.value)
// // // // //                     }
// // // // //                     className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2 focus:ring-2 focus:ring-sky-400"
// // // // //                   >
// // // // //                     <option value="">Select Correct Answer</option>
// // // // //                     <option value="True">True</option>
// // // // //                     <option value="False">False</option>
// // // // //                   </select>
// // // // //                 )}

// // // // //                 {questionType === "short" && (
// // // // //                   <textarea
// // // // //                     value={q.correctAnswer}
// // // // //                     onChange={(e) =>
// // // // //                       updateQuestion(i, "correctAnswer", e.target.value)
// // // // //                     }
// // // // //                     placeholder="Enter expected answer"
// // // // //                     className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-400"
// // // // //                   />
// // // // //                 )}
// // // // //               </div>
// // // // //             ))}

// // // // //             <div className="flex justify-center mt-8">
// // // // //               <button
// // // // //                 onClick={handleSaveQuiz}
// // // // //                 className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
// // // // //               >
// // // // //                 ✅ Save & Assign Quiz
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         )}
// // // // //       </div>
// // // // //     </main>
// // // // //   );
// // // // // }
// // // // "use client";
// // // // import React, { useState } from "react";
// // // // import { useRouter, useSearchParams } from "next/navigation";

// // // // export default function QuizSetupPage() {
// // // //   const router = useRouter();
// // // //   const searchParams = useSearchParams();
// // // //   const studentEmail = searchParams.get("student");

// // // //   const [skill, setSkill] = useState("");
// // // //   const [numQuestions, setNumQuestions] = useState(1);
// // // //   const [questionType, setQuestionType] = useState("mcq");
// // // //   const [questions, setQuestions] = useState([]);

// // // //   // ✅ FIX: Generate based on type (MCQ / True-False / Short)
// // // //   const handleGenerate = () => {
// // // //     const num = Math.min(Math.max(numQuestions, 1), 10);

// // // //     const newQuestions = Array.from({ length: num }, () => {
// // // //       if (questionType === "tf") {
// // // //         return {
// // // //           question: "",
// // // //           options: ["True", "False"], // ✅ fixed for True/False
// // // //           correctAnswer: "",
// // // //         };
// // // //       } else if (questionType === "short") {
// // // //         return {
// // // //           question: "",
// // // //           options: [], // ✅ no options for short answer
// // // //           correctAnswer: "",
// // // //         };
// // // //       } else {
// // // //         return {
// // // //           question: "",
// // // //           options: ["", "", "", ""], // ✅ for MCQ
// // // //           correctAnswer: "",
// // // //         };
// // // //       }
// // // //     });

// // // //     setQuestions(newQuestions);
// // // //   };

// // // //   // ✅ FIX: send type info + dynamic quiz safely
// // // //   const handleSaveQuiz = async () => {
// // // //     if (!skill.trim() || questions.length === 0) {
// // // //       alert("Please fill in all details!");
// // // //       return;
// // // //     }

// // // //     const payload = {
// // // //       email: studentEmail,
// // // //       skill,
// // // //       title: `Quiz on ${skill}`,
// // // //       type: questionType, // ✅ store the actual quiz type
// // // //       quiz: questions.map((q) => ({
// // // //         question: q.question,
// // // //         options: q.options || [],
// // // //         correctAnswer: q.correctAnswer,
// // // //       })),
// // // //     };

// // // //     try {
// // // //       const res = await fetch("/api/tasks/assign", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify(payload),
// // // //       });

// // // //       const data = await res.json();
// // // //       if (res.ok) {
// // // //         alert("✅ Quiz assigned successfully!");
// // // //         router.push("/teacher/tasks");
// // // //       } else {
// // // //         alert(data.error || "Failed to assign quiz ❌");
// // // //       }
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       alert("Server error ❌");
// // // //     }
// // // //   };

// // // //   const updateQuestion = (i, field, value) => {
// // // //     const updated = [...questions];
// // // //     updated[i][field] = value;
// // // //     setQuestions(updated);
// // // //   };

// // // //   const updateOption = (i, optIdx, value) => {
// // // //     const updated = [...questions];
// // // //     updated[i].options[optIdx] = value;
// // // //     setQuestions(updated);
// // // //   };

// // // //   return (
// // // //     <main className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 py-12 px-6">
// // // //       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8">
// // // //         <h1 className="text-3xl font-bold text-sky-800 mb-4 text-center">
// // // //           Create New Quiz 🧩
// // // //         </h1>
// // // //         <p className="text-center text-gray-600 mb-8">
// // // //           {studentEmail ? `For Student: ${studentEmail}` : "No student selected"}
// // // //         </p>

// // // //         {/* Skill Selection */}
// // // //         <label className="block text-gray-700 font-semibold mb-2">
// // // //           Select Skill/Topic
// // // //         </label>
// // // //         <select
// // // //           value={skill}
// // // //           onChange={(e) => setSkill(e.target.value)}
// // // //           className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-sky-400"
// // // //         >
// // // //           <option value="">-- Select Skill --</option>
// // // //           <optgroup label="Soft Skills 🗣️">
// // // //             <option value="Communication">Communication</option>
// // // //             <option value="Confidence">Confidence</option>
// // // //             <option value="Teamwork">Teamwork</option>
// // // //             <option value="Leadership">Leadership</option>
// // // //             <option value="Problem Solving">Problem Solving</option>
// // // //             <option value="Attitude">Attitude</option>
// // // //           </optgroup>
// // // //           <optgroup label="Technical Skills 💻">
// // // //             <option value="Data Structures & Algorithms">
// // // //               Data Structures & Algorithms
// // // //             </option>
// // // //             <option value="Web Development">Web Development</option>
// // // //             <option value="Database Management">Database Management</option>
// // // //             <option value="AI / Machine Learning">AI / Machine Learning</option>
// // // //           </optgroup>
// // // //         </select>

// // // //         {/* Question Type & Count */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// // // //           <div>
// // // //             <label className="block text-gray-700 font-semibold mb-2">
// // // //               Number of Questions (1 - 10)
// // // //             </label>
// // // //             <input
// // // //               type="number"
// // // //               min="1"
// // // //               max="10"
// // // //               value={numQuestions}
// // // //               onChange={(e) => setNumQuestions(Number(e.target.value))}
// // // //               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400"
// // // //             />
// // // //           </div>

// // // //           <div>
// // // //             <label className="block text-gray-700 font-semibold mb-2">
// // // //               Question Type
// // // //             </label>
// // // //             <select
// // // //               value={questionType}
// // // //               onChange={(e) => setQuestionType(e.target.value)}
// // // //               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400"
// // // //             >
// // // //               <option value="mcq">MCQ (Multiple Choice)</option>
// // // //               <option value="tf">True / False</option>
// // // //               <option value="short">Short Answer</option>
// // // //             </select>
// // // //           </div>
// // // //         </div>

// // // //         <div className="flex justify-center mb-6">
// // // //           <button
// // // //             onClick={handleGenerate}
// // // //             className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
// // // //           >
// // // //             🎯 Generate Quiz Layout
// // // //           </button>
// // // //         </div>

// // // //         {/* Questions Display */}
// // // //         {questions.length > 0 && (
// // // //           <div className="mt-8 space-y-6">
// // // //             {questions.map((q, i) => (
// // // //               <div
// // // //                 key={i}
// // // //                 className="border border-gray-200 p-6 rounded-2xl shadow-sm"
// // // //               >
// // // //                 <h3 className="text-lg font-semibold text-sky-700 mb-3">
// // // //                   Question {i + 1}
// // // //                 </h3>
// // // //                 <input
// // // //                   type="text"
// // // //                   value={q.question}
// // // //                   onChange={(e) =>
// // // //                     updateQuestion(i, "question", e.target.value)
// // // //                   }
// // // //                   placeholder="Enter question text..."
// // // //                   className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-3 focus:ring-2 focus:ring-sky-400"
// // // //                 />

// // // //                 {/* MCQ */}
// // // //                 {questionType === "mcq" && (
// // // //                   <>
// // // //                     {q.options.map((opt, idx) => (
// // // //                       <input
// // // //                         key={idx}
// // // //                         type="text"
// // // //                         value={opt}
// // // //                         onChange={(e) => updateOption(i, idx, e.target.value)}
// // // //                         placeholder={`Option ${String.fromCharCode(65 + idx)}`}
// // // //                         className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-2 focus:ring-1 focus:ring-emerald-300"
// // // //                       />
// // // //                     ))}
// // // //                     <select
// // // //                       value={q.correctAnswer}
// // // //                       onChange={(e) =>
// // // //                         updateQuestion(i, "correctAnswer", e.target.value)
// // // //                       }
// // // //                       className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2 focus:ring-2 focus:ring-emerald-400"
// // // //                     >
// // // //                       <option value="">Select Correct Answer</option>
// // // //                       <option value="A">A</option>
// // // //                       <option value="B">B</option>
// // // //                       <option value="C">C</option>
// // // //                       <option value="D">D</option>
// // // //                     </select>
// // // //                   </>
// // // //                 )}

// // // //                 {/* True / False */}
// // // //                 {questionType === "tf" && (
// // // //                   <select
// // // //                     value={q.correctAnswer}
// // // //                     onChange={(e) =>
// // // //                       updateQuestion(i, "correctAnswer", e.target.value)
// // // //                     }
// // // //                     className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2 focus:ring-2 focus:ring-sky-400"
// // // //                   >
// // // //                     <option value="">Select Correct Answer</option>
// // // //                     <option value="True">True</option>
// // // //                     <option value="False">False</option>
// // // //                   </select>
// // // //                 )}

// // // //                 {/* Short Answer */}
// // // //                 {questionType === "short" && (
// // // //                   <textarea
// // // //                     value={q.correctAnswer}
// // // //                     onChange={(e) =>
// // // //                       updateQuestion(i, "correctAnswer", e.target.value)
// // // //                     }
// // // //                     placeholder="Enter expected answer"
// // // //                     className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-400"
// // // //                   />
// // // //                 )}
// // // //               </div>
// // // //             ))}

// // // //             <div className="flex justify-center mt-8">
// // // //               <button
// // // //                 onClick={handleSaveQuiz}
// // // //                 className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
// // // //               >
// // // //                 ✅ Save & Assign Quiz
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </main>
// // // //   );
// // // // }
// // // "use client";
// // // import React, { useState } from "react";
// // // import { useRouter, useSearchParams } from "next/navigation";

// // // export default function QuizSetupPage() {
// // //   const router = useRouter();
// // //   const searchParams = useSearchParams();
// // //   const studentEmail = searchParams.get("student");

// // //   const [skill, setSkill] = useState("");
// // //   const [numQuestions, setNumQuestions] = useState(1);
// // //   const [questionType, setQuestionType] = useState("mcq");
// // //   const [questions, setQuestions] = useState([]);

// // //   // ✅ Generate questions based on type (MCQ / True-False)
// // //   const handleGenerate = () => {
// // //     const num = Math.min(Math.max(numQuestions, 1), 10);

// // //     const newQuestions = Array.from({ length: num }, () => {
// // //       if (questionType === "tf") {
// // //         return {
// // //           question: "",
// // //           options: ["True", "False"], // ✅ for True/False
// // //           correctAnswer: "",
// // //         };
// // //       } else {
// // //         return {
// // //           question: "",
// // //           options: ["", "", "", ""], // ✅ for MCQ
// // //           correctAnswer: "",
// // //         };
// // //       }
// // //     });

// // //     setQuestions(newQuestions);
// // //   };

// // //   // ✅ Save quiz (supports MCQ + TF)
// // //   const handleSaveQuiz = async () => {
// // //     if (!skill.trim() || questions.length === 0) {
// // //       alert("Please fill in all details!");
// // //       return;
// // //     }

// // //     const payload = {
// // //       email: studentEmail,
// // //       skill,
// // //       title: `Quiz on ${skill}`,
// // //       type: questionType,
// // //       quiz: questions.map((q) => ({
// // //         question: q.question,
// // //         options: q.options || [],
// // //         correctAnswer: q.correctAnswer,
// // //       })),
// // //     };

// // //     try {
// // //       const res = await fetch("/api/tasks/assign", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       const data = await res.json();
// // //       if (res.ok) {
// // //         alert("✅ Quiz assigned successfully!");
// // //         router.push("/teacher/tasks");
// // //       } else {
// // //         alert(data.error || "Failed to assign quiz ❌");
// // //       }
// // //     } catch (err) {
// // //       console.error(err);
// // //       alert("Server error ❌");
// // //     }
// // //   };

// // //   const updateQuestion = (i, field, value) => {
// // //     const updated = [...questions];
// // //     updated[i][field] = value;
// // //     setQuestions(updated);
// // //   };

// // //   const updateOption = (i, optIdx, value) => {
// // //     const updated = [...questions];
// // //     updated[i].options[optIdx] = value;
// // //     setQuestions(updated);
// // //   };

// // //   return (
// // //     <main className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 py-12 px-6">
// // //       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8">
// // //         <h1 className="text-3xl font-bold text-sky-800 mb-4 text-center">
// // //           Create New Quiz 🧩
// // //         </h1>
// // //         <p className="text-center text-gray-600 mb-8">
// // //           {studentEmail ? `For Student: ${studentEmail}` : "No student selected"}
// // //         </p>

// // //         {/* Skill Selection */}
// // //         <label className="block text-gray-700 font-semibold mb-2">
// // //           Select Skill/Topic
// // //         </label>
// // //         <select
// // //           value={skill}
// // //           onChange={(e) => setSkill(e.target.value)}
// // //           className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-sky-400"
// // //         >
// // //           <option value="">-- Select Skill --</option>
// // //           <optgroup label="Soft Skills 🗣️">
// // //             <option value="Communication">Communication</option>
// // //             <option value="Confidence">Confidence</option>
// // //             <option value="Teamwork">Teamwork</option>
// // //             <option value="Leadership">Leadership</option>
// // //             <option value="Problem Solving">Problem Solving</option>
// // //             <option value="Attitude">Attitude</option>
// // //           </optgroup>
// // //           <optgroup label="Technical Skills 💻">
// // //             <option value="Data Structures & Algorithms">
// // //               Data Structures & Algorithms
// // //             </option>
// // //             <option value="Web Development">Web Development</option>
// // //             <option value="Database Management">Database Management</option>
// // //             <option value="AI / Machine Learning">AI / Machine Learning</option>
// // //           </optgroup>
// // //         </select>

// // //         {/* Number + Type */}
// // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
// // //           <div>
// // //             <label className="block text-gray-700 font-semibold mb-2">
// // //               Number of Questions (1 - 10)
// // //             </label>
// // //             <input
// // //               type="number"
// // //               min="1"
// // //               max="10"
// // //               value={numQuestions}
// // //               onChange={(e) => setNumQuestions(Number(e.target.value))}
// // //               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400"
// // //             />
// // //           </div>

// // //           <div>
// // //             <label className="block text-gray-700 font-semibold mb-2">
// // //               Question Type
// // //             </label>
// // //             <select
// // //               value={questionType}
// // //               onChange={(e) => setQuestionType(e.target.value)}
// // //               className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400"
// // //             >
// // //               <option value="mcq">MCQ (Multiple Choice)</option>
// // //               <option value="tf">True / False</option>
// // //             </select>
// // //           </div>
// // //         </div>

// // //         <div className="flex justify-center mb-6">
// // //           <button
// // //             onClick={handleGenerate}
// // //             className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
// // //           >
// // //             🎯 Generate Quiz Layout
// // //           </button>
// // //         </div>

// // //         {/* Questions Display */}
// // //         {questions.length > 0 && (
// // //           <div className="mt-8 space-y-6">
// // //             {questions.map((q, i) => (
// // //               <div
// // //                 key={i}
// // //                 className="border border-gray-200 p-6 rounded-2xl shadow-sm"
// // //               >
// // //                 <h3 className="text-lg font-semibold text-sky-700 mb-3">
// // //                   Question {i + 1}
// // //                 </h3>
// // //                 <input
// // //                   type="text"
// // //                   value={q.question}
// // //                   onChange={(e) =>
// // //                     updateQuestion(i, "question", e.target.value)
// // //                   }
// // //                   placeholder="Enter question text..."
// // //                   className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-3 focus:ring-2 focus:ring-sky-400"
// // //                 />

// // //                 {/* ✅ MCQ Layout */}
// // //                 {questionType === "mcq" && (
// // //                   <>
// // //                     {q.options.map((opt, idx) => (
// // //                       <input
// // //                         key={idx}
// // //                         type="text"
// // //                         value={opt}
// // //                         onChange={(e) => updateOption(i, idx, e.target.value)}
// // //                         placeholder={`Option ${String.fromCharCode(65 + idx)}`}
// // //                         className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-2 focus:ring-1 focus:ring-emerald-300"
// // //                       />
// // //                     ))}
// // //                     <select
// // //                       value={q.correctAnswer}
// // //                       onChange={(e) =>
// // //                         updateQuestion(i, "correctAnswer", e.target.value)
// // //                       }
// // //                       className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2 focus:ring-2 focus:ring-emerald-400"
// // //                     >
// // //                       <option value="">Select Correct Answer</option>
// // //                       <option value="A">A</option>
// // //                       <option value="B">B</option>
// // //                       <option value="C">C</option>
// // //                       <option value="D">D</option>
// // //                     </select>
// // //                   </>
// // //                 )}

// // //                 {/* ✅ True / False Layout */}
// // //                 {questionType === "tf" && (
// // //                   <select
// // //                     value={q.correctAnswer}
// // //                     onChange={(e) =>
// // //                       updateQuestion(i, "correctAnswer", e.target.value)
// // //                     }
// // //                     className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2 focus:ring-2 focus:ring-sky-400"
// // //                   >
// // //                     <option value="">Select Correct Answer</option>
// // //                     <option value="True">True</option>
// // //                     <option value="False">False</option>
// // //                   </select>
// // //                 )}
// // //               </div>
// // //             ))}

// // //             <div className="flex justify-center mt-8">
// // //               <button
// // //                 onClick={handleSaveQuiz}
// // //                 className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
// // //               >
// // //                 ✅ Save & Assign Quiz
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </main>
// // //   );
// // // }
// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { useSearchParams } from "next/navigation";

// // export default function QuizSetupPage() {
// //   const searchParams = useSearchParams();
// //   const prefilledEmail = searchParams.get("student");
// //   const prefilledSkill = searchParams.get("skill");

// //   const [students, setStudents] = useState([]);
// //   const [selectedEmail, setSelectedEmail] = useState(prefilledEmail || "");
// //   const [skill, setSkill] = useState(prefilledSkill || "");
// //   const [title, setTitle] = useState("");
// //   const [quiz, setQuiz] = useState([
// //     { question: "", type: "mcq", options: ["", ""], correctAnswer: "" },
// //   ]);
// //   const [loading, setLoading] = useState(false);

// //   // ✅ Fetch student list (in case teacher opens directly)
// //   useEffect(() => {
// //     const fetchStudents = async () => {
// //       try {
// //         const res = await fetch("/api/assign");
// //         const data = await res.json();
// //         if (data.students) setStudents(data.students);
// //       } catch (err) {
// //         console.error("❌ Failed to load students:", err);
// //       }
// //     };
// //     fetchStudents();
// //   }, []);

// //   // ✅ Add new question
// //   const addQuestion = () => {
// //     setQuiz([
// //       ...quiz,
// //       { question: "", type: "mcq", options: ["", ""], correctAnswer: "" },
// //     ]);
// //   };

// //   // ✅ Handle field change
// //   const handleChange = (index, field, value) => {
// //     const updated = [...quiz];
// //     updated[index][field] = value;

// //     if (field === "type" && value === "truefalse") {
// //       updated[index].options = ["True", "False"];
// //       updated[index].correctAnswer = "True";
// //     }

// //     if (field === "type" && value === "mcq") {
// //       updated[index].options = ["", ""];
// //       updated[index].correctAnswer = "";
// //     }

// //     setQuiz(updated);
// //   };

// //   // ✅ Option change for MCQs
// //   const handleOptionChange = (qIndex, optIndex, value) => {
// //     const updated = [...quiz];
// //     updated[qIndex].options[optIndex] = value;
// //     setQuiz(updated);
// //   };

// //   const addOption = (qIndex) => {
// //     const updated = [...quiz];
// //     updated[qIndex].options.push("");
// //     setQuiz(updated);
// //   };

// //   // ✅ Submit quiz
// //   const handleAssign = async () => {
// //     if (!selectedEmail || !skill || !title) {
// //       alert("⚠️ Please fill all fields before submitting!");
// //       return;
// //     }

// //     const formattedQuiz = quiz.map((q) => ({
// //       question: q.question.trim(),
// //       options: q.type === "truefalse" ? ["True", "False"] : q.options.filter(Boolean),
// //       correctAnswer: q.correctAnswer.trim(),
// //     }));

// //     const payload = {
// //       email: selectedEmail.trim(),
// //       skill,
// //       title,
// //       quiz: formattedQuiz,
// //       type: "quiz",
// //     };

// //     console.log("📤 Sending quiz payload:", payload);

// //     try {
// //       setLoading(true);
// //       const res = await fetch("/api/tasks/assign", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await res.json();
// //       if (res.ok) {
// //         alert("✅ Quiz assigned successfully!");
// //       } else {
// //         alert(`⚠️ ${data.error || "Failed to assign quiz"}`);
// //       }
// //     } catch (err) {
// //       console.error("❌ Error assigning quiz:", err);
// //       alert("Server error while assigning quiz.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <main className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 py-12 px-6">
// //       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
// //         <h1 className="text-3xl font-bold text-center text-sky-700 mb-10">
// //           🧩 Create & Assign Quiz
// //         </h1>

// //         {/* Student Email */}
// //         <div className="mb-6">
// //           <label className="font-semibold text-gray-700 block mb-2">
// //             Student Email
// //           </label>
// //           <input
// //             type="text"
// //             className={`w-full p-3 border border-gray-300 rounded-xl ${
// //               prefilledEmail ? "bg-gray-100 cursor-not-allowed" : ""
// //             }`}
// //             value={selectedEmail}
// //             onChange={(e) => setSelectedEmail(e.target.value)}
// //             readOnly={!!prefilledEmail}
// //           />
// //         </div>

// //         {/* Skill (Dropdown) */}
// //         <div className="mb-6">
// //           <label className="font-semibold text-gray-700 block mb-2">Skill</label>
// //           <select
// //             className={`w-full p-3 border border-gray-300 rounded-xl ${
// //               prefilledSkill ? "bg-gray-100 cursor-not-allowed" : ""
// //             }`}
// //             value={skill}
// //             onChange={(e) => setSkill(e.target.value)}
// //             disabled={!!prefilledSkill}
// //           >
// //             {!prefilledSkill && <option value="">-- Select a Skill --</option>}

// //             <optgroup label="Soft Skills 🗣️">
// //               <option value="Communication">Communication</option>
// //               <option value="Confidence">Confidence</option>
// //               <option value="Teamwork">Teamwork</option>
// //               <option value="Leadership">Leadership</option>
// //               <option value="Problem Solving">Problem Solving</option>
// //               <option value="Attitude">Attitude</option>
// //             </optgroup>

// //             <optgroup label="Technical Skills 💻">
// //               <option value="Data Structures & Algorithms">
// //                 Data Structures & Algorithms
// //               </option>
// //               <option value="Web Development">Web Development</option>
// //               <option value="Database Management">Database Management</option>
// //               <option value="AI / Machine Learning">AI / Machine Learning</option>
// //             </optgroup>
// //           </select>
// //         </div>

// //         {/* Quiz Title */}
// //         <div className="mb-6">
// //           <label className="font-semibold text-gray-700 block mb-2">
// //             Quiz Title
// //           </label>
// //           <input
// //             type="text"
// //             className="w-full p-3 border border-gray-300 rounded-xl"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             placeholder="Enter quiz title"
// //           />
// //         </div>

// //         {/* Questions Section */}
// //         {quiz.map((q, qIndex) => (
// //           <div
// //             key={qIndex}
// //             className="mb-8 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl p-6 border border-sky-100 shadow-sm"
// //           >
// //             <h3 className="text-lg font-semibold text-sky-800 mb-4">
// //               Question {qIndex + 1}
// //             </h3>

// //             {/* Question Text */}
// //             <input
// //               type="text"
// //               className="w-full p-3 mb-4 border border-gray-300 rounded-xl"
// //               placeholder="Enter question"
// //               value={q.question}
// //               onChange={(e) => handleChange(qIndex, "question", e.target.value)}
// //             />

// //             {/* Type Selector */}
// //             <div className="mb-4">
// //               <label className="block font-semibold text-gray-700 mb-2">
// //                 Question Type
// //               </label>
// //               <select
// //                 className="w-full p-3 border border-gray-300 rounded-xl"
// //                 value={q.type}
// //                 onChange={(e) => handleChange(qIndex, "type", e.target.value)}
// //               >
// //                 <option value="mcq">Multiple Choice</option>
// //                 <option value="truefalse">True / False</option>
// //               </select>
// //             </div>

// //             {/* Options for MCQ */}
// //             {q.type === "mcq" && (
// //               <div className="space-y-2 mb-4">
// //                 {q.options.map((opt, optIndex) => (
// //                   <input
// //                     key={optIndex}
// //                     type="text"
// //                     className="w-full p-2 border border-gray-300 rounded-xl"
// //                     placeholder={`Option ${optIndex + 1}`}
// //                     value={opt}
// //                     onChange={(e) =>
// //                       handleOptionChange(qIndex, optIndex, e.target.value)
// //                     }
// //                   />
// //                 ))}
// //                 <button
// //                   onClick={() => addOption(qIndex)}
// //                   className="text-sm text-sky-600 hover:underline mt-1"
// //                 >
// //                   + Add Option
// //                 </button>
// //               </div>
// //             )}

// //             {/* Correct Answer */}
// //             <div className="mb-4">
// //               <label className="block font-semibold text-gray-700 mb-2">
// //                 Correct Answer
// //               </label>
// //               {q.type === "truefalse" ? (
// //                 <select
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                   value={q.correctAnswer}
// //                   onChange={(e) => handleChange(qIndex, "correctAnswer", e.target.value)}
// //                 >
// //                   <option value="True">True</option>
// //                   <option value="False">False</option>
// //                 </select>
// //               ) : (
// //                 <input
// //                   type="text"
// //                   className="w-full p-3 border border-gray-300 rounded-xl"
// //                   placeholder="Enter correct option (e.g., A or text)"
// //                   value={q.correctAnswer}
// //                   onChange={(e) =>
// //                     handleChange(qIndex, "correctAnswer", e.target.value)
// //                   }
// //                 />
// //               )}
// //             </div>
// //           </div>
// //         ))}

// //         {/* Add Question Button */}
// //         <div className="flex justify-center mb-10">
// //           <button
// //             onClick={addQuestion}
// //             className="bg-sky-100 text-sky-700 px-6 py-2 rounded-xl font-semibold hover:bg-sky-200 transition-all"
// //           >
// //             + Add Another Question
// //           </button>
// //         </div>

// //         {/* Submit Button */}
// //         <div className="text-center">
// //           <button
// //             onClick={handleAssign}
// //             disabled={loading}
// //             className={`${
// //               loading
// //                 ? "bg-gray-400 cursor-not-allowed"
// //                 : "bg-gradient-to-r from-sky-500 to-emerald-500 hover:opacity-90"
// //             } text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-200`}
// //           >
// //             {loading ? "⏳ Saving..." : "✅ Save & Assign Quiz"}
// //           </button>
// //         </div>
// //       </div>
// //     </main>
// //   );
// // }
// "use client";
// import React, { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";

// export default function QuizSetupPage() {
//   const searchParams = useSearchParams();
//   const prefilledEmail = searchParams.get("student");
//   const prefilledSkill = searchParams.get("skill");

//   const [students, setStudents] = useState([]);
//   const [selectedEmail, setSelectedEmail] = useState(prefilledEmail || "");
//   const [skill, setSkill] = useState(prefilledSkill || "");
//   const [title, setTitle] = useState("");
//   const [quiz, setQuiz] = useState([
//     { question: "", type: "mcq", options: ["", ""], correctAnswer: "" },
//   ]);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch student list (in case teacher opens directly)
//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const res = await fetch("/api/assign");
//         const data = await res.json();
//         if (data.students) setStudents(data.students);
//       } catch (err) {
//         console.error("❌ Failed to load students:", err);
//       }
//     };
//     fetchStudents();
//   }, []);

//   // ✅ Add new question
//   const addQuestion = () => {
//     setQuiz([
//       ...quiz,
//       { question: "", type: "mcq", options: ["", ""], correctAnswer: "" },
//     ]);
//   };

//   // ✅ Handle field change
//   const handleChange = (index, field, value) => {
//     const updated = [...quiz];
//     updated[index][field] = value;

//     if (field === "type" && value === "truefalse") {
//       updated[index].options = ["True", "False"];
//       updated[index].correctAnswer = "True";
//     }

//     if (field === "type" && value === "mcq") {
//       updated[index].options = ["", "", "", ""];
//       updated[index].correctAnswer = "";
//     }

//     setQuiz(updated);
//   };

//   // ✅ Option change for MCQs
//   const handleOptionChange = (qIndex, optIndex, value) => {
//     const updated = [...quiz];
//     updated[qIndex].options[optIndex] = value;
//     setQuiz(updated);
//   };

//   const addOption = (qIndex) => {
//     const updated = [...quiz];
//     updated[qIndex].options.push("");
//     setQuiz(updated);
//   };

//   // ✅ Submit quiz
//   const handleAssign = async () => {
//     if (!selectedEmail || !skill || !title) {
//       alert("⚠️ Please fill all fields before submitting!");
//       return;
//     }

//     const formattedQuiz = quiz.map((q) => ({
//       question: q.question.trim(),
//       options: q.type === "truefalse" ? ["True", "False"] : q.options.filter(Boolean),
//       correctAnswer: q.correctAnswer.trim(),
//     }));

//     const payload = {
//       email: selectedEmail.trim(),
//       skill,
//       title,
//       quiz: formattedQuiz,
//       type: "quiz",
//     };

//     console.log("📤 Sending quiz payload:", payload);

//     try {
//       setLoading(true);
//       const res = await fetch("/api/tasks/assign", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         alert("✅ Quiz assigned successfully!");
//       } else {
//         alert(`⚠️ ${data.error || "Failed to assign quiz"}`);
//       }
//     } catch (err) {
//       console.error("❌ Error assigning quiz:", err);
//       alert("Server error while assigning quiz.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 py-12 px-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
//         <h1 className="text-3xl font-bold text-center text-sky-700 mb-10">
//           🧩 Create & Assign Quiz
//         </h1>

//         {/* Student Email */}
//         <div className="mb-6">
//           <label className="font-semibold text-gray-700 block mb-2">
//             Student Email
//           </label>
//           <input
//             type="text"
//             className={`w-full p-3 border border-gray-300 rounded-xl ${
//               prefilledEmail ? "bg-gray-100 cursor-not-allowed" : ""
//             }`}
//             value={selectedEmail}
//             onChange={(e) => setSelectedEmail(e.target.value)}
//             readOnly={!!prefilledEmail}
//           />
//         </div>

//         {/* Skill Dropdown */}
//         <div className="mb-6">
//           <label className="font-semibold text-gray-700 block mb-2">Skill</label>
//           <select
//             className={`w-full p-3 border border-gray-300 rounded-xl ${
//               prefilledSkill ? "bg-gray-100 cursor-not-allowed" : ""
//             }`}
//             value={skill}
//             onChange={(e) => setSkill(e.target.value)}
//             disabled={!!prefilledSkill}
//           >
//             {!prefilledSkill && <option value="">-- Select a Skill --</option>}

//             <optgroup label="Soft Skills 🗣️">
//               <option value="Communication">Communication</option>
//               <option value="Confidence">Confidence</option>
//               <option value="Teamwork">Teamwork</option>
//               <option value="Leadership">Leadership</option>
//               <option value="Problem Solving">Problem Solving</option>
//               <option value="Attitude">Attitude</option>
//             </optgroup>

//             <optgroup label="Technical Skills 💻">
//               <option value="Data Structures & Algorithms">
//                 Data Structures & Algorithms
//               </option>
//               <option value="Web Development">Web Development</option>
//               <option value="Database Management">Database Management</option>
//               <option value="AI / Machine Learning">AI / Machine Learning</option>
//             </optgroup>
//           </select>
//         </div>

//         {/* Quiz Title */}
//         <div className="mb-6">
//           <label className="font-semibold text-gray-700 block mb-2">
//             Quiz Title
//           </label>
//           <input
//             type="text"
//             className="w-full p-3 border border-gray-300 rounded-xl"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter quiz title"
//           />
//         </div>

//         {/* Questions Section */}
//         {quiz.map((q, qIndex) => (
//           <div
//             key={qIndex}
//             className="mb-8 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl p-6 border border-sky-100 shadow-sm"
//           >
//             <h3 className="text-lg font-semibold text-sky-800 mb-4">
//               Question {qIndex + 1}
//             </h3>

//             {/* Question Text */}
//             <input
//               type="text"
//               className="w-full p-3 mb-4 border border-gray-300 rounded-xl"
//               placeholder="Enter question"
//               value={q.question}
//               onChange={(e) => handleChange(qIndex, "question", e.target.value)}
//             />

//             {/* Type Selector */}
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-700 mb-2">
//                 Question Type
//               </label>
//               <select
//                 className="w-full p-3 border border-gray-300 rounded-xl"
//                 value={q.type}
//                 onChange={(e) => handleChange(qIndex, "type", e.target.value)}
//               >
//                 <option value="mcq">Multiple Choice</option>
//                 <option value="truefalse">True / False</option>
//               </select>
//             </div>

//             {/* Options for MCQ */}
//             {q.type === "mcq" && (
//               <div className="space-y-2 mb-4">
//                 {q.options.map((opt, optIndex) => (
//                   <input
//                     key={optIndex}
//                     type="text"
//                     className="w-full p-2 border border-gray-300 rounded-xl"
//                     placeholder={`Option ${optIndex + 1}`}
//                     value={opt}
//                     onChange={(e) =>
//                       handleOptionChange(qIndex, optIndex, e.target.value)
//                     }
//                   />
//                 ))}
//                 <button
//                   onClick={() => addOption(qIndex)}
//                   className="text-sm text-sky-600 hover:underline mt-1"
//                 >
//                   + Add Option
//                 </button>
//               </div>
//             )}

//             {/* ✅ Correct Answer Dropdown */}
//             <div className="mb-4">
//               <label className="block font-semibold text-gray-700 mb-2">
//                 Correct Answer
//               </label>
//               {q.type === "truefalse" ? (
//                 <select
//                   className="w-full p-3 border border-gray-300 rounded-xl"
//                   value={q.correctAnswer}
//                   onChange={(e) =>
//                     handleChange(qIndex, "correctAnswer", e.target.value)
//                   }
//                 >
//                   <option value="True">True</option>
//                   <option value="False">False</option>
//                 </select>
//               ) : (
//                 <select
//                   className="w-full p-3 border border-gray-300 rounded-xl overflow-y-auto"
//                   value={q.correctAnswer}
//                   onChange={(e) =>
//                     handleChange(qIndex, "correctAnswer", e.target.value)
//                   }
//                 >
//                   <option value="">-- Select Correct Option --</option>
//                   {q.options.map((opt, optIndex) => (
//                     <option key={optIndex} value={opt}>
//                       {String.fromCharCode(65 + optIndex)}.{" "}
//                       {opt || `Option ${optIndex + 1}`}
//                     </option>
//                   ))}
//                 </select>
//               )}
//             </div>
//           </div>
//         ))}

//         {/* Add Question Button */}
//         <div className="flex justify-center mb-10">
//           <button
//             onClick={addQuestion}
//             className="bg-sky-100 text-sky-700 px-6 py-2 rounded-xl font-semibold hover:bg-sky-200 transition-all"
//           >
//             + Add Another Question
//           </button>
//         </div>

//         {/* Submit Button */}
//         <div className="text-center">
//           <button
//             onClick={handleAssign}
//             disabled={loading}
//             className={`${
//               loading
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-gradient-to-r from-sky-500 to-emerald-500 hover:opacity-90"
//             } text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-200`}
//           >
//             {loading ? "⏳ Saving..." : "✅ Save & Assign Quiz"}
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function QuizSetupPage() {
  return (
    <Suspense fallback={<div className="p-10 text-sky-600 text-center">Loading Quiz Setup...</div>}>
      <QuizSetupContent />
    </Suspense>
  );
}

function QuizSetupContent() {
  const searchParams = useSearchParams();
  const prefilledEmail = searchParams.get("student");
  const prefilledSkill = searchParams.get("skill");

  const [students, setStudents] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(prefilledEmail || "");
  const [skill, setSkill] = useState(prefilledSkill || "");
  const [title, setTitle] = useState("");
  const [quiz, setQuiz] = useState([
    { question: "", type: "mcq", options: ["", ""], correctAnswer: "" },
  ]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch student list
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/assign");
        const data = await res.json();
        if (data.students) setStudents(data.students);
      } catch (err) {
        console.error("❌ Failed to load students:", err);
      }
    };
    fetchStudents();
  }, []);

  const addQuestion = () => {
    setQuiz([
      ...quiz,
      { question: "", type: "mcq", options: ["", ""], correctAnswer: "" },
    ]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...quiz];
    updated[index][field] = value;

    if (field === "type" && value === "truefalse") {
      updated[index].options = ["True", "False"];
      updated[index].correctAnswer = "True";
    }

    if (field === "type" && value === "mcq") {
      updated[index].options = ["", "", "", ""];
      updated[index].correctAnswer = "";
    }

    setQuiz(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...quiz];
    updated[qIndex].options[optIndex] = value;
    setQuiz(updated);
  };

  const addOption = (qIndex) => {
    const updated = [...quiz];
    updated[qIndex].options.push("");
    setQuiz(updated);
  };

  const handleAssign = async () => {
    if (!selectedEmail || !skill || !title) {
      alert("⚠️ Please fill all fields before submitting!");
      return;
    }

    const formattedQuiz = quiz.map((q) => ({
      question: q.question.trim(),
      options: q.type === "truefalse" ? ["True", "False"] : q.options.filter(Boolean),
      correctAnswer: q.correctAnswer.trim(),
    }));

    const payload = {
      email: selectedEmail.trim(),
      skill,
      title,
      quiz: formattedQuiz,
      type: "quiz",
    };

    try {
      setLoading(true);
      const res = await fetch("/api/tasks/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert("✅ Quiz assigned successfully!");
      } else {
        alert(`⚠️ ${data.error || "Failed to assign quiz"}`);
      }
    } catch (err) {
      console.error("❌ Error assigning quiz:", err);
      alert("Server error while assigning quiz.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-emerald-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-center text-sky-700 mb-10">
          🧩 Create & Assign Quiz
        </h1>

        {/* Student Email */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700 block mb-2">
            Student Email
          </label>
          <input
            type="text"
            className={`w-full p-3 border border-gray-300 rounded-xl ${
              prefilledEmail ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            value={selectedEmail}
            onChange={(e) => setSelectedEmail(e.target.value)}
            readOnly={!!prefilledEmail}
          />
        </div>

        {/* Skill Dropdown */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700 block mb-2">Skill</label>
          <select
            className={`w-full p-3 border border-gray-300 rounded-xl ${
              prefilledSkill ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            disabled={!!prefilledSkill}
          >
            {!prefilledSkill && <option value="">-- Select a Skill --</option>}

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
              <option value="Database Management">Database Management</option>
              <option value="AI / Machine Learning">AI / Machine Learning</option>
            </optgroup>
          </select>
        </div>

        {/* Quiz Title */}
        <div className="mb-6">
          <label className="font-semibold text-gray-700 block mb-2">
            Quiz Title
          </label>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-xl"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter quiz title"
          />
        </div>

        {/* Questions Section */}
        {quiz.map((q, qIndex) => (
          <div
            key={qIndex}
            className="mb-8 bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl p-6 border border-sky-100 shadow-sm"
          >
            <h3 className="text-lg font-semibold text-sky-800 mb-4">
              Question {qIndex + 1}
            </h3>

            <input
              type="text"
              className="w-full p-3 mb-4 border border-gray-300 rounded-xl"
              placeholder="Enter question"
              value={q.question}
              onChange={(e) => handleChange(qIndex, "question", e.target.value)}
            />

            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">
                Question Type
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-xl"
                value={q.type}
                onChange={(e) => handleChange(qIndex, "type", e.target.value)}
              >
                <option value="mcq">Multiple Choice</option>
                <option value="truefalse">True / False</option>
              </select>
            </div>

            {q.type === "mcq" && (
              <div className="space-y-2 mb-4">
                {q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-xl"
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt}
                    onChange={(e) =>
                      handleOptionChange(qIndex, optIndex, e.target.value)
                    }
                  />
                ))}
                <button
                  onClick={() => addOption(qIndex)}
                  className="text-sm text-sky-600 hover:underline mt-1"
                >
                  + Add Option
                </button>
              </div>
            )}

            <div className="mb-4">
              <label className="block font-semibold text-gray-700 mb-2">
                Correct Answer
              </label>
              {q.type === "truefalse" ? (
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleChange(qIndex, "correctAnswer", e.target.value)
                  }
                >
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              ) : (
                <select
                  className="w-full p-3 border border-gray-300 rounded-xl"
                  value={q.correctAnswer}
                  onChange={(e) =>
                    handleChange(qIndex, "correctAnswer", e.target.value)
                  }
                >
                  <option value="">-- Select Correct Option --</option>
                  {q.options.map((opt, optIndex) => (
                    <option key={optIndex} value={opt}>
                      {String.fromCharCode(65 + optIndex)}.{" "}
                      {opt || `Option ${optIndex + 1}`}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-center mb-10">
          <button
            onClick={addQuestion}
            className="bg-sky-100 text-sky-700 px-6 py-2 rounded-xl font-semibold hover:bg-sky-200 transition-all"
          >
            + Add Another Question
          </button>
        </div>

        <div className="text-center">
          <button
            onClick={handleAssign}
            disabled={loading}
            className={`${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-sky-500 to-emerald-500 hover:opacity-90"
            } text-white px-8 py-3 rounded-xl font-semibold shadow-md transition-all duration-200`}
          >
            {loading ? "⏳ Saving..." : "✅ Save & Assign Quiz"}
          </button>
        </div>
      </div>
    </main>
  );
}
