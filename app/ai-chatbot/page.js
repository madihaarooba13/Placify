// // "use client";

// // import React, { useState, useRef, useEffect } from "react";
// // import { useSession, signIn } from "next-auth/react";

// // export default function AIChatbot() {
// //   const { data: session } = useSession();
// //   const [messages, setMessages] = useState([
// //     { sender: "ai", text: "Hello! I’m your AI assistant 🤖. Ask me anything about placements!" },
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const chatRef = useRef(null);

// //   const handleSend = async () => {
// //     if (!input.trim() || loading) return;

// //     const userMessage = { sender: "user", text: input };
// //     setMessages((prev) => [...prev, userMessage]);
// //     setInput("");
// //     setLoading(true);

// //     try {
// //       const response = await fetch("/api/openrouter", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ prompt: input }),
// //       });

// //       const data = await response.json();
// //       let aiText = data?.text?.trim();

// //       if (!aiText || aiText.length < 5 || aiText.includes("error")) {
// //         const dummyReplies = [
// //           "Hmm 🤔 interesting question! I'd suggest researching more and staying consistent.",
// //           "That's a great question! Let's take it step by step 💭",
// //           "Good point! Preparation and confidence go hand in hand 📚",
// //           "I'm still learning that topic, but it's definitely worth exploring 🚀",
// //           "Sounds like you're curious — that's the best mindset for placements! 💪",
// //         ];

// //         if (input.toLowerCase().includes("resume")) {
// //           aiText = "Keep your resume short, highlight projects, and use strong action verbs 💼.";
// //         } else if (input.toLowerCase().includes("interview")) {
// //           aiText = "Interviews are all about clarity and confidence — revise your basics and stay calm 🧠.";
// //         } else if (input.toLowerCase().includes("dsa")) {
// //           aiText = "Start with arrays and strings in DSA, then move to trees and graphs. Practice daily 💻.";
// //         } else {
// //           aiText = dummyReplies[Math.floor(Math.random() * dummyReplies.length)];
// //         }
// //       }

// //       setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);
// //     } catch (err) {
// //       console.error("Chatbot error:", err);
// //       const offlineReplies = [
// //         "Oops 😅 looks like I lost connection — but keep pushing forward, you'll do great!",
// //         "AI seems sleepy 😴 right now, but remember: consistency is the key!",
// //         "Network glitch 🛜 — stay patient and keep practicing problems 💪",
// //       ];
// //       setMessages((prev) => [
// //         ...prev,
// //         { sender: "ai", text: offlineReplies[Math.floor(Math.random() * offlineReplies.length)] },
// //       ]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       handleSend();
// //     }
// //   };

// //   useEffect(() => {
// //     if (chatRef.current) {
// //       chatRef.current.scrollTop = chatRef.current.scrollHeight;
// //     }
// //   }, [messages, loading]);

// //   if (!session) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <button
// //           onClick={() => signIn()}
// //           className="bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition cursor-pointer"
// //         >
// //           Please login to access AI Chatbot
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-sky-50 flex flex-col items-center mt-32 sm:mt-24 md:mt-16 p-4 sm:p-6 md:p-10">
// //       <h1 className="text-3xl md:text-4xl font-bold mb-6 text-sky-800 text-center mt-2">
// //         AI Chatbot 🤖
// //       </h1>

// //       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-200 
// //                       h-[28rem] sm:h-[30rem] md:h-[32rem] lg:h-[33rem]">
        
// //         {/* Chat messages (scrollable, smooth) */}
// //         <div
// //           ref={chatRef}
// //           className="p-4 flex-1 overflow-y-auto space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-sky-100 hover:scrollbar-thumb-sky-500 transition-all duration-300 rounded-xl"
// //         >
// //           {messages.map((msg, idx) => (
// //             <div
// //               key={idx}
// //               className={`flex items-start ${
// //                 msg.sender === "user" ? "justify-end" : "justify-start"
// //               } gap-2`}
// //             >
// //               <div
// //                 className={`min-w-[40px] h-10 flex items-center justify-center font-bold rounded-full px-3 ${
// //                   msg.sender === "user"
// //                     ? "bg-sky-600 text-white"
// //                     : "bg-gray-300 text-gray-800"
// //                 }`}
// //               >
// //                 {msg.sender === "user" ? "S" : "AI"}
// //               </div>
// //               <div
// //                 className={`p-3 rounded-xl max-w-[80%] break-words ${
// //                   msg.sender === "user"
// //                     ? "bg-sky-600 text-white rounded-br-none"
// //                     : "bg-gray-200 text-gray-800 rounded-bl-none"
// //                 }`}
// //               >
// //                 {msg.text}
// //               </div>
// //             </div>
// //           ))}

