"use client";
import React, { useState, useRef, useEffect } from "react";

export default function StudentChatPage() {
  const [messages, setMessages] = useState([
    {
      sender: "teacher",
      text: "Hi there 👋, I’m your mentor! How’s your placement prep going?",
    },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Scroll to bottom automatically
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "student", text: input.trim() };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Dummy teacher reply after 1.2s (we’ll replace with backend later)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "teacher",
          text:
            "Thanks for sharing! I’ll review your progress soon. Keep learning 📚",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-sky-200 flex flex-col items-center pt-28 pb-12 px-4">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-lg overflow-hidden border border-sky-100">
        {/* Header */}
        <div className="bg-sky-600 text-white text-center py-4 text-lg font-semibold">
          💬 Chat with Your Mentor
        </div>

        {/* Chat Window */}
        <div className="h-[450px] overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${
                msg.sender === "student" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                  msg.sender === "student"
                    ? "bg-sky-600 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 flex items-center gap-3 p-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            type="text"
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400"
          />
          <button
            onClick={handleSend}
            className="bg-sky-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-sky-700 transition"
          >
            Send
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <p className="text-sm text-gray-500 mt-4">
        Your messages are visible only to your assigned teacher 👩‍🏫
      </p>
    </div>
  );
}
