// // // // "use client";
// // // // import React, { useEffect, useState } from "react";
// // // // import { useSession } from "next-auth/react";

// // // // const defaultSoftSkills = [
// // // //   {
// // // //     name: "Communication 🗣️",
// // // //     level: 78,
// // // //     feedback: "Clear expression and tone. Minor hesitation in introductions.",
// // // //     tips: [
// // // //       "Practice short self-introductions daily.",
// // // //       "Avoid filler words (‘um’, ‘like’).",
// // // //       "Join group discussions weekly.",
// // // //     ],
// // // //   },
// // // //   {
// // // //     name: "Confidence 💪",
// // // //     level: 82,
// // // //     feedback: "Confident answers, but needs steadier posture.",
// // // //     tips: [
// // // //       "Speak slower and emphasize keywords.",
// // // //       "Practice in front of a mirror.",
// // // //       "Record yourself explaining project work.",
// // // //     ],
// // // //   },
// // // //   {
// // // //     name: "Teamwork 🤝",
// // // //     level: 67,
// // // //     feedback: "Co-operative attitude; could take more initiative.",
// // // //     tips: [
// // // //       "Take turns leading team discussions.",
// // // //       "Encourage quieter members to share ideas.",
// // // //       "Volunteer to summarize group results.",
// // // //     ],
// // // //   },
// // // //   {
// // // //     name: "Leadership 🌟",
// // // //     level: 69,
// // // //     feedback: "Good vision; needs better task delegation.",
// // // //     tips: [
// // // //       "Set clear goals before meetings.",
// // // //       "Balance assertiveness with empathy.",
// // // //       "Acknowledge teammates’ strengths.",
// // // //     ],
// // // //   },
// // // // ];

// // // // const defaultTechSkills = [
// // // //   {
// // // //     name: "Data Structures & Algorithms 🧮",
// // // //     level: 76,
// // // //     project: "Solved 120+ LeetCode problems.",
// // // //     goals: [
// // // //       "Focus on Dynamic Programming patterns.",
// // // //       "Improve time-complexity analysis.",
// // // //       "Revise graph & recursion problems.",
// // // //     ],
// // // //   },
// // // //   {
// // // //     name: "Web Development 🌐",
// // // //     level: 83,
// // // //     project: "Built a MERN placement tracker app.",
// // // //     goals: [
// // // //       "Add authentication with NextAuth.",
// // // //       "Implement file uploads & dashboards.",
// // // //       "Deploy with Vercel and optimize SEO.",
// // // //     ],
// // // //   },
// // // //   {
// // // //     name: "Database Management 🗄️",
// // // //     level: 70,
// // // //     project: "Created MySQL schema for student data.",
// // // //     goals: [
// // // //       "Learn indexing & query optimization.",
// // // //       "Normalize complex relationships.",
// // // //       "Try MongoDB aggregation pipelines.",
// // // //     ],
// // // //   },
// // // //   {
// // // //     name: "AI / Machine Learning 🤖",
// // // //     level: 62,
// // // //     project: "Trained a basic decision-tree classifier.",
// // // //     goals: [
// // // //       "Study feature scaling & normalization.",
// // // //       "Experiment with scikit-learn pipelines.",
// // // //       "Build a mini ML project with real data.",
// // // //     ],
// // // //   },
// // // // ];

// // // // const CombinedSkillDashboard = () => {
// // // //   const { data: session } = useSession();
// // // //   const [softSkills, setSoftSkills] = useState(defaultSoftSkills);
// // // //   const [techSkills, setTechSkills] = useState(defaultTechSkills);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [saving, setSaving] = useState(false);

// // // //   // Fetch from backend
// // // //   useEffect(() => {
// // // //     const fetchSkills = async () => {
// // // //       if (!session?.user?.email) return;
// // // //       try {
// // // //         const res = await fetch(`/api/skills?userId=${session.user.email}`);
// // // //         const data = await res.json();
// // // //         if (data?.softSkills?.length) setSoftSkills(data.softSkills);
// // // //         if (data?.techSkills?.length) setTechSkills(data.techSkills);
// // // //       } catch (err) {
// // // //         console.error("Failed to fetch skills:", err);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };
// // // //     fetchSkills();
// // // //   }, [session]);

// // // //   // Save or Update
// // // //   const handleSave = async () => {
// // // //     if (!session?.user?.email) return alert("Please log in to save progress.");
// // // //     setSaving(true);
// // // //     try {
// // // //       const res = await fetch("/api/skills", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           userId: session.user.email,
// // // //           softSkills,
// // // //           techSkills,
// // // //         }),
// // // //       });
// // // //       const result = await res.json();
// // // //       console.log("Saved:", result);
// // // //       alert("✅ Progress saved successfully!");
// // // //     } catch (err) {
// // // //       console.error(err);
// // // //       alert("❌ Failed to save progress.");
// // // //     } finally {
// // // //       setSaving(false);
// // // //     }
// // // //   };

