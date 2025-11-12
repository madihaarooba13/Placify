"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // 🔹 Detect click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔹 Load and sync username/email
  useEffect(() => {
    if (session?.user?.email) {
      const currentEmail = session.user.email;
      const storedUser = JSON.parse(localStorage.getItem("placify_user") || "{}");

      if (storedUser.email !== currentEmail) {
        const defaultUsername = session.user.name || currentEmail.split("@")[0];
        const newUserData = { email: currentEmail, username: defaultUsername };
        localStorage.setItem("placify_user", JSON.stringify(newUserData));
        setUsername(defaultUsername);
        setEmail(currentEmail);
      } else {
        setUsername(storedUser.username);
        setEmail(storedUser.email);
      }
    }
  }, [session]);

  // 🔹 Listen for profile updates
  useEffect(() => {
    const handleProfileUpdate = (e) => {
      if (e.detail?.username && session?.user?.email) {
        const updatedUser = {
          email: session.user.email,
          username: e.detail.username,
        };
        localStorage.setItem("placify_user", JSON.stringify(updatedUser));
        setUsername(e.detail.username);
      }
    };
    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () =>
      window.removeEventListener("profileUpdated", handleProfileUpdate);
  }, [session]);

  // ✅ Check if teacher by email (from env)
  const teacherEmails = process.env.NEXT_PUBLIC_TEACHER_EMAILS?.split(",") || [];
  const isTeacher = teacherEmails.includes(session?.user?.email);

  // Sidebar menus
  const studentMenu = [
    { href: "/", label: "🏠 Home" },
    { href: "/profile", label: "👤 Profile" },
    { href: "/dashboard", label: "📊 Dashboard" },
    { href: "/ai-chatbot", label: "🤖 AI Chatbot" },
    // { href: "/teacher-guidance", label: "🎓 Teacher Guidance" },
    { href: "/preparation", label: "🎓Preparation with Teachers" },
    { href: "/chat-with-mentor", label: "🧑‍🏫Chat with Mentor" }, 
    { href: "/support", label: "🛠️ Support" },
  ];

  const teacherPanel = [
    { href: "/teacher/dashboard", label: "👩‍🏫 Teacher Dashboard" },
    { href: "/teacher/tasks", label: "📝 Manage Tasks" },
    { href: "/teacher/feedback", label: "📈 Student Reviews" },
    { href: "/teacher/chat", label: "💬 Chat with Students" },
    { href: "/teacher/Performance-InsightPage", label: "🧠 Performance Insights" },
  ];

  return (
    <>
      {/* 🌈 Navbar */}
      <nav className="bg-gradient-to-b from-sky-400 to-sky-600 text-white fixed w-full top-0 left-0 z-50 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          
          {/* 📱 Mobile layout */}
          <div className="flex flex-col w-full sm:hidden">
            {/* Logo */}
            <div className="flex justify-center items-center">
              <Link
                href="/"
                className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
              >
                <img
                  src="/image.png"
                  alt="Placify Logo"
                  width={55}
                  height={55}
                  className="rounded-xl shadow-[0_0_15px_#9b5cff] hover:scale-105 transition-transform duration-300"
                />
                <div className="flex flex-col items-center leading-tight">
                  <div className="text-2xl font-bold">Placify</div>
                  <div className="text-sm font-normal -mt-1">
                    - path to placement
                  </div>
                </div>
              </Link>
            </div>

            {session && (
              <div className="flex justify-between items-center mt-3 px-1 sm:px-4 gap-3">
                <span className="text-base font-semibold whitespace-nowrap ml-1 text-left flex-1">
                  Welcome,&nbsp;
                  <span className="text-white/95">@{username}</span>
                  <br />
                  <span className="text-xs text-white/80">
                    {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
                  </span>
                </span>

                <div className="flex items-center gap-3 mr-2">
                  <button
                    onClick={() => signOut()}
                    className="bg-white text-black px-3 py-1.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95"
                  >
                    Logout
                  </button>

                  <button
                    onClick={() => setOpen(!open)}
                    aria-label="Toggle menu"
                    className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 ml-[-6px]"
                  >
                    <div className="relative w-6 h-5">
                      <span
                        className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
                          open ? "rotate-45 top-2.5" : "top-0"
                        }`}
                      ></span>
                      <span
                        className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ease-in-out ${
                          open ? "opacity-0" : "opacity-100"
                        }`}
                      ></span>
                      <span
                        className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
                          open ? "-rotate-45 top-2.5" : "top-5"
                        }`}
                      ></span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 💻 Desktop layout */}
          <div className="hidden sm:flex items-center justify-between w-full">
            {/* Logo left */}
            <Link
              href="/"
              className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/image.png"
                alt="Placify Logo"
                width={60}
                height={60}
                className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              />
              <div className="flex flex-col">
                <div className="text-lg sm:text-3xl font-bold whitespace-nowrap">
                  Placify
                  <div className="text-sm sm:text-xs font-normal">
                    - path to placement
                  </div>
                </div>
              </div>
            </Link>

            {/* Center Welcome text */}
            {session && (
              <div className="flex flex-col items-center justify-center text-center mx-auto">
                <span className="text-lg sm:text-2xl font-semibold tracking-wide">
                  Welcome,&nbsp;
                  <span className="text-white/95">@{username}</span>
                </span>
                <span className="text-sm mt-1">
                  {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
                </span>
              </div>
            )}

            {/* Right buttons */}
            <div className="flex items-center gap-4 ml-auto">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="bg-white text-black px-5 py-2 sm:py-2.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button className="bg-white text-black px-6 py-2 sm:py-2.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95">
                    Login
                  </button>
                </Link>
              )}

              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 mr-1"
              >
                <div className="relative w-6 h-5">
                  <span
                    className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
                      open ? "rotate-45 top-2.5" : "top-0"
                    }`}
                  ></span>
                  <span
                    className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ease-in-out ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
                      open ? "-rotate-45 top-2.5" : "top-5"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 📋 Sidebar (Scrollable + Custom Scrollbar) */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-gradient-to-b from-sky-100 to-sky-200 text-black shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } rounded-l-3xl overflow-y-auto scroll-smooth custom-scroll`}
      >
        <div className="p-6 flex justify-between items-center border-b border-black/20 sticky top-0 bg-sky-100/90 backdrop-blur-sm z-10">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="hover:text-gray-700 text-black text-xl font-bold transition-transform active:scale-90 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {session && (
          <div className="px-6 mt-4 text-sm text-gray-600 font-medium">
            Signed in as <span className="text-sky-700">{email}</span>
          </div>
        )}

        {/* 🧭 Common Menu */}
        <ul className="flex flex-col font-medium mt-6 space-y-6 px-6 text-black">
          {studentMenu.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 py-4 px-5 rounded-xl border border-black/20 hover:bg-black/10 hover:scale-105 cursor-pointer transition-all transform shadow-sm active:scale-95"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <hr className="my-4 border-t border-gray-400/40 mx-6" />

        {/* 🎓 Teacher Panel */}
        <div className="px-6 mt-3 mb-10">
          <h3 className="text-base font-semibold text-gray-700 mb-3">
            Teacher Panel 👩‍🏫
          </h3>

          <ul className="flex flex-col font-medium space-y-4">
            {teacherPanel.map((item, index) => (
              <li key={index}>
                <Link
                  href={isTeacher ? item.href : "#"}
                  onClick={() => isTeacher && setOpen(false)}
                  className={`flex items-center gap-4 py-3 px-5 rounded-xl border border-black/20 transition-all transform shadow-sm ${
                    isTeacher
                      ? "hover:bg-black/10 hover:scale-105 cursor-pointer active:scale-95"
                      : "cursor-not-allowed opacity-50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 🌈 Custom scrollbar styles */}
      <style jsx>{`
        .custom-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scroll::-webkit-scrollbar-track {
          background: #e0f2fe;
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #38bdf8, #0ea5e9);
          border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #0284c7, #0369a1);
        }
      `}</style>
    </>
  );
};

export default Navbar;
