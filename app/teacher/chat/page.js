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

  // ✅ Allow normal body scroll (fix footer not visible issue)
  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  // 🧠 Fetch students
  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      const data = await res.json();
      if (Array.isArray(data?.students)) setStudents(data.students);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  // 🧠 Fetch messages for selected student
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

  useEffect(() => {
    if (session?.user?.email) fetchStudents();
  }, [session]);

  useEffect(() => {
    if (selectedStudent) fetchMessages(selectedStudent.email);
  }, [selectedStudent]);

  // 🔔 Real-time updates (ignore self messages)
  useEffect(() => {
    if (!session?.user?.email) return;
    const channel = pusherClient.subscribe("placify-chat");

    channel.bind("new-message", (data) => {
      if (data.sender === session.user.email) return; // ignore self-sent duplicates
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

    channel.bind("pusher:member_added", () => setIsOnline(true));
    channel.bind("pusher:member_removed", () => setIsOnline(false));

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [session, selectedStudent]);

  // ✅ Scroll only inside chat box
  useEffect(() => {
    if (messagesEndRef.current) {
      const parent = messagesEndRef.current.parentElement;
      const y = messagesEndRef.current.offsetTop - parent.offsetTop;
      parent.scrollTo({ top: y, behavior: "auto" });
    }
  }, [messages]);

  // ✅ Send message (instant + save)
  const sendMessage = async () => {
    if (!input.trim() || !selectedStudent)
      return alert("Select a student first!");

    const newMsg = {
      sender: session.user.email,
      receiver: selectedStudent.email,
      message: input.trim(),
      sentAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMsg),
      });

      if (!res.ok) {
        console.error("Failed to send message");
        setMessages((prev) => prev.filter((m) => m !== newMsg));
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => prev.filter((m) => m !== newMsg));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <main className="mt-36 lg:mt-32 flex justify-center items-center min-h-[80vh] px-4 bg-sky-50">
      {/* 📱 Responsive Fix */}
      <style jsx>{`
        @media (max-width: 640px) {
          .chat-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
          }
          .header-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            gap: 0.4rem;
          }
          .chat-dropdown {
            width: 100%;
            margin-top: 0.5rem;
          }
          .chat-container {
            height: 75vh !important;
          }
        }
      `}</style>

      <div className="chat-container bg-white shadow-2xl rounded-2xl w-full max-w-5xl h-[80vh] flex flex-col border border-gray-200 overflow-hidden">
        {/* 🟩 Header */}
        <div className="chat-header bg-gradient-to-r from-sky-500 via-emerald-500 to-teal-500 p-4 text-white shadow-sm">
          <div className="w-full">
            {/* Student Info + Title */}
            <div className="header-top flex justify-between items-center flex-wrap">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-sky-700 font-bold">
                  S
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold">
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
              <h2 className="text-base sm:text-xl font-bold flex items-center space-x-2">
                💬 <span>Chat With Student</span>
              </h2>
            </div>

            {/* Dropdown */}
            <select
              className="chat-dropdown mt-3 text-black px-3 py-1 rounded-lg focus:outline-none cursor-pointer"
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

        {/* 💬 Messages */}
        <div
          className="flex-1 p-6 overflow-y-auto bg-gradient-to-b from-sky-50 to-emerald-50"
          style={{ scrollbarColor: "#34d399 #e0f2fe", scrollbarWidth: "thin" }}
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
                    className={`flex ${
                      isTeacher ? "justify-end" : "justify-start"
                    } mb-3`}
                  >
                    {!isTeacher && (
                      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500 text-white font-semibold mr-2">
                        S
                      </div>
                    )}
                    <div
                      className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-md ${
                        isTeacher
                          ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-br-none shadow-lg"
                          : "bg-gradient-to-r from-white via-gray-100 to-sky-50 text-gray-800 border border-gray-200 rounded-bl-none shadow-md"
                      }`}
                    >
                      <p className="whitespace-pre-line break-words">
                        {msg.message}
                      </p>
                      <span className="text-[11px] block text-right mt-1 opacity-70">
                        {new Date(msg.sentAt || Date.now()).toLocaleTimeString(
                          [],
                          { hour: "2-digit", minute: "2-digit" }
                        )}
                      </span>
                    </div>
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
            className="ml-3 bg-gradient-to-r from-emerald-500 to-sky-500 hover:opacity-90 text-white px-6 py-2 rounded-xl shadow-md cursor-pointer"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
}
