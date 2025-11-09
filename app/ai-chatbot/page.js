"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";

export default function AIChatbot() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Hello! I’m your AI assistant 🤖. Ask me anything about placements!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/byteplus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { sender: "ai", text: data.text }]);

    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { sender: "ai", text: "Something went wrong 😅" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, loading]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => signIn()}
          className="bg-sky-600 text-white px-6 py-3 rounded-xl hover:bg-sky-700 transition"
        >
          Please login to access AI Chatbot
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sky-50 flex flex-col items-center p-40">
      <h1 className="text-4xl font-bold mb-6 text-sky-800">AI Chatbot 🤖</h1>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
        <div ref={chatRef} className="p-4 flex-1 overflow-y-auto h-96 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex items-start ${msg.sender === "user" ? "justify-end" : "justify-start"} gap-2`}>
              <div className={`w-10 h-10 flex items-center justify-center font-bold rounded-full ${msg.sender === "user" ? "bg-sky-600 text-white" : "bg-gray-300 text-gray-800"}`}>
                {msg.sender === "user" ? "S" : "T"}
              </div>
              <div className={`p-3 rounded-xl max-w-xs break-words ${msg.sender === "user" ? "bg-sky-600 text-white rounded-br-none" : "bg-gray-200 text-gray-800 rounded-bl-none"}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 text-gray-800 font-bold rounded-full">T</div>
              <div className="p-3 rounded-xl max-w-xs break-words bg-gray-200 text-gray-800 animate-pulse rounded-bl-none">
                AI is typing... ⏳
              </div>
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-300 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-800 text-lg"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className={`bg-sky-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-sky-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
