

// // "use client";
// // import React, { useEffect, useRef, useState } from "react";
// // import { useSession } from "next-auth/react";
// // import { pusherClient } from "@/lib/pusher";

// // export default function TeacherChatPage() {
// //   const { data: session } = useSession();
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState("");
// //   const [isMounted, setIsMounted] = useState(false);
// //   const messagesEndRef = useRef(null);

// //   useEffect(() => setIsMounted(true), []);

// //   // 🧠 Fetch messages
// //   const fetchMessages = async () => {
// //     if (!session?.user?.email) return;
// //     try {
// //       const res = await fetch(`/api/chat?user=${session.user.email}`);
// //       const data = await res.json();
// //       setMessages(Array.isArray(data?.messages) ? data.messages : []);
// //     } catch (err) {
// //       console.error("Error fetching messages:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     if (isMounted) fetchMessages();
// //   }, [session, isMounted]);

// //   // 🔔 Pusher listener
// //   useEffect(() => {
// //     if (!session?.user?.email) return;

// //     console.log("🔌 Attempting to connect to Pusher as:", session.user.email);

// //     pusherClient.connection.bind("connected", () => {
// //       console.log("✅ Connected to Pusher:", session.user.email);
// //     });

// //     pusherClient.connection.bind("error", (err) => {
// //       console.error("❌ Pusher connection error:", err);
// //     });

// //     const channel = pusherClient.subscribe("placify-chat");

// //     channel.bind("new-message", (data) => {
// //       console.log("📩 Incoming message:", data);
// //       if (
// //         data.sender === session.user.email ||
// //         data.receiver === session.user.email
// //       ) {
// //         setMessages((prev) => [...prev, data]);
// //       }
// //     });

// //     return () => {
// //       channel.unbind_all();
// //       channel.unsubscribe();
// //     };
// //   }, [session]);

// //   // 🧾 Auto scroll
// //   useEffect(() => {
// //     messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
// //   }, [messages]);

// //   // 📨 Send message
// //   const sendMessage = async () => {
// //     if (!input.trim()) return;
// //     const newMsg = {
// //       sender: session.user.email,
// //       receiver: "madihaarooba13@gmail.com",
// //       message: input.trim(),
// //     };

// //     try {
// //       const res = await fetch("/api/chat", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(newMsg),
// //       });

// //       if (res.ok) setInput("");
// //     } catch (err) {
// //       console.error("Error sending message:", err);
// //     }
// //   };

// //   // 🧾 Handle Enter key
// //   const handleKeyPress = (e) => {
// //     if (e.key === "Enter" && !e.shiftKey) {
// //       e.preventDefault();
// //       sendMessage();
// //     }
// //   };

// //   return (
// //     <main className="mt-30 flex justify-center items-center min-h-[80vh] px-4">
// //       {!isMounted ? (
// //         <div className="text-center mt-32 text-gray-500">Loading chat...</div>
// //       ) : (
// //         <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col border border-gray-200 overflow-hidden">
// //           {/* 🟩 Header */}
// //           <div className="bg-gradient-to-r from-sky-500 via-emerald-500 to-teal-500 p-4 flex justify-between items-center text-white shadow-sm">
// //             <div className="flex items-center space-x-3">
// //               <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-sky-700 font-bold">
// //                 S
// //               </div>
// //               <div>
// //                 <h2 className="text-lg font-semibold">Student</h2>
// //                 <p className="text-sm text-green-200">🟢 Online</p>
// //               </div>
// //             </div>
// //             <h2 className="text-xl font-bold flex items-center space-x-2">
// //               💬 <span>Chat With Student</span>
// //             </h2>
// //           </div>

