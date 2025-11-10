"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [otherUser, setOtherUser] = useState(""); // teacher or student email

  const fetchChat = async () => {
    if (!otherUser) return;
    const res = await fetch("/api/chat/fetch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otherUser }),
    });
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async () => {
    if (!text.trim()) return;
    await fetch("/api/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to: otherUser, message: text }),
    });
    setText("");
    fetchChat();
  };

  useEffect(() => {
    const interval = setInterval(fetchChat, 2000); // auto-refresh every 2s
    return () => clearInterval(interval);
  }, [otherUser]);

  if (!session) return <p className="p-8">Please login</p>;

  return (
    <main className="min-h-screen bg-sky-50 p-8 flex flex-col items-center mt-20">
      <h1 className="text-3xl font-bold text-sky-800 mb-4">Teacher–Student Chat 💬</h1>

      <input
        type="email"
        placeholder="Enter teacher/student email..."
        value={otherUser}
        onChange={(e) => setOtherUser(e.target.value)}
        className="border border-gray-300 px-4 py-2 rounded-xl mb-4 w-80"
      />

      <div className="bg-white w-full max-w-2xl h-[28rem] rounded-2xl shadow-lg p-4 overflow-y-auto">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`mb-3 ${
              m.from === session.user.email ? "text-right" : "text-left"
            }`}
          >
            <p
              className={`inline-block px-3 py-2 rounded-xl ${
                m.from === session.user.email
                  ? "bg-sky-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {m.message}
            </p>
          </div>
        ))}
      </div>

      <div className="flex w-full max-w-2xl mt-4 gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 border border-gray-300 px-4 py-2 rounded-xl"
        />
        <button
          onClick={sendMessage}
          className="bg-sky-600 text-white px-6 py-2 rounded-xl hover:bg-sky-700"
        >
          Send
        </button>
      </div>
    </main>
  );
}
