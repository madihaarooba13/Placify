
// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { useSession } from "next-auth/react";
// import { pusherClient } from "@/lib/pusher";

// export default function ChatWithMentor() {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");
//   const [isMounted, setIsMounted] = useState(false);
//   const messagesEndRef = useRef(null);

//   // 🟩 Prevent hydration mismatch
//   useEffect(() => setIsMounted(true), []);

//   // 🧠 Fetch messages
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
//     if (isMounted) fetchMessages();
//   }, [session, isMounted]);

//   // 🔔 Real-time updates via Pusher
//   useEffect(() => {
//     if (!session?.user?.email) return;

//     console.log("🔌 Attempting to connect to Pusher as:", session.user.email);

//     pusherClient.connection.bind("connected", () => {
//       console.log("✅ Connected to Pusher:", session.user.email);
//     });

//     pusherClient.connection.bind("error", (err) => {
//       console.error("❌ Pusher connection error:", err);
//     });

//     const channel = pusherClient.subscribe("placify-chat");
// // placify-chat
//     channel.bind("new-message", (data) => {
//       console.log("📩 Incoming message:", data);
//       if (
//         data.sender === session.user.email ||
//         data.receiver === session.user.email
//       ) {
//         setMessages((prev) => [...prev, data]);
//       }
//     });

//     return () => {
//       channel.unbind_all();
//       channel.unsubscribe();
//     };
//   }, [session]);

//   // 🧾 Auto-scroll
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
//   }, [messages]);

//   // 📨 Send message
//   const sendMessage = async () => {
//     if (!input.trim()) return;
//     const newMsg = {
//       sender: session.user.email,
//       receiver: "nematfatma2004@gmail.com",
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

//   // 🧾 Handle Enter
//   const handleKeyPress = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       sendMessage();
//     }
//   };

//   return (
//     <main className="mt-30 flex justify-center items-center min-h-[80vh] px-4">
//       {!isMounted ? (
//         <div className="text-center mt-32 text-gray-500">Loading chat...</div>
//       ) : (
//         <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col border border-gray-200 overflow-hidden">
//           {/* 🟩 Header */}
//           <div className="bg-gradient-to-r from-sky-600 to-emerald-500 p-4 flex justify-between items-center text-white">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-sky-700 font-bold">
//                 T
//               </div>
//               <div>
//                 <h2 className="text-lg font-semibold">Mentor</h2>
//                 <p className="text-sm text-green-200">🟢 Online</p>
//               </div>
//             </div>
//             <h2 className="text-xl font-bold flex items-center space-x-2">
//               💬 <span>Chat With Mentor</span>
//             </h2>
//           </div>

//           {/* 💬 Chat Box */}
//           <div
//             className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-sky-50 to-emerald-50 custom-scroll"
//             style={{ scrollbarColor: "#34d399 #e0f2fe", scrollbarWidth: "thin" }}
//           >
//             {messages.length === 0 ? (
//               <p className="text-gray-500 text-center mt-10">No messages yet 👋</p>
//             ) : (
//               messages.map((msg, i) => {
//                 const isStudent = msg.sender === session?.user?.email;
//                 return (
//                   <div
//                     key={msg._id || i}
//                     className={`flex ${isStudent ? "justify-end" : "justify-start"} mb-3`}
//                   >
//                     {!isStudent && (
//                       <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-600 text-white font-semibold mr-2">
//                         T
//                       </div>
//                     )}
//                     <div
//                       className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-md ${
//                         isStudent
//                           ? "bg-sky-500 text-white rounded-br-none"
//                           : "bg-white text-gray-800 border rounded-bl-none"
//                       }`}
//                     >
//                       <p className="whitespace-pre-line">{msg.message}</p>
//                       <span className="text-[11px] block text-right mt-1 opacity-80">
//                         {new Date(msg.sentAt || Date.now()).toLocaleTimeString([], {
//                           hour: "2-digit",
//                           minute: "2-digit",
//                         })}
//                       </span>
//                     </div>
//                     {isStudent && (
//                       <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white font-semibold ml-2">
//                         S
//                       </div>
//                     )}
//                   </div>
//                 );
//               })
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* ✍️ Input */}
//           <div className="p-4 flex items-center bg-white border-t border-gray-200">
//             <input
//               type="text"
//               placeholder="Type your message..."
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={handleKeyPress}
//               className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
//             />
//             <button
//               onClick={sendMessage}
//               className="ml-3 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-200"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </main>
//   );
// }
"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher";

