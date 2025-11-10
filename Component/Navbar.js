"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [username, setUsername] = useState("");

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔄 Sync username (from profile/localStorage/session)
  useEffect(() => {
    if (session?.user?.email) {
      const defaultUsername = session.user.email.split("@")[0];
      const savedUsername = localStorage.getItem("placify_username");
      setUsername(savedUsername || defaultUsername);
    }
  }, [session]);

  // 🧠 Listen for profile updates in real-time
  useEffect(() => {
    const handleProfileUpdate = (e) => {
      if (e.detail?.username) {
        setUsername(e.detail.username);
        localStorage.setItem("placify_username", e.detail.username);
      }
    };

    window.addEventListener("profileUpdated", handleProfileUpdate);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  return (
    <>
      <nav className="bg-gradient-to-b from-sky-400 to-sky-600 text-white fixed w-full top-0 left-0 z-50 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3 sm:py-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
          >
            <img
              src="tea.gif"
              width={40}
              height={40}
              alt="Logo"
              className="rounded-full"
            />
            <span className="text-lg sm:text-xl font-bold whitespace-nowrap">
              Get Me a Chai!
            </span>
          </Link>

          {/* Center Welcome (Responsive) */}
          {session && (
            <div className="absolute left-1/2 -translate-x-1/2 text-center flex justify-center sm:static sm:translate-x-0 sm:flex-1 sm:justify-center mt-1 sm:mt-0">
              <span className="text-sm sm:text-lg md:text-xl font-semibold tracking-wide whitespace-nowrap">
                Welcome,&nbsp;
                <span className="text-white/90">@{username}</span>
              </span>
            </div>
          )}

          {/* Right Buttons */}
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            {session ? (
              <button
                onClick={() => signOut()}
                className="bg-white text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm shadow-md transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="bg-white text-black px-4 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm shadow-md transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95">
                  Login
                </button>
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-105 active:scale-95 transition-transform duration-300"
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
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-gradient-to-b from-sky-100 to-sky-200 text-black shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } rounded-l-3xl`}
      >
        <div className="p-6 flex justify-between items-center border-b border-black/20">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="hover:text-gray-700 text-black text-xl font-bold transition-transform active:scale-90"
          >
            ✕
          </button>
        </div>

        {session && (
          <div className="px-6 mt-4 text-sm text-gray-600 font-medium">
            Signed in as <span className="text-sky-700">@{username}</span>
          </div>
        )}

        <ul className="flex flex-col font-medium mt-6 space-y-6 px-6 text-black">
          {[
            { href: "/", label: "🏠 Home" },
            { href: "/profile", label: "👱 Profile" },
            { href: "/dashboard", label: "📊 Dashboard" },
            { href: "/ai-chatbot", label: "🤖 AI Chatbot" },
            { href: "/profile", label: "👤 Profile" },
            { href: "/support", label: "🛠️ Support" },
            { href: "/teacher-guidance", label: "🎓 Teacher Guidance" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 py-4 px-5 rounded-xl border border-black/20 hover:bg-black/10 hover:scale-105 transition-all transform shadow-sm active:scale-95"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
