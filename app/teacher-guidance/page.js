"use client";
import React, { useState, useEffect, useRef } from "react";

const teachers = [
  "Professor Sharma 👨‍🏫",
  "Professor Gupta 👩‍🏫",
  "Professor Verma 🧑‍🎓",
];

const TeacherChatbot = () => {
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am your guide. Ask me anything about placements! 😊" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // Scroll slightly to show the latest messages
  useEffect(() => {
    if (!chatContainerRef.current) return;

    const container = chatContainerRef.current;
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    // Scroll just a bit, max 60px, so it doesn’t jump all the way down
    container.scrollTop = Math.min(scrollHeight - clientHeight, container.scrollTop + 60);
  }, [messages, typing]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const teacherMessage = {
        sender: "bot",
        text: `${selectedTeacher} says: "${input.split("").reverse().join("")}" 😎`,
      };
      setMessages((prev) => [...prev, teacherMessage]);
      setTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="min-h-screen bg-sky-50 p-32 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-sky-800 mb-4 text-center">
        Teacher Guidance Chatbot
      </h1>
      <p className="text-gray-700 mb-6 text-center">
        Select a teacher and chat as if you're talking to them directly! 💬
      </p>

      {/* Teacher Dropdown */}
      <div className="mb-6 w-full max-w-xs relative">
        <button
          className="w-full px-4 py-3 bg-sky-600 text-white text-lg rounded-xl flex justify-between items-center cursor-pointer hover:bg-sky-700 transition-all"
          onClick={() =>
            document.getElementById("teacher-dropdown").classList.toggle("hidden")
          }
        >
          {selectedTeacher}
          <span className="ml-2">&#9662;</span>
        </button>
        <ul
          id="teacher-dropdown"
          className="absolute w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg hidden z-20 max-h-48 overflow-y-auto"
        >
          {teachers.map((teacher, idx) => (
            <li
              key={idx}
              onClick={() => {
                setSelectedTeacher(teacher);
                document.getElementById("teacher-dropdown").classList.add("hidden");
              }}
              className="px-4 py-2 hover:bg-sky-100 cursor-pointer rounded-xl"
            >
              {teacher}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Box */}
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
        <div
          ref={chatContainerRef}
          className="p-4 flex-1 overflow-y-auto h-96 space-y-4"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              } gap-2`}
            >
              {/* Avatar */}
              {msg.sender === "user" ? (
                <div className="w-10 h-10 flex items-center justify-center bg-sky-600 text-white font-bold rounded-full">
                  S
                </div>
              ) : (
                <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-bold rounded-full">
                  T
                </div>
              )}

              {/* Message Bubble */}
              <div
                className={`p-3 rounded-xl max-w-xs break-words ${
                  msg.sender === "user"
                    ? "bg-sky-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {typing && (
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-bold rounded-full">
                T
              </div>
              <div className="p-3 rounded-xl max-w-xs break-words bg-gray-200 text-gray-800 animate-pulse rounded-bl-none">
                {selectedTeacher} is typing... ⏳
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-300 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-800 text-lg"
          />
          <button
            onClick={handleSend}
            className="bg-sky-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-sky-700 transition-transform duration-300 hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>
    </main>
  );
};

export default TeacherChatbot;