// //           {loading && (
// //             <div className="flex items-start gap-2">
// //               <div className="min-w-[40px] h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-bold rounded-full px-3">
// //                 AI
// //               </div>
// //               <div className="p-3 rounded-xl max-w-xs break-words bg-gray-200 text-gray-800 rounded-bl-none animate-pulse">
// //                 AI is typing... ⏳
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Input box */}
// //         <div className="p-3 sm:p-4 border-t border-gray-300 flex gap-2">
// //           <textarea
// //             rows="1"
// //             value={input}
// //             onChange={(e) => setInput(e.target.value)}
// //             onKeyDown={handleKeyPress}
// //             placeholder="Type your question..."
// //             className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-800 text-base resize-none"
// //           />
// //           <button
// //             onClick={handleSend}
// //             disabled={loading}
// //             className={`bg-sky-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-sky-700 transition ${
// //               loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
// //             }`}
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // "use client";

// // import React, { useState, useRef, useEffect } from "react";
// // import { useSession, signIn } from "next-auth/react";

// // export default function AIChatbot() {
// //   const { data: session } = useSession();
// //   const [messages, setMessages] = useState([
// //     { sender: "ai", text: "Hello! I’m your AI assistant 🤖. Ask me anything about placements!" },
// //   ]);
// //   const [input, setInput] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const chatRef = useRef(null);
// //   const [loadingSummary, setLoadingSummary] = useState(false);

// //   const handleSend = async () => {
// //     if (!input.trim() || loading) return;

// //     const userMessage = { sender: "user", text: input };
// //     setMessages((prev) => [...prev, userMessage]);
// //     setInput("");
// //     setLoading(true);

// //     try {
// //       // 🌐 Send main chat request
// //       const response = await fetch("/api/openrouter", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ prompt: input }),
// //       });

// //       const data = await response.json();
// //       let aiText = data?.text?.trim();

// //       if (!aiText || aiText.length < 5 || aiText.includes("error")) {
// //         const dummyReplies = [
// //           "Hmm 🤔 interesting question! I'd suggest researching more and staying consistent.",
// //           "That's a great question! Let's take it step by step 💭",
// //           "Good point! Preparation and confidence go hand in hand 📚",
// //           "I'm still learning that topic, but it's definitely worth exploring 🚀",
// //           "Sounds like you're curious — that's the best mindset for placements! 💪",
// //         ];

// //         if (input.toLowerCase().includes("resume")) {
// //           aiText = "Keep your resume short, highlight projects, and use strong action verbs 💼.";
// //         } else if (input.toLowerCase().includes("interview")) {
// //           aiText = "Interviews are all about clarity and confidence — revise your basics and stay calm 🧠.";
// //         } else if (input.toLowerCase().includes("dsa")) {
// //           aiText = "Start with arrays and strings in DSA, then move to trees and graphs. Practice daily 💻.";
// //         } else {
// //           aiText = dummyReplies[Math.floor(Math.random() * dummyReplies.length)];
// //         }
// //       }

// //       setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);

// //       // 🧠 Background: send for skill analysis
// //       if (session?.user?.email) {
// //         fetch("/api/analyze", {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({
// //             userId: session.user.email,
// //             message: input,
// //           }),
// //         }).then(() => console.log("Skill analysis updated for", session.user.email));
// //       }
// //     } catch (err) {
// //       console.error("Chatbot error:", err);
// //       const offlineReplies = [
// //         "Oops 😅 looks like I lost connection — but keep pushing forward, you'll do great!",
// //         "AI seems sleepy 😴 right now, but remember: consistency is the key!",
// //         "Network glitch 🛜 — stay patient and keep practicing problems 💪",
// //       ];
// //       setMessages((prev) => [
// //         ...prev,
// //         { sender: "ai", text: offlineReplies[Math.floor(Math.random() * offlineReplies.length)] },
// //       ]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ✨ Fetch latest skill summary from backend
// //   const handleSummary = async () => {
// //     if (!session?.user?.email) return;
// //     setLoadingSummary(true);
// //     try {
// //       const res = await fetch(`/api/skills?userId=${session.user.email}`);
// //       const data = await res.json();
// //       if (data && data.softSkills?.length) {
// //         const comm = data.softSkills.find((s) => s.name.includes("Communication"))?.level || 0;
// //         const conf = data.softSkills.find((s) => s.name.includes("Confidence"))?.level || 0;