// // // //   if (loading)
// // // //     return (
// // // //       <div className="flex justify-center items-center h-screen bg-sky-50">
// // // //         <div className="text-sky-600 text-lg font-semibold animate-pulse">
// // // //           Loading your Placify Dashboard...
// // // //         </div>
// // // //       </div>
// // // //     );

// // // //   return (
// // // //     <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-emerald-50 p-8 md:p-16 mt-10">
// // // //       {/* Header */}
// // // //       <h1 className="text-4xl font-bold text-center text-sky-800 mb-4">
// // // //         Placify Skill Growth Dashboard 💼
// // // //       </h1>
// // // //       <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
// // // //         Track your technical and soft skill progress side-by-side.  
// // // //         Placify helps you grow both coding mastery 🧠 and communication confidence 💬.
// // // //       </p>

// // // //       {/* Soft Skills */}
// // // //       <section className="mb-16">
// // // //         <h2 className="text-3xl font-semibold text-sky-700 mb-6 text-center">
// // // //           Soft Skill Development 🌤️
// // // //         </h2>
// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// // // //           {softSkills.map((skill, i) => (
// // // //             <div
// // // //               key={i}
// // // //               className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-sky-400"
// // // //             >
// // // //               <h3 className="text-xl font-semibold text-sky-800 mb-3">
// // // //                 {skill.name}
// // // //               </h3>
// // // //               <div className="w-full bg-gray-200 h-3 rounded-full mb-3">
// // // //                 <div
// // // //                   className="bg-sky-600 h-3 rounded-full transition-all duration-700"
// // // //                   style={{ width: `${skill.level}%` }}
// // // //                 ></div>
// // // //               </div>
// // // //               <p className="text-gray-600 text-sm mb-3">
// // // //                 Level: <strong>{skill.level}%</strong>
// // // //               </p>
// // // //               <div className="bg-sky-50 p-3 rounded-xl mb-3">
// // // //                 <h4 className="font-semibold text-sky-700 mb-1">
// // // //                   Teacher Feedback 📝
// // // //                 </h4>
// // // //                 <p className="text-gray-700 text-sm">{skill.feedback}</p>
// // // //               </div>
// // // //               <div className="bg-amber-50 p-3 rounded-xl">
// // // //                 <h4 className="font-semibold text-amber-700 mb-2">
// // // //                   Improvement Tips ✨
// // // //                 </h4>
// // // //                 <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
// // // //                   {skill.tips.map((tip, idx) => (
// // // //                     <li key={idx}>{tip}</li>
// // // //                   ))}
// // // //                 </ul>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </section>

// // // //       {/* Technical Skills */}
// // // //       <section>
// // // //         <h2 className="text-3xl font-semibold text-emerald-700 mb-6 text-center">
// // // //           Technical Skill Progress 💻
// // // //         </h2>
// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// // // //           {techSkills.map((skill, i) => (
// // // //             <div
// // // //               key={i}
// // // //               className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-emerald-400"
// // // //             >
// // // //               <h3 className="text-xl font-semibold text-emerald-800 mb-3">
// // // //                 {skill.name}
// // // //               </h3>
// // // //               <div className="w-full bg-gray-200 h-3 rounded-full mb-3">
// // // //                 <div
// // // //                   className="bg-emerald-500 h-3 rounded-full transition-all duration-700"
// // // //                   style={{ width: `${skill.level}%` }}
// // // //                 ></div>
// // // //               </div>
// // // //               <p className="text-gray-600 text-sm mb-3">
// // // //                 Level: <strong>{skill.level}%</strong>
// // // //               </p>
// // // //               <div className="bg-emerald-50 p-3 rounded-xl mb-3">
// // // //                 <h4 className="font-semibold text-emerald-700 mb-1">
// // // //                   Project Status 💡
// // // //                 </h4>
// // // //                 <p className="text-gray-700 text-sm">{skill.project}</p>
// // // //               </div>
// // // //               <div className="bg-amber-50 p-3 rounded-xl">
// // // //                 <h4 className="font-semibold text-amber-700 mb-2">
// // // //                   Next Learning Goals 🚀
// // // //                 </h4>
// // // //                 <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
// // // //                   {skill.goals.map((goal, idx) => (
// // // //                     <li key={idx}>{goal}</li>
// // // //                   ))}
// // // //                 </ul>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       </section>