// //           {/* 💬 Chat Messages */}
// //           <div
// //             className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-sky-50 to-emerald-50 custom-scroll"
// //             style={{ scrollbarColor: "#34d399 #e0f2fe", scrollbarWidth: "thin" }}
// //           >
// //             {messages.length === 0 ? (
// //               <p className="text-gray-500 text-center mt-10">
// //                 No messages yet. Start chatting 💬
// //               </p>
// //             ) : (
// //               messages.map((msg, i) => {
// //                 const isTeacher = msg.sender === session?.user?.email;
// //                 return (
// //                   <div
// //                     key={msg._id || i}
// //                     className={`flex ${isTeacher ? "justify-end" : "justify-start"} mb-3`}
// //                   >
// //                     {!isTeacher && (
// //                       <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white font-semibold mr-2">
// //                         S
// //                       </div>
// //                     )}
// //                     <div
// //                       className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-md ${
// //                         isTeacher
// //                           ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-none"
// //                           : "bg-white text-gray-800 border rounded-bl-none"
// //                       }`}
// //                     >
// //                       <p className="whitespace-pre-line">{msg.message}</p>
// //                       <span className="text-[11px] block text-right mt-1 opacity-80">
// //                         {new Date(msg.sentAt || Date.now()).toLocaleTimeString([], {
// //                           hour: "2-digit",
// //                           minute: "2-digit",
// //                         })}
// //                       </span>
// //                     </div>
// //                     {isTeacher && (
// //                       <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-600 text-white font-semibold ml-2">
// //                         T
// //                       </div>
// //                     )}
// //                   </div>
// //                 );
// //               })
// //             )}
// //             <div ref={messagesEndRef} />
// //           </div>

// //           {/* ✍️ Input */}
// //           <div className="p-4 flex items-center bg-white border-t border-gray-100">
// //             <input
// //               type="text"
// //               placeholder="Type your message..."
// //               value={input}
// //               onChange={(e) => setInput(e.target.value)}
// //               onKeyDown={handleKeyPress}
// //               className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
// //             />
// //             <button
// //               onClick={sendMessage}
// //               className="ml-3 bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-200"
// //             >
// //               Send
// //             </button>
// //           </div>
// //         </div>
// //       )}
// //     </main>
// //   );
// // }
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useSession } from "next-auth/react";
// import { pusherClient } from "@/lib/pusher";

// export default function TeacherChatPage() {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [students, setStudents] = useState([]);
//   const [isOnline, setIsOnline] = useState(false);
//   const messagesEndRef = useRef(null);

//   // 🧠 Fetch all real students from DB
//   const fetchStudents = async () => {
//     try {
//       const res = await fetch("/api/students");
//       const data = await res.json();
//       if (Array.isArray(data?.students)) {
//         setStudents(data.students);
//       }
//     } catch (err) {
//       console.error("Error fetching students:", err);
//     }
//   };

//   // 🧠 Fetch messages for the teacher
//   const fetchMessages = async () => {
//     if (!session?.user?.email) return;
//     try {
//       const res = await fetch(`/api/chat?user=${session.user.email}`);
//       const data = await res.json();
//       setMessages(Array.isArray(data?.messages) ? data.messages : []);
//     } catch (err) {
//       console.error("Error fetching messages:", err);
//     }
//   };

//   useEffect(() => {
//     if (session?.user?.email) {
//       fetchStudents(); // ✅ load real students
//       fetchMessages();
//     }
//   }, [session, selectedStudent]);

//   // 🔔 Real-time messages listener
//   useEffect(() => {
//     if (!session?.user?.email) return;

//     const channel = pusherClient.subscribe("placify-chat");

//     channel.bind("new-message", (data) => {
//       if (
//         data.sender === session.user.email ||
//         data.receiver === session.user.email
//       ) {
//         setMessages((prev) => [...prev, data]);
//       }
//     });

//     // Optional: handle online/offline events
//     channel.bind("pusher:member_added", () => setIsOnline(true));
//     channel.bind("pusher:member_removed", () => setIsOnline(false));

//     return () => {
//       channel.unbind_all();
//       channel.unsubscribe();
//     };
//   }, [session]);

//   // Auto scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
//   }, [messages]);

//   // Send message
//   const sendMessage = async () => {
//     if (!input.trim() || !selectedStudent)
//       return alert("Select a student first!");

//     const newMsg = {
//       sender: session.user.email,
//       receiver: selectedStudent.email,
//       message: input.trim(),
//     };

//     try {
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newMsg),
//       });
//       if (res.ok) setInput("");
//     } catch (err) {
//       console.error("Error sending message:", err);
//     }
//   };