// //         const text = `📊 Weekly Skill Summary:
// // - Communication: ${comm}%
// // - Confidence: ${conf}%
// // Keep growing, you’re doing great! 🌟`;

// //         setMessages((prev) => [...prev, { sender: "ai", text }]);
// //       } else {
// //         setMessages((prev) => [
// //           ...prev,
// //           { sender: "ai", text: "No skill data found yet. Start chatting and improving! 💬" },
// //         ]);
// //       }
// //     } catch (err) {
// //       setMessages((prev) => [
// //         ...prev,
// //         { sender: "ai", text: "Couldn’t fetch your progress right now 😅. Try again later!" },
// //       ]);
// //     } finally {
// //       setLoadingSummary(false);
// //     }
// //   };

// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       handleSend();
// //     }
// //   };

// //   useEffect(() => {
// //     if (chatRef.current) {
// //       chatRef.current.scrollTop = chatRef.current.scrollHeight;
// //     }
// //   }, [messages, loading]);

// //   if (!session) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <button
// //           onClick={() => signIn()}
// //           className="bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition cursor-pointer"
// //         >
// //           Please login to access AI Chatbot
// //         </button>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-sky-50 flex flex-col items-center mt-32 sm:mt-24 md:mt-16 p-4 sm:p-6 md:p-10">
// //       <h1 className="text-3xl md:text-4xl font-bold mb-6 text-sky-800 text-center">
// //         AI Chatbot 🤖
// //       </h1>

// //       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-200 
// //                       h-[28rem] sm:h-[30rem] md:h-[32rem] lg:h-[34rem]">
        
// //         {/* Chat messages (scrollable, smooth) */}
// //         <div
// //           ref={chatRef}
// //           className="p-4 flex-1 overflow-y-auto space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-sky-100 hover:scrollbar-thumb-sky-500 transition-all duration-300 rounded-xl"
// //         >
// //           {messages.map((msg, idx) => (
// //             <div
// //               key={idx}
// //               className={`flex items-start ${
// //                 msg.sender === "user" ? "justify-end" : "justify-start"
// //               } gap-2`}
// //             >
// //               <div
// //                 className={`min-w-[40px] h-10 flex items-center justify-center font-bold rounded-full px-3 ${
// //                   msg.sender === "user"
// //                     ? "bg-sky-600 text-white"
// //                     : "bg-gray-300 text-gray-800"
// //                 }`}
// //               >
// //                 {msg.sender === "user" ? "S" : "AI"}
// //               </div>
// //               <div
// //                 className={`p-3 rounded-xl max-w-[80%] break-words ${
// //                   msg.sender === "user"
// //                     ? "bg-sky-600 text-white rounded-br-none"
// //                     : "bg-gray-200 text-gray-800 rounded-bl-none"
// //                 }`}
// //               >
// //                 {msg.text}
// //               </div>
// //             </div>
// //           ))}

// //           {loading && (
// //             <div className="flex items-start gap-2">
// //               <div className="min-w-[40px] h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-bold rounded-full px-3">
// //                 AI
// //               </div>
// //               <div className="p-3 rounded-xl max-w-xs break-words bg-gray-200 text-gray-800 rounded-bl-none animate-pulse">
// //                 AI is typing... ⏳
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Input box + Weekly Summary Button */}
// //         <div className="p-3 sm:p-4 border-t border-gray-300 flex flex-col sm:flex-row gap-2">
// //           <div className="flex w-full gap-2">
// //             <textarea
// //               rows="1"
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={handleKeyPress}
// //               placeholder="Type your question..."
// //               className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-800 text-base resize-none"
// //             />
// //             <button
// //               onClick={handleSend}
// //               disabled={loading}
// //               className={`bg-sky-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-sky-700 transition ${
// //                 loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
// //               }`}
// //             >
// //               Send
// //             </button>
// //           </div>

// //           <button
// //             onClick={handleSummary}
// //             disabled={loadingSummary}
// //             className={`bg-emerald-500 text-white mt-2 sm:mt-0 sm:ml-2 px-6 py-2.5 rounded-xl font-semibold hover:bg-emerald-600 transition ${
// //               loadingSummary ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
// //             }`}
// //           >
// //             {loadingSummary ? "Loading..." : "Weekly Summary 📊"}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { useSession, signIn } from "next-auth/react";

// export default function AIChatbot() {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([
//     { sender: "ai", text: "Hello! I’m your AI assistant 🤖. Ask me anything about placements!" },
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const chatRef = useRef(null);