// // // //       {/* Footer */}
// // // //       <div className="bg-white mt-16 p-8 rounded-2xl shadow-lg text-center max-w-3xl mx-auto">
// // // //         <h3 className="text-2xl font-semibold text-sky-700 mb-2">
// // // //           Overall Growth Summary 📈
// // // //         </h3>
// // // //         <p className="text-gray-700 mb-4 text-sm">
// // // //           You’re building strong balance between technical and soft skills.  
// // // //           Continue consistent learning — Placify recommends focusing next on AI/ML and Leadership areas. 💪
// // // //         </p>
// // // //         <button
// // // //           onClick={handleSave}
// // // //           disabled={saving}
// // // //           className={`${
// // // //             saving ? "bg-gray-400" : "bg-sky-600 hover:bg-sky-700"
// // // //           } text-white px-6 py-2 rounded-xl font-semibold transition-transform hover:scale-105`}
// // // //         >
// // // //           {saving ? "Saving..." : "Save Progress to Placify 🚀"}
// // // //         </button>
// // // //       </div>
// // // //     </main>
// // // //   );
// // // // };

// // // // export default CombinedSkillDashboard;

// // // // app/dashboard/page.jsx
// // // "use client";
// // // import React, { useEffect, useState } from "react";
// // // import { useSession } from "next-auth/react";

// // // export default function CombinedSkillDashboard() {
// // //   const { data: session } = useSession();
// // //   const [doc, setDoc] = useState(null);
// // //   const [loading, setLoading] = useState(true);

// // //   const fetchSkills = async () => {
// // //     if (!session?.user?.email) return;
// // //     setLoading(true);
// // //     const res = await fetch(`/api/skills?userId=${session.user.email}`);
// // //     const data = await res.json();
// // //     setDoc(data || {});
// // //     setLoading(false);
// // //   };

// // //   useEffect(() => {
// // //     fetchSkills();
// // //   }, [session]);

// // //   if (!session) {
// // //     return (
// // //       <main className="min-h-screen flex items-center justify-center">
// // //         <div className="text-sky-700">Please login to view your dashboard.</div>
// // //       </main>
// // //     );
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <main className="min-h-screen flex items-center justify-center bg-sky-50">
// // //         <div className="text-sky-700 font-semibold animate-pulse">Loading Placify Dashboard…</div>
// // //       </main>
// // //     );
// // //   }

// // //   const softSkills = doc?.softSkills || [];
// // //   const techSkills = doc?.techSkills || [];

// // //   return (
// // //     <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-emerald-50 p-8 md:p-16 mt-10">
// // //       <h1 className="text-4xl font-bold text-center text-sky-800 mb-4">
// // //         Placify Skill Growth Dashboard 💼
// // //       </h1>
// // //       <p className="text-gray-700 text-center mb-10 max-w-2xl mx-auto">
// // //         AI + Teacher + Tasks se banne wala aapka combined score — live progress dekhte rahiye 📈
// // //       </p>

// // //       {/* Soft Skills */}
// // //       <section className="mb-16">
// // //         <h2 className="text-3xl font-semibold text-sky-700 mb-6 text-center">
// // //           Soft Skill Development 🌤️
// // //         </h2>

// // //         {softSkills.length === 0 && (
// // //           <p className="text-center text-gray-500">No data yet — start chatting with AI to generate analysis 💬</p>
// // //         )}

// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// // //           {softSkills.map((s, i) => (
// // //             <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-sky-400">
// // //               <h3 className="text-xl font-semibold text-sky-800 mb-3">{s.name}</h3>

// // //               {/* Breakdown */}
// // //               <p className="text-xs text-gray-600 mb-2">
// // //                 AI: <b>{s.aiScore}%</b> • Teacher: <b>{s.teacherScore}%</b> • Tasks: <b>{s.taskScore}%</b>
// // //               </p>

// // //               <div className="w-full bg-gray-200 h-3 rounded-full mb-1">
// // //                 <div className="bg-sky-600 h-3 rounded-full transition-all duration-700" style={{ width: `${s.finalScore}%` }}></div>
// // //               </div>
// // //               <p className="text-gray-600 text-sm mb-3">Final: <b>{s.finalScore}%</b></p>

// // //               {s.feedback && (
// // //                 <div className="bg-sky-50 p-3 rounded-xl mb-3">
// // //                   <h4 className="font-semibold text-sky-700 mb-1">Feedback 📝</h4>
// // //                   <p className="text-gray-700 text-sm">{s.feedback}</p>
// // //                 </div>
// // //               )}
// // //               {s.tips?.length > 0 && (
// // //                 <div className="bg-amber-50 p-3 rounded-xl">
// // //                   <h4 className="font-semibold text-amber-700 mb-2">Improvement Tips ✨</h4>
// // //                   <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
// // //                     {s.tips.map((t, idx) => <li key={idx}>{t}</li>)}
// // //                   </ul>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </section>