//   // Handle Enter key
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <main className="mt-30 flex justify-center items-center min-h-[80vh] px-4">
//       <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl h-[80vh] flex flex-col border border-gray-200 overflow-hidden">
//         {/* 🟩 Header */}
//         <div className="bg-gradient-to-r from-sky-500 via-emerald-500 to-teal-500 p-4 flex justify-between items-center text-white shadow-sm">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-sky-700 font-bold">
//               S
//             </div>
//             <div>
//               <h2 className="text-lg font-semibold">
//                 {selectedStudent ? selectedStudent.name : "Student"}
//               </h2>
//               <p
//                 className={`text-sm ${
//                   isOnline ? "text-green-200" : "text-gray-200"
//                 }`}
//               >
//                 {isOnline ? "🟢 Online" : "⚪ Offline"}
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-col items-end">
//             <h2 className="text-xl font-bold flex items-center space-x-2">
//               💬 <span>Chat With Student</span>
//             </h2>

//             {/* ✅ Real student dropdown */}
//             <select
//               className="mt-2 text-black px-3 py-1 rounded-lg focus:outline-none"
//               onChange={(e) => {
//                 const student = students.find(
//                   (s) => s.email === e.target.value
//                 );
//                 setSelectedStudent(student);
//                 setMessages([]);
//               }}
//             >
//               <option value="">-- Choose Student --</option>
//               {students.map((s) => (
//                 <option key={s.email} value={s.email}>
//                   {s.name || s.email}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>

//         {/* 💬 Chat Messages */}
//         <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-sky-50 to-emerald-50 custom-scroll">
//           {selectedStudent ? (
//             messages.length === 0 ? (
//               <p className="text-gray-500 text-center mt-10">
//                 No messages yet. Start chatting 💬
//               </p>
//             ) : (
//               messages.map((msg, i) => {
//                 const isTeacher = msg.sender === session?.user?.email;
//                 return (
//                   <div
//                     key={i}
//                     className={`flex ${isTeacher ? "justify-end" : "justify-start"} mb-3`}
//                   >
//                     {/* Student Avatar */}
//                     {!isTeacher && (
//                       <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white font-semibold mr-2">
//                         S
//                       </div>
//                     )}
//                     {/* Chat Bubble */}
//                     <div
//                       className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-md ${
//                         isTeacher
//                           ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-none shadow-lg shadow-emerald-200"
//                           : "bg-gradient-to-r from-white to-gray-100 text-gray-800 border border-gray-200 rounded-bl-none shadow-md"
//                       }`}
//                     >
//                       <p className="whitespace-pre-line break-words">{msg.message}</p>
//                       <span className="text-[11px] block text-right mt-1 opacity-70">
//                         {new Date(msg.sentAt || Date.now()).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                     {/* Teacher Avatar */}
//                     {isTeacher && (
//                       <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-600 text-white font-semibold ml-2">
//                         T
//                       </div>
//                     )}
//                   </div>
//                 );
//               })
//             )
//           ) : (
//             <p className="text-gray-500 text-center mt-10">
//               Select a student to start chatting 💬
//             </p>
//           )}
//           <div ref={messagesEndRef} />
//         </div>

//         {/* ✍️ Input */}
//         <div className="p-4 flex items-center bg-white border-t border-gray-200">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             onKeyDown={handleKeyPress}
//             className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
//           />
//           <button
//             onClick={sendMessage}
//             className="ml-3 bg-gradient-to-r from-emerald-500 to-sky-500 hover:opacity-90 text-white px-6 py-2 rounded-xl shadow-md"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </main>
//   );
// }
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";

