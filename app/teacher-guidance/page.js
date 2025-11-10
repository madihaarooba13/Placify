// "use client";
// import React, { useState, useEffect, useRef } from "react";

// const teachers = [
//   "Professor Sharma 👨‍🏫",
//   "Professor Gupta 👩‍🏫",
//   "Professor Verma 🧑‍🎓",
// ];

// const TeacherChatbot = () => {
//   const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);
//   const [messages, setMessages] = useState([
//     { sender: "bot", text: "Hello! I am your guide. Ask me anything about placements! 😊" },
//   ]);
//   const [input, setInput] = useState("");
//   const [typing, setTyping] = useState(false);
//   const chatContainerRef = useRef(null);

//   // Scroll slightly to show the latest messages
//   useEffect(() => {
//     if (!chatContainerRef.current) return;

//     const container = chatContainerRef.current;
//     const scrollHeight = container.scrollHeight;
//     const clientHeight = container.clientHeight;

//     // Scroll just a bit, max 60px, so it doesn’t jump all the way down
//     container.scrollTop = Math.min(scrollHeight - clientHeight, container.scrollTop + 60);
//   }, [messages, typing]);

//   const handleSend = () => {
//     if (!input.trim()) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setTyping(true);

//     setTimeout(() => {
//       const teacherMessage = {
//         sender: "bot",
//         text: `${selectedTeacher} says: "${input.split("").reverse().join("")}" 😎`,
//       };
//       setMessages((prev) => [...prev, teacherMessage]);
//       setTyping(false);
//     }, 1200);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <main className="min-h-screen bg-sky-50 p-32 flex flex-col items-center">
//       <h1 className="text-4xl font-bold text-sky-800 mb-4 text-center">
//         Teacher Guidance Chatbot
//       </h1>
//       <p className="text-gray-700 mb-6 text-center">
//         Select a teacher and chat as if you're talking to them directly! 💬
//       </p>

//       {/* Teacher Dropdown */}
//       <div className="mb-6 w-full max-w-xs relative">
//         <button
//           className="w-full px-4 py-3 bg-sky-600 text-white text-lg rounded-xl flex justify-between items-center cursor-pointer hover:bg-sky-700 transition-all"
//           onClick={() =>
//             document.getElementById("teacher-dropdown").classList.toggle("hidden")
//           }
//         >
//           {selectedTeacher}
//           <span className="ml-2">&#9662;</span>
//         </button>
//         <ul
//           id="teacher-dropdown"
//           className="absolute w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg hidden z-20 max-h-48 overflow-y-auto"
//         >
//           {teachers.map((teacher, idx) => (
//             <li
//               key={idx}
//               onClick={() => {
//                 setSelectedTeacher(teacher);
//                 document.getElementById("teacher-dropdown").classList.add("hidden");
//               }}
//               className="px-4 py-2 hover:bg-sky-100 cursor-pointer rounded-xl"
//             >
//               {teacher}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Box */}
//       <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
//         <div
//           ref={chatContainerRef}
//           className="p-4 flex-1 overflow-y-auto h-96 space-y-4"
//         >
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex items-start ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               } gap-2`}
//             >
//               {/* Avatar */}
//               {msg.sender === "user" ? (
//                 <div className="w-10 h-10 flex items-center justify-center bg-sky-600 text-white font-bold rounded-full">
//                   S
//                 </div>
//               ) : (
//                 <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-bold rounded-full">
//                   T
//                 </div>
//               )}

//               {/* Message Bubble */}
//               <div
//                 className={`p-3 rounded-xl max-w-xs break-words ${
//                   msg.sender === "user"
//                     ? "bg-sky-600 text-white rounded-br-none"
//                     : "bg-gray-200 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}

//           {typing && (
//             <div className="flex items-start gap-2">
//               <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-bold rounded-full">
//                 T
//               </div>
//               <div className="p-3 rounded-xl max-w-xs break-words bg-gray-200 text-gray-800 animate-pulse rounded-bl-none">
//                 {selectedTeacher} is typing... ⏳
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input */}
//         <div className="p-4 border-t border-gray-300 flex gap-2">
//           <input
//             type="text"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyPress={handleKeyPress}
//             placeholder="Type your question..."
//             className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-800 text-lg"
//           />
//           <button
//             onClick={handleSend}
//             className="bg-sky-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-sky-700 transition-transform duration-300 hover:scale-105"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default TeacherChatbot;

"use client";

import React, { useEffect, useState } from "react";

export default function TeacherPanel() {
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    if (!email.trim()) return alert("Enter student email");
    setLoading(true);
    const res = await fetch(`/api/skills?userId=${email}`);
    const data = await res.json();
    setProfile(data);
    setLoading(false);
  };

  const handleRating = async (skillName, category, value) => {
    if (!email) return;
    await fetch("/api/teacher/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: email,
        skillName,
        category,
        teacherScore: value,
      }),
    });
    fetchProfile();
  };

  const handleFeedback = async (skillName, category, feedback) => {
    await fetch("/api/teacher/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: email,
        skillName,
        category,
        feedback,
      }),
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-emerald-50 p-10">
      <h1 className="text-4xl font-bold text-center text-sky-700 mb-8">
        Teacher Guidance Panel 🎓
      </h1>

      <div className="max-w-2xl mx-auto mb-8 flex gap-3">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter student email"
          className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-400 outline-none"
        />
        <button
          onClick={fetchProfile}
          className="bg-sky-600 text-white px-6 py-2 rounded-xl hover:bg-sky-700 transition"
        >
          Load
        </button>
      </div>

      {loading && <p className="text-center text-gray-600">Loading student data...</p>}

      {profile && (
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Soft Skills */}
          <div>
            <h2 className="text-2xl font-semibold text-sky-700 mb-3">Soft Skills 🌤️</h2>
            {profile.softSkills?.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-4 mb-4 border-t-4 border-sky-300">
                <h3 className="font-semibold text-sky-800">{s.name}</h3>
                <p className="text-sm text-gray-500 mb-2">AI: {s.aiScore}% | Teacher: {s.teacherScore}% | Tasks: {s.taskScore}%</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={s.teacherScore}
                  onChange={(e) => handleRating(s.name, "soft", e.target.value)}
                  className="w-full accent-sky-600"
                />
                <textarea
                  placeholder="Feedback..."
                  defaultValue={s.feedback}
                  onBlur={(e) => handleFeedback(s.name, "soft", e.target.value)}
                  className="w-full mt-2 border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>

          {/* Tech Skills */}
          <div>
            <h2 className="text-2xl font-semibold text-emerald-700 mb-3">Technical Skills 💻</h2>
            {profile.techSkills?.map((s, i) => (
              <div key={i} className="bg-white rounded-2xl shadow p-4 mb-4 border-t-4 border-emerald-300">
                <h3 className="font-semibold text-emerald-800">{s.name}</h3>
                <p className="text-sm text-gray-500 mb-2">AI: {s.aiScore}% | Teacher: {s.teacherScore}% | Tasks: {s.taskScore}%</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={s.teacherScore}
                  onChange={(e) => handleRating(s.name, "tech", e.target.value)}
                  className="w-full accent-emerald-600"
                />
                <textarea
                  placeholder="Feedback..."
                  defaultValue={s.feedback}
                  onBlur={(e) => handleFeedback(s.name, "tech", e.target.value)}
                  className="w-full mt-2 border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