//   const handleSend = async () => {
//     if (!input.trim() || loading) return;

//     const userMessage = { sender: "user", text: input };
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       const response = await fetch("/api/openrouter", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt: input }),
//       });

//       const data = await response.json();
//       let aiText = data?.text?.trim();

//       if (!aiText || aiText.length < 5 || aiText.includes("error")) {
//         const dummyReplies = [
//           "Hmm 🤔 interesting question! I'd suggest researching more and staying consistent.",
//           "That's a great question! Let's take it step by step 💭",
//           "Good point! Preparation and confidence go hand in hand 📚",
//           "I'm still learning that topic, but it's definitely worth exploring 🚀",
//           "Sounds like you're curious — that's the best mindset for placements! 💪",
//         ];

//         if (input.toLowerCase().includes("resume")) {
//           aiText = "Keep your resume short, highlight projects, and use strong action verbs 💼.";
//         } else if (input.toLowerCase().includes("interview")) {
//           aiText = "Interviews are all about clarity and confidence — revise your basics and stay calm 🧠.";
//         } else if (input.toLowerCase().includes("dsa")) {
//           aiText = "Start with arrays and strings in DSA, then move to trees and graphs. Practice daily 💻.";
//         } else {
//           aiText = dummyReplies[Math.floor(Math.random() * dummyReplies.length)];
//         }
//       }

//       // update chat UI
//       setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);

//       // 🧠 Step 8 integration: background AI skill analysis
//       if (session?.user?.email) {
//         fetch("/api/analyze", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             userId: session.user.email,
//             message: input,
//           }),
//         })
//           .then((res) => res.json())
//           .then(() => console.log("Skill analysis updated for", session.user.email))
//           .catch((err) => console.error("Analyzer failed:", err));
//       }
//     } catch (err) {
//       console.error("Chatbot error:", err);
//       const offlineReplies = [
//         "Oops 😅 looks like I lost connection — but keep pushing forward, you'll do great!",
//         "AI seems sleepy 😴 right now, but remember: consistency is the key!",
//         "Network glitch 🛜 — stay patient and keep practicing problems 💪",
//       ];
//       setMessages((prev) => [
//         ...prev,
//         { sender: "ai", text: offlineReplies[Math.floor(Math.random() * offlineReplies.length)] },
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [messages, loading]);

//   if (!session) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <button
//           onClick={() => signIn()}
//           className="bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition cursor-pointer"
//         >
//           Please login to access AI Chatbot
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-sky-50 flex flex-col items-center mt-34 sm:mt-24 md:mt-16 p-4 sm:p-6 md:p-10">
//       <h1 className="text-3xl md:text-4xl font-bold mb-6 text-sky-800 text-center">
//         AI Chatbot 🤖
//       </h1>