// // //       {/* Technical Skills */}
// // //       <section>
// // //         <h2 className="text-3xl font-semibold text-emerald-700 mb-6 text-center">
// // //           Technical Skill Progress 💻
// // //         </h2>

// // //         {techSkills.length === 0 && (
// // //           <p className="text-center text-gray-500">No data yet — try discussing projects with AI or complete tasks ✅</p>
// // //         )}

// // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// // //           {techSkills.map((s, i) => (
// // //             <div key={i} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-emerald-400">
// // //               <h3 className="text-xl font-semibold text-emerald-800 mb-3">{s.name}</h3>

// // //               <p className="text-xs text-gray-600 mb-2">
// // //                 AI: <b>{s.aiScore}%</b> • Teacher: <b>{s.teacherScore}%</b> • Tasks: <b>{s.taskScore}%</b>
// // //               </p>

// // //               <div className="w-full bg-gray-200 h-3 rounded-full mb-1">
// // //                 <div className="bg-emerald-500 h-3 rounded-full transition-all duration-700" style={{ width: `${s.finalScore}%` }}></div>
// // //               </div>
// // //               <p className="text-gray-600 text-sm mb-3">Final: <b>{s.finalScore}%</b></p>

// // //               {s.project && (
// // //                 <div className="bg-emerald-50 p-3 rounded-xl mb-3">
// // //                   <h4 className="font-semibold text-emerald-700 mb-1">Project 💡</h4>
// // //                   <p className="text-gray-700 text-sm">{s.project}</p>
// // //                 </div>
// // //               )}
// // //               {s.goals?.length > 0 && (
// // //                 <div className="bg-amber-50 p-3 rounded-xl">
// // //                   <h4 className="font-semibold text-amber-700 mb-2">Next Goals 🚀</h4>
// // //                   <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
// // //                     {s.goals.map((g, idx) => <li key={idx}>{g}</li>)}
// // //                   </ul>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           ))}
// // //         </div>
// // //       </section>

// // //       {/* Action Row */}
// // //       <div className="bg-white mt-16 p-8 rounded-2xl shadow-lg text-center max-w-3xl mx-auto">
// // //         <h3 className="text-2xl font-semibold text-sky-700 mb-2">Overall Growth Summary 📈</h3>
// // //         <p className="text-gray-700 mb-4 text-sm">AI + Teacher + Tasks = your true readiness score.</p>
// // //         <div className="flex gap-2 justify-center">
// // //           <button
// // //             onClick={fetchSkills}
// // //             className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-xl font-semibold transition-transform hover:scale-105"
// // //           >
// // //             Refresh Scores
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </main>
// // //   );
// // // }

// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { useSession } from "next-auth/react";

// // export default function CombinedSkillDashboard() {
// //   const { data: session } = useSession();
// //   const [doc, setDoc] = useState(null);
// //   const [profile, setProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //   // ✅ Fetch both skills and user profile (to show feedback)
// //   const fetchData = async () => {
// //     if (!session?.user?.email) return;
// //     setLoading(true);
// //     try {
// //       const [skillsRes, profileRes] = await Promise.all([
// //         fetch(`/api/skills?userId=${session.user.email}`),
// //         fetch(`/api/profile`),
// //       ]);

// //       const skillsData = await skillsRes.json();
// //       const profileData = await profileRes.json();

// //       setDoc(skillsData || {});
// //       setProfile(profileData || {});
// //     } catch (err) {
// //       console.error("Error fetching dashboard data:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //   }, [session]);

// //   if (!session) {
// //     return (
// //       <main className="min-h-screen flex items-center justify-center">
// //         <div className="text-sky-700">Please login to view your dashboard.</div>
// //       </main>
// //     );
// //   }

// //   if (loading) {
// //     return (
// //       <main className="min-h-screen flex items-center justify-center bg-sky-50">
// //         <div className="text-sky-700 font-semibold animate-pulse">
// //           Loading Placify Dashboard…
// //         </div>
// //       </main>
// //     );
// //   }

// //   const softSkills = doc?.softSkills || [];
// //   const techSkills = doc?.techSkills || [];
// //   const feedback = profile?.feedback;

// //   return (
// //     <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-emerald-50 p-8 md:p-16 mt-10">
// //       {/* Header */}
// //       <h1 className="text-4xl font-bold text-center text-sky-800 mb-4">
// //         Placify Skill Growth Dashboard 💼
// //       </h1>
// //       <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
// //         AI + Teacher + Tasks se banne wala aapka combined score — live progress dekhte rahiye 📈
// //       </p>

