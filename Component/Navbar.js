"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarRef]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-b from-sky-400 to-sky-600 text-white fixed w-full top-0 left-0 z-50 shadow-md">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img src="tea.gif" width={44} alt="Logo" />
            <span className="text-xl md:text-base font-bold">Get Me a Chai!</span>
          </Link>

          {/* Center email */}
          {session && (
            <div className="hidden md:flex flex-1 justify-center font-bold text-2xl md:text-base">
         <span className="text-2xl"> Welcome, {session.user.email}</span>    
            </div>
          )}

          {/* Right Buttons */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* Login/Logout Button */}
            {session ? (
              <button
                onClick={() => signOut()}
                className="bg-white text-black hover:bg-gray-100 px-6 py-2.5 rounded-lg text-sm shadow-md transition-transform hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <Link href="/login">
                <button className="bg-white text-black hover:bg-gray-100 px-6 py-2.5 rounded-lg text-sm shadow-md transition-transform hover:scale-105">
                  Login
                </button>
              </Link>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className={`p-3 w-14 h-14 flex items-center justify-center rounded-full shadow-md focus:outline-none transition-all duration-300 ${
                open ? "bg-white/40" : "bg-white"
              }`}
            >
              <svg
                className="w-7 h-7 text-black"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-80 bg-sky-200 text-black shadow-xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        } rounded-l-3xl`}
      >
        <div className="p-6 flex justify-between items-center border-b border-black/20">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setOpen(false)}
            className="hover:text-gray-700 text-black text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <ul className="flex flex-col font-medium mt-6 space-y-8 px-6 text-black">
          {[
            { href: "/", label: "🏠 Home" },
            { href: "/dashboard", label: "📊 Dashboard" },
            { href: "/ai-chatbot", label: "🤖 AI Chatbot" },
            { href: "/support", label: "🛠️ Support" },
            { href: "/teacher-guidance", label: "🎓 Teacher Guidance" },
          ].map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className="flex items-center gap-4 py-5 px-5 rounded-xl border border-black/20 hover:bg-black/10 hover:scale-105 transition transform shadow-sm"
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