export default function TeacherChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [isOnline, setIsOnline] = useState(false);
  const messagesEndRef = useRef(null);

  // 🧠 Fetch students (role: student)
  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      if (Array.isArray(data?.students)) setStudents(data.students);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // 🧠 Fetch messages for selected student only
  const fetchMessages = async (studentEmail) => {
    if (!session?.user?.email || !studentEmail) return;

    try {
      const res = await fetch(`/api/chat?user=${session.user.email}`);
      const data = await res.json();

      if (Array.isArray(data?.messages)) {
        const filtered = data.messages.filter(
          (msg) =>
            (msg.sender === session.user.email &&
              msg.receiver === studentEmail) ||
            (msg.sender === studentEmail &&
              msg.receiver === session.user.email)
        );
        setMessages(filtered);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Initial fetch
  useEffect(() => {
    if (session?.user?.email) fetchStudents();
  }, [session]);

  // When student changes → load that student's chat history
  useEffect(() => {
    if (selectedStudent) fetchMessages(selectedStudent.email);
  }, [selectedStudent]);

  // 🔔 Real-time updates only for current selected student
  useEffect(() => {
    if (!session?.user?.email) return;
    const channel = pusherClient.subscribe("placify-chat");

    channel.bind("new-message", (data) => {
      if (
        selectedStudent &&
        ((data.sender === session.user.email &&
          data.receiver === selectedStudent.email) ||
          (data.sender === selectedStudent.email &&
            data.receiver === session.user.email))
      ) {
        setMessages((prev) => [...prev, data]);
      }
    });

    // Optional: Online/offline events
    channel.bind("pusher:member_added", () => setIsOnline(true));
    channel.bind("pusher:member_removed", () => setIsOnline(false));

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [session, selectedStudent]);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  // Send message
  const sendMessage = async () => {
    if (!input.trim() || !selectedStudent)
      return alert("Select a student first!");

    const newMsg = {
      sender: session.user.email,
      receiver: selectedStudent.email,
      message: input.trim(),
    };

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });
      if (res.ok) setInput("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // Handle Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="mt-30 flex justify-center items-center min-h-[80vh] px-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-5xl h-[80vh] flex flex-col border border-gray-200 overflow-hidden">
        {/* 🟩 Header */}
        <div className="bg-gradient-to-r from-sky-500 via-emerald-500 to-teal-500 p-4 flex justify-between items-center text-white shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-sky-700 font-bold">
              S
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {selectedStudent ? selectedStudent.name : "Student"}
              </h2>
              <p
                className={`text-sm ${
                  isOnline ? "text-green-200" : "text-gray-200"
                }`}
              >
                {isOnline ? "🟢 Online" : "⚪ Offline"}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              💬 <span>Chat With Student</span>
            </h2>

            {/* ✅ Dropdown */}
            <select
              className="mt-2 text-black px-3 py-1 rounded-lg focus:outline-none"
              onChange={(e) => {
                const student = students.find(
                  (s) => s.email === e.target.value
                );
                setSelectedStudent(student);
                setMessages([]);
              }}
            >
              <option value="">-- Choose Student --</option>
              {students.map((s) => (
                <option key={s.email} value={s.email}>
                  {s.name || s.email}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 💬 Chat Messages */}
        <div
          className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-sky-50 to-emerald-50 custom-scroll"
          style={{
            scrollbarColor: "#34d399 #e0f2fe",
            scrollbarWidth: "thin",
          }}
        >
          {selectedStudent ? (
            messages.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                No messages yet. Start chatting 💬
              </p>
            ) : (
              messages.map((msg, i) => {
                const isTeacher = msg.sender === session?.user?.email;
                return (
                  <div
                    key={i}
                    className={`flex ${isTeacher ? "justify-end" : "justify-start"} mb-3`}
                  >
                    {/* Student Avatar */}
                    {!isTeacher && (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white font-semibold mr-2">
                        S
                      </div>
                    )}

                    {/* Chat Bubble */}
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-md ${
                        isTeacher
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-none shadow-lg shadow-emerald-200"
                          : "bg-gradient-to-r from-white via-gray-100 to-sky-50 text-gray-800 border border-gray-200 rounded-bl-none shadow-md"
                      }`}
                    >
                      <p className="whitespace-pre-line break-words">{msg.message}</p>
                      <span className="text-[11px] block text-right mt-1 opacity-70">
                        {new Date(msg.sentAt || Date.now()).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    {/* Teacher Avatar */}
                    {isTeacher && (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-600 text-white font-semibold ml-2">
                        T
                      </div>
                    )}
                  </div>
                );
              })
            )
          ) : (
            <p className="text-gray-500 text-center mt-10">
              Select a student to start chatting 💬
            </p>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* ✍️ Input */}
        <div className="p-4 flex items-center bg-white border-t border-gray-200">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <button
            onClick={sendMessage}
            className="ml-3 bg-gradient-to-r from-emerald-500 to-sky-500 hover:opacity-90 text-white px-6 py-2 rounded-xl shadow-md"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