// //       {/* 🧑‍🏫 Teacher Feedback Box */}
// //       {feedback ? (
// //         <div className="max-w-3xl mx-auto bg-gradient-to-br from-sky-50 to-white border border-sky-200 rounded-2xl shadow-md p-6 mb-10">
// //           <div className="flex justify-between items-center mb-2">
// //             <h2 className="text-xl font-semibold text-sky-700">
// //               🧑‍🏫 Latest Feedback from Your Mentor
// //             </h2>
// //             <span className="text-xs text-gray-500">
// //               {new Date(feedback.date).toLocaleDateString()}
// //             </span>
// //           </div>
// //           <p className="text-gray-800 text-base mb-2">
// //             <strong>Rating:</strong> <span className="text-sky-700 font-semibold">{feedback.rating}/10</span>
// //           </p>
// //           <p className="italic text-gray-700">“{feedback.feedback}”</p>
// //         </div>
// //       ) : (
// //         <div className="max-w-2xl mx-auto text-center bg-sky-50 border border-sky-100 rounded-xl py-4 mb-10 text-gray-500">
// //           No mentor feedback yet — once your teacher reviews, it’ll appear here 📝
// //         </div>
// //       )}

// //       {/* 🌤️ Soft Skills */}
// //       <section className="mb-16">
// //         <h2 className="text-3xl font-semibold text-sky-700 mb-6 text-center">
// //           Soft Skill Development 🌤️
// //         </h2>