export default function ChatWithMentor() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const messagesEndRef = useRef(null);
  const mentorEmail = process.env.NEXT_PUBLIC_MENTOR_EMAIL;

  // 🧩 Prevent hydration mismatch
  useEffect(() => setIsMounted(true), []);

  // 🧠 Fetch chat history
  const fetchMessages = async () => {
    if (!session?.user?.email) return;
    try {
      const res = await fetch(`/api/chat?user=${session.user.email}`);
      const data = await res.json();
      setMessages(Array.isArray(data?.messages) ? data.messages : []);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    if (isMounted) fetchMessages();
  }, [session, isMounted]);

  // 📡 Pusher real-time updates
  useEffect(() => {
    if (!session?.user?.email) return;

    const channel = pusherClient.subscribe("placify-chat");

    channel.bind("new-message", (data) => {
      if (
        data.sender === session.user.email ||
        data.receiver === session.user.email
      ) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [session]);

  // 🔽 Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  // ✉️ Send Message
  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = {
      sender: session.user.email,
      receiver: mentorEmail,
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

  // ⌨️ Handle Enter Key
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="mt-30 flex justify-center items-center min-h-[80vh] px-4">
      {!isMounted ? (
        <div className="text-center mt-32 text-gray-500">Loading chat...</div>
      ) : (
        <div className="bg-white shadow-2xl rounded-2xl w-full max-w-4xl h-[80vh] flex flex-col border border-gray-200 overflow-hidden">
          {/* 🧠 Header */}
          <div className="bg-gradient-to-r from-sky-600 to-emerald-500 p-4 flex justify-between items-center text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-sky-700 font-bold">
                T
              </div>
              <div>
                <h2 className="text-lg font-semibold">Mentor</h2>
                <p className="text-sm text-green-200">🟢 Online</p>
              </div>
            </div>
            <h2 className="text-xl font-bold flex items-center space-x-2">
              💬 <span>Chat With Mentor</span>
            </h2>
          </div>

          {/* 💬 Messages */}
          <div
            className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-sky-50 to-emerald-50 custom-scroll"
            style={{ scrollbarColor: "#34d399 #e0f2fe", scrollbarWidth: "thin" }}
          >
            {messages.length === 0 ? (
              <p className="text-gray-500 text-center mt-10">
                No messages yet 👋
              </p>
            ) : (
              messages.map((msg, i) => {
                const isStudent = msg.sender === session?.user?.email;
                return (
                  <div
                    key={i}
                    className={`flex ${isStudent ? "justify-end" : "justify-start"} mb-3`}
                  >
                    {/* Mentor Avatar */}
                    {!isStudent && (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-600 text-white font-semibold mr-2">
                        T
                      </div>
                    )}
                    {/* Message Bubble */}
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-md transition-all duration-200 ${
                        isStudent
                          ? "bg-sky-500 text-white rounded-br-none shadow-lg shadow-sky-200"
                          : "bg-gradient-to-r from-white to-gray-100 text-gray-800 border border-gray-200 rounded-bl-none shadow-md"
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
                    {/* Student Avatar */}
                    {isStudent && (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white font-semibold ml-2">
                        S
                      </div>
                    )}
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* 🧾 Input */}
          <div className="p-4 flex items-center bg-white border-t border-gray-200">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <button
              onClick={sendMessage}
              className="ml-3 bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all duration-200"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