//       <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-200 h-[28rem] sm:h-[30rem] md:h-[32rem] lg:h-[34rem]">
//         {/* Messages */}
//         <div
//           ref={chatRef}
//           className="p-4 flex-1 overflow-y-auto space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-sky-100 hover:scrollbar-thumb-sky-500 transition-all duration-300 rounded-xl"
//         >
//           {messages.map((msg, idx) => (
//             <div
//               key={idx}
//               className={`flex items-start ${
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               } gap-2`}
//             >
//               <div
//                 className={`min-w-[40px] h-10 flex items-center justify-center font-bold rounded-full px-3 ${
//                   msg.sender === "user"
//                     ? "bg-sky-600 text-white"
//                     : "bg-gray-300 text-gray-800"
//                 }`}
//               >
//                 {msg.sender === "user" ? "S" : "AI"}
//               </div>
//               <div
//                 className={`p-3 rounded-xl max-w-[80%] break-words ${
//                   msg.sender === "user"
//                     ? "bg-sky-600 text-white rounded-br-none"
//                     : "bg-gray-200 text-gray-800 rounded-bl-none"
//                 }`}
//               >
//                 {msg.text}
//               </div>
//             </div>
//           ))}

//           {loading && (
//             <div className="flex items-start gap-2">
//               <div className="min-w-[40px] h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-bold rounded-full px-3">
//                 AI
//               </div>
//               <div className="p-3 rounded-xl max-w-xs break-words bg-gray-200 text-gray-800 rounded-bl-none animate-pulse">
//                 AI is typing... ⏳
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Input box */}
//         <div className="p-3 sm:p-4 border-t border-gray-300 flex gap-2">
//           <textarea
//             rows="1"
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             placeholder="Type your question..."
//             className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-800 text-base resize-none"
//           />
//           <button
//             onClick={handleSend}
//             disabled={loading}
//             className={`bg-sky-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-sky-700 transition ${
//               loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
//             }`}
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AIChatbot() {
  const { data: session } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState([
    {
      sender: "ai",
      text: "Hello! I’m your AI assistant 🤖. Ask me anything about placements!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/openrouter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await response.json();
      let aiText = data?.text?.trim();

      if (!aiText || aiText.length < 5 || aiText.includes("error")) {
        const dummyReplies = [
          "Hmm 🤔 interesting question! I'd suggest researching more and staying consistent.",
          "That's a great question! Let's take it step by step 💭",
          "Good point! Preparation and confidence go hand in hand 📚",
          "I'm still learning that topic, but it's definitely worth exploring 🚀",
          "Sounds like you're curious — that's the best mindset for placements! 💪",
        ];

        if (input.toLowerCase().includes("resume")) {
          aiText =
            "Keep your resume short, highlight projects, and use strong action verbs 💼.";
        } else if (input.toLowerCase().includes("interview")) {
          aiText =
            "Interviews are all about clarity and confidence — revise your basics and stay calm 🧠.";
        } else if (input.toLowerCase().includes("dsa")) {
          aiText =
            "Start with arrays and strings in DSA, then move to trees and graphs. Practice daily 💻.";
        } else {
          aiText =
            dummyReplies[Math.floor(Math.random() * dummyReplies.length)];
        }
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiText }]);

      if (session?.user?.email) {
        fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: session.user.email,
            message: input,
          }),
        })
          .then((res) => res.json())
          .then(() =>
            console.log("Skill analysis updated for", session.user.email)
          )
          .catch((err) => console.error("Analyzer failed:", err));
      }
    } catch (err) {
      console.error("Chatbot error:", err);
      const offlineReplies = [
        "Oops 😅 looks like I lost connection — but keep pushing forward, you'll do great!",
        "AI seems sleepy 😴 right now, but remember: consistency is the key!",
        "Network glitch 🛜 — stay patient and keep practicing problems 💪",
      ];
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: offlineReplies[
            Math.floor(Math.random() * offlineReplies.length)
          ],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // 🩵 If not logged in → show beautiful login card
  if (!session) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-sky-100 via-white to-sky-50 ">
        <div className="bg-white shadow-2xl border border-gray-200 rounded-3xl p-10 max-w-md text-center flex flex-col items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            alt="Chatbot sticker"
            className="w-28 h-28 mb-5 drop-shadow-md"
          />
          <h2 className="text-2xl font-bold text-sky-700 mb-3">
            Please log in to chat with your AI assistant 🤖
          </h2>
          <p className="text-gray-600 mb-6 text-sm max-w-xs">
            Sign in to start conversations, get interview help, and receive
            placement guidance instantly.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="bg-gradient-to-r from-sky-600 to-emerald-500 text-white px-8 py-3 rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-transform duration-300 hover:cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  // 🧠 If logged in → show main chatbot interface
  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center mt-38 sm:mt-24 md:mt-16 p-4 sm:p-6 md:p-10 ">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-sky-800 text-center">
        AI Chatbot 🤖
      </h1>

      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-gray-200 h-[31rem] sm:h-[30rem] md:h-[32rem] lg:h-[34rem]">
        {/* Chat messages */}
        <div
          ref={chatRef}
          className="p-4 flex-1 overflow-y-auto space-y-4 scroll-smooth scrollbar-thin scrollbar-thumb-sky-400 scrollbar-track-sky-100 hover:scrollbar-thumb-sky-500 transition-all duration-300 rounded-xl"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } gap-2`}
            >
              <div
                className={`min-w-[40px] h-10 flex items-center justify-center font-bold rounded-full px-3 ${
                  msg.sender === "user"
                    ? "bg-sky-600 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
              >
                {msg.sender === "user" ? "S" : "AI"}
              </div>
              <div
                className={`p-3 rounded-xl max-w-[80%] break-words ${
                  msg.sender === "user"
                    ? "bg-sky-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-start gap-2">
              <div className="min-w-[40px] h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-bold rounded-full px-3">
                AI
              </div>
              <div className="p-3 rounded-xl max-w-xs break-words bg-gray-200 text-gray-800 rounded-bl-none animate-pulse">
                AI is typing... ⏳
              </div>
            </div>
          )}
        </div>

        {/* Input box */}
        <div className="p-3 sm:p-4 border-t border-gray-300 flex gap-2">
          <textarea
            rows="1"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-800 text-base resize-none"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`bg-sky-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-sky-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