// //         {softSkills.length === 0 && (
// //           <p className="text-center text-gray-500">
// //             No data yet — start chatting with AI to generate analysis 💬
// //           </p>
// //         )}

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {softSkills.map((s, i) => (
// //             <div
// //               key={i}
// //               className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-sky-400"
// //             >
// //               <h3 className="text-xl font-semibold text-sky-800 mb-3">
// //                 {s.name}
// //               </h3>

// //               <p className="text-xs text-gray-600 mb-2">
// //                 AI: <b>{s.aiScore}%</b> • Teacher: <b>{s.teacherScore}%</b> • Tasks: <b>{s.taskScore}%</b>
// //               </p>

// //               <div className="w-full bg-gray-200 h-3 rounded-full mb-1">
// //                 <div
// //                   className="bg-sky-600 h-3 rounded-full transition-all duration-700"
// //                   style={{ width: `${s.finalScore}%` }}
// //                 ></div>
// //               </div>
// //               <p className="text-gray-600 text-sm mb-3">
// //                 Final: <b>{s.finalScore}%</b>
// //               </p>

// //               {s.feedback && (
// //                 <div className="bg-sky-50 p-3 rounded-xl mb-3">
// //                   <h4 className="font-semibold text-sky-700 mb-1">
// //                     Feedback 📝
// //                   </h4>
// //                   <p className="text-gray-700 text-sm">{s.feedback}</p>
// //                 </div>
// //               )}
// //               {s.tips?.length > 0 && (
// //                 <div className="bg-amber-50 p-3 rounded-xl">
// //                   <h4 className="font-semibold text-amber-700 mb-2">
// //                     Improvement Tips ✨
// //                   </h4>
// //                   <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
// //                     {s.tips.map((t, idx) => (
// //                       <li key={idx}>{t}</li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* 💻 Technical Skills */}
// //       <section>
// //         <h2 className="text-3xl font-semibold text-emerald-700 mb-6 text-center">
// //           Technical Skill Progress 💻
// //         </h2>

// //         {techSkills.length === 0 && (
// //           <p className="text-center text-gray-500">
// //             No data yet — try discussing projects with AI or complete tasks ✅
// //           </p>
// //         )}

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
// //           {techSkills.map((s, i) => (
// //             <div
// //               key={i}
// //               className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-emerald-400"
// //             >
// //               <h3 className="text-xl font-semibold text-emerald-800 mb-3">
// //                 {s.name}
// //               </h3>

// //               <p className="text-xs text-gray-600 mb-2">
// //                 AI: <b>{s.aiScore}%</b> • Teacher: <b>{s.teacherScore}%</b> • Tasks: <b>{s.taskScore}%</b>
// //               </p>

// //               <div className="w-full bg-gray-200 h-3 rounded-full mb-1">
// //                 <div
// //                   className="bg-emerald-500 h-3 rounded-full transition-all duration-700"
// //                   style={{ width: `${s.finalScore}%` }}
// //                 ></div>
// //               </div>
// //               <p className="text-gray-600 text-sm mb-3">
// //                 Final: <b>{s.finalScore}%</b>
// //               </p>

// //               {s.project && (
// //                 <div className="bg-emerald-50 p-3 rounded-xl mb-3">
// //                   <h4 className="font-semibold text-emerald-700 mb-1">
// //                     Project 💡
// //                   </h4>
// //                   <p className="text-gray-700 text-sm">{s.project}</p>
// //                 </div>
// //               )}
// //               {s.goals?.length > 0 && (
// //                 <div className="bg-amber-50 p-3 rounded-xl">
// //                   <h4 className="font-semibold text-amber-700 mb-2">
// //                     Next Goals 🚀
// //                   </h4>
// //                   <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
// //                     {s.goals.map((g, idx) => (
// //                       <li key={idx}>{g}</li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )}
// //             </div>
// //           ))}
// //         </div>
// //       </section>

// //       {/* 📊 Footer */}
// //       <div className="bg-white mt-16 p-8 rounded-2xl shadow-lg text-center max-w-3xl mx-auto">
// //         <h3 className="text-2xl font-semibold text-sky-700 mb-2">
// //           Overall Growth Summary 📈
// //         </h3>
// //         <p className="text-gray-700 mb-4 text-sm">
// //           AI + Teacher + Tasks = your true readiness score.
// //         </p>
// //         <button
// //           onClick={fetchData}
// //           className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-xl font-semibold transition-transform hover:scale-105"
// //         >
// //           Refresh Dashboard 🔄
// //         </button>
// //       </div>
// //     </main>
// //   );
// // }


// "use client";
// import React, { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";

// export default function CombinedSkillDashboard() {
//   const { data: session } = useSession();
//   const [doc, setDoc] = useState(null);
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch skills + profile data
//   const fetchData = async () => {
//     if (!session?.user?.email) return;
//     setLoading(true);
//     try {
//       const [skillsRes, profileRes] = await Promise.all([
//         fetch(`/api/skills?userId=${session.user.email}`),
//         fetch(`/api/profile`),
//       ]);
//       const skillsData = await skillsRes.json();
//       const profileData = await profileRes.json();
//       setDoc(skillsData || {});
//       setProfile(profileData || {});
//     } catch (err) {
//       console.error("Error fetching dashboard data:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [session]);

//   if (!session)
//     return (
//       <main className="min-h-screen flex items-center justify-center">
//         <div className="text-sky-700 text-lg">
//           Please login to view your dashboard.
//         </div>
//       </main>
//     );

//   if (loading)
//     return (
//       <main className="min-h-screen flex items-center justify-center bg-sky-50">
//         <div className="text-sky-700 font-semibold animate-pulse">
//           Loading Placify Dashboard…
//         </div>
//       </main>
//     );

//   const softSkills = doc?.softSkills || [];
//   const techSkills = doc?.techSkills || [];
//   const feedback = profile?.feedback;

//   return (
//     <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-emerald-50 p-8 md:p-16 mt-10">
//       {/* HEADER */}
//       <h1 className="text-4xl font-bold text-center text-sky-800 mb-4">
//         Placify Skill Growth Dashboard 💼
//       </h1>
//       <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
//         AI + Teacher + Tasks se banne wala aapka combined score — live progress
//         dekhte rahiye 📈
//       </p>

//       {/* 🧑‍🏫 Mentor Feedback (Read Only for students) */}
//       {feedback ? (
//         <div className="max-w-3xl mx-auto bg-gradient-to-br from-sky-50 to-white border border-sky-200 rounded-2xl shadow-md p-6 mb-10">
//           <div className="flex justify-between items-center mb-2">
//             <h2 className="text-xl font-semibold text-sky-700">
//               🧑‍🏫 Latest Feedback from Your Mentor
//             </h2>
//             <span className="text-xs text-gray-500">
//               {new Date(feedback.date).toLocaleDateString()}
//             </span>
//           </div>
//           <p className="text-gray-800 text-base mb-2">
//             <strong>Rating:</strong>{" "}
//             <span className="text-sky-700 font-semibold">
//               {feedback.rating}/10
//             </span>
//           </p>
//           <p className="italic text-gray-700">“{feedback.feedback}”</p>
//         </div>
//       ) : (
//         <div className="max-w-2xl mx-auto text-center bg-sky-50 border border-sky-100 rounded-xl py-4 mb-10 text-gray-500">
//           No mentor feedback yet — once your teacher reviews, it’ll appear here 📝
//         </div>
//       )}

//       {/* 🌤️ Soft Skills */}
//       <section className="mb-16">
//         <h2 className="text-3xl font-semibold text-sky-700 mb-6 text-center">
//           Soft Skill Development 🌤️
//         </h2>

//         {softSkills.length === 0 && (
//           <p className="text-center text-gray-500 mb-6 italic">
//             No soft skills data yet — complete a few activities to begin tracking.
//           </p>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {softSkills.map((s, i) => (
//             <div
//               key={i}
//               className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-sky-400"
//             >
//               <h3 className="text-xl font-semibold text-sky-800 mb-3">
//                 {s.name}
//               </h3>

//               <p className="text-xs text-gray-600 mb-2">
//                 AI: <b>{s.aiScore}%</b> • Teacher: <b>{s.teacherScore}%</b> •
//                 Tasks: <b>{s.taskScore}%</b>
//               </p>

//               <div className="w-full bg-gray-200 h-3 rounded-full mb-1">
//                 <div
//                   className="bg-sky-600 h-3 rounded-full transition-all duration-700"
//                   style={{ width: `${s.finalScore}%` }}
//                 ></div>
//               </div>
//               <p className="text-gray-600 text-sm mb-3">
//                 Final: <b>{s.finalScore}%</b>
//               </p>

//               {s.feedback && (
//                 <div className="bg-sky-50 p-3 rounded-xl mb-3">
//                   <h4 className="font-semibold text-sky-700 mb-1">
//                     Feedback 📝
//                   </h4>
//                   <p className="text-gray-700 text-sm">{s.feedback}</p>
//                 </div>
//               )}
//               {s.tips?.length > 0 && (
//                 <div className="bg-amber-50 p-3 rounded-xl">
//                   <h4 className="font-semibold text-amber-700 mb-2">
//                     Improvement Tips ✨
//                   </h4>
//                   <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
//                     {s.tips.map((t, idx) => (
//                       <li key={idx}>{t}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 💻 Technical Skills */}
//       <section>
//         <h2 className="text-3xl font-semibold text-emerald-700 mb-6 text-center">
//           Technical Skill Progress 💻
//         </h2>

//         {techSkills.length === 0 && (
//           <p className="text-center text-gray-500 mb-6 italic">
//             No technical skills data yet — complete projects or discuss with AI ✅
//           </p>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//           {techSkills.map((s, i) => (
//             <div
//               key={i}
//               className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-emerald-400"
//             >
//               <h3 className="text-xl font-semibold text-emerald-800 mb-3">
//                 {s.name}
//               </h3>

//               <p className="text-xs text-gray-600 mb-2">
//                 AI: <b>{s.aiScore}%</b> • Teacher: <b>{s.teacherScore}%</b> •
//                 Tasks: <b>{s.taskScore}%</b>
//               </p>

//               <div className="w-full bg-gray-200 h-3 rounded-full mb-1">
//                 <div
//                   className="bg-emerald-500 h-3 rounded-full transition-all duration-700"
//                   style={{ width: `${s.finalScore}%` }}
//                 ></div>
//               </div>
//               <p className="text-gray-600 text-sm mb-3">
//                 Final: <b>{s.finalScore}%</b>
//               </p>

//               {s.project && (
//                 <div className="bg-emerald-50 p-3 rounded-xl mb-3">
//                   <h4 className="font-semibold text-emerald-700 mb-1">
//                     Project 💡
//                   </h4>
//                   <p className="text-gray-700 text-sm">{s.project}</p>
//                 </div>
//               )}
//               {s.goals?.length > 0 && (
//                 <div className="bg-amber-50 p-3 rounded-xl">
//                   <h4 className="font-semibold text-amber-700 mb-2">
//                     Next Goals 🚀
//                   </h4>
//                   <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
//                     {s.goals.map((g, idx) => (
//                       <li key={idx}>{g}</li>
//                     ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* 📊 Footer */}
//       <div className="bg-white mt-16 p-8 rounded-2xl shadow-lg text-center max-w-3xl mx-auto">
//         <h3 className="text-2xl font-semibold text-sky-700 mb-2">
//           Overall Growth Summary 📈
//         </h3>
//         <p className="text-gray-700 mb-4 text-sm">
//           AI + Teacher + Tasks = your true readiness score.
//         </p>
//         <button
//           onClick={fetchData}
//           className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-xl font-semibold transition-transform hover:scale-105"
//         >
//           Refresh Dashboard 🔄
//         </button>
//       </div>
//     </main>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function CombinedSkillDashboard() {
  const { data: session } = useSession();
  const [doc, setDoc] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    try {
      const [skillsRes, profileRes] = await Promise.all([
        fetch(`/api/skills?userId=${session.user.email}`),
        fetch(`/api/profile`),
      ]);
      const skillsData = await skillsRes.json();
      const profileData = await profileRes.json();
      setDoc(skillsData || {});
      setProfile(profileData || {});
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  if (!session)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-sky-700 text-lg">
          Please login to view your dashboard.
        </div>
      </main>
    );

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center bg-sky-50">
        <div className="text-sky-700 font-semibold animate-pulse">
          Loading Placify Dashboard…
        </div>
      </main>
    );

  const softSkills = doc?.softSkills || [];
  const techSkills = doc?.techSkills || [];
  const feedback = profile?.feedback;

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-white to-emerald-50 p-8 md:p-16 mt-10">
      <h1 className="text-4xl font-bold text-center text-sky-800 mb-4">
        Placify Skill Growth Dashboard 💼
      </h1>
      <p className="text-gray-700 text-center mb-8 max-w-2xl mx-auto">
        AI + Teacher + Tasks se banne wala aapka combined score — live progress
        dekhte rahiye 📈
      </p>

      {/* Feedback box (readonly) */}
      {feedback ? (
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-sky-50 to-white border border-sky-200 rounded-2xl shadow-md p-6 mb-10">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-sky-700">
              🧑‍🏫 Latest Feedback from Your Mentor
            </h2>
            <span className="text-xs text-gray-500">
              {new Date(feedback.date).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-800 text-base mb-2">
            <strong>Rating:</strong>{" "}
            <span className="text-sky-700 font-semibold">
              {feedback.rating}/10
            </span>
          </p>
          <p className="italic text-gray-700">“{feedback.feedback}”</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto text-center bg-sky-50 border border-sky-100 rounded-xl py-4 mb-10 text-gray-500">
          No mentor feedback yet — once your teacher reviews, it’ll appear here 📝
        </div>
      )}

      {/* Soft Skills */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-sky-700 mb-6 text-center">
          Soft Skill Development 🌤️
        </h2>
        {softSkills.length === 0 && (
          <p className="text-center text-gray-500 mb-6 italic">
            No soft skills data yet — start learning activities to build your record.
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {softSkills.map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-sky-400"
            >
              <h3 className="text-xl font-semibold text-sky-800 mb-3">{s.name}</h3>
              <p className="text-xs text-gray-600 mb-2">
                AI: <b>{s.aiScore}%</b> • Teacher: <b>{s.teacherScore}%</b> • Tasks: <b>{s.taskScore}%</b>
              </p>
              <div className="w-full bg-gray-200 h-3 rounded-full mb-1">
                <div
                  className="bg-sky-600 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${s.finalScore}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm mb-3">Final: <b>{s.finalScore}%</b></p>
              {s.feedback && (
                <div className="bg-sky-50 p-3 rounded-xl mb-3">
                  <h4 className="font-semibold text-sky-700 mb-1">Feedback 📝</h4>
                  <p className="text-gray-700 text-sm">{s.feedback}</p>
                </div>
              )}
              {s.tips?.length > 0 && (
                <div className="bg-amber-50 p-3 rounded-xl">
                  <h4 className="font-semibold text-amber-700 mb-2">Improvement Tips ✨</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {s.tips.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Technical Skills */}
      <section>
        <h2 className="text-3xl font-semibold text-emerald-700 mb-6 text-center">
          Technical Skill Progress 💻
        </h2>
        {techSkills.length === 0 && (
          <p className="text-center text-gray-500 mb-6 italic">
            No technical skills data yet — complete projects or quizzes to start tracking.
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {techSkills.map((s, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border-t-4 border-emerald-400"
            >
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">{s.name}</h3>
              <p className="text-xs text-gray-600 mb-2">
                AI: <b>{s.aiScore}%</b> • Teacher: <b>{s.teacherScore}%</b> • Tasks: <b>{s.taskScore}%</b>
              </p>
              <div className="w-full bg-gray-200 h-3 rounded-full mb-1">
                <div
                  className="bg-emerald-500 h-3 rounded-full transition-all duration-700"
                  style={{ width: `${s.finalScore}%` }}
                ></div>
              </div>
              <p className="text-gray-600 text-sm mb-3">Final: <b>{s.finalScore}%</b></p>
              {s.project && (
                <div className="bg-emerald-50 p-3 rounded-xl mb-3">
                  <h4 className="font-semibold text-emerald-700 mb-1">Project 💡</h4>
                  <p className="text-gray-700 text-sm">{s.project}</p>
                </div>
              )}
              {s.goals?.length > 0 && (
                <div className="bg-amber-50 p-3 rounded-xl">
                  <h4 className="font-semibold text-amber-700 mb-2">Next Goals 🚀</h4>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    {s.goals.map((g, idx) => (
                      <li key={idx}>{g}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div className="bg-white mt-16 p-8 rounded-2xl shadow-lg text-center max-w-3xl mx-auto">
        <h3 className="text-2xl font-semibold text-sky-700 mb-2">Overall Growth Summary 📈</h3>
        <p className="text-gray-700 mb-4 text-sm">
          AI + Teacher + Tasks = your true readiness score.
        </p>
        <button
          onClick={fetchData}
          className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-xl font-semibold transition-transform hover:scale-105"
        >
          Refresh Dashboard 🔄
        </button>
      </div>
    </main>
  );
}
