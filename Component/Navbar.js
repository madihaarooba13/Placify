"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const sidebarRef = useRef(null);

  // 🔹 Fetch updated username from profile (MongoDB)
  useEffect(() => {
    const fetchUsername = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await fetch("/api/profile");
        if (res.ok) {
          const data = await res.json();
          if (data && data.email === session.user.email && data.username) {
            setUsername(data.username); // ✅ Use saved username
          } else {
            // fallback to email prefix
            setUsername(session.user.email.split("@")[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching username:", err);
        setUsername(session.user.email.split("@")[0]);
      }
    };
    fetchUsername();
  }, [session]);

  // 🔹 Handle sidebar close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-gradient-to-b from-sky-400 to-sky-600 text-white fixed w-full top-0 left-0 z-50 shadow-md h-24 sm:h-20 flex flex-col justify-center">
        <div className="max-w-screen-xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-2 sm:py-3 gap-1 sm:gap-0">
          
          {/* ===== MOBILE LAYOUT ===== */}
          <div className="flex w-full items-center justify-between sm:hidden">
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
              <span className="text-base font-bold whitespace-nowrap">
                Get Me a Chai!
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="bg-white text-black px-3 py-1.5 rounded-lg text-xs shadow-md hover:bg-gray-100 hover:scale-105 active:scale-95"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button className="bg-white text-black px-3 py-1.5 rounded-lg text-xs shadow-md hover:bg-gray-100 hover:scale-105 active:scale-95">
                    Login
                  </button>
                </Link>
              )}

              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-105 active:scale-95 transition-transform duration-300"
              >
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`h-0.5 w-full bg-black rounded transition-all duration-300 ${
                      open ? "rotate-45 translate-y-2" : ""
                    }`}
                  ></span>
                  <span
                    className={`h-0.5 w-full bg-black rounded transition-all duration-300 ${
                      open ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`h-0.5 w-full bg-black rounded transition-all duration-300 ${
                      open ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile welcome below */}
          {session && (
            <div className="block sm:hidden w-full text-center mt-1">
              <span className="text-sm font-semibold tracking-wide whitespace-nowrap">
                Welcome,&nbsp;<span className="text-white/90">@{username}</span>
              </span>
            </div>
          )}

          {/* ===== DESKTOP LAYOUT ===== */}
          <div className="hidden sm:flex items-center justify-between w-full">
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
              <span className="text-lg font-bold whitespace-nowrap">
                Get Me a Chai!
              </span>
            </Link>

            {session && (
              <div className="flex-1 text-center">
                <span className="text-lg md:text-xl font-semibold whitespace-nowrap">
                  Welcome,&nbsp;<span className="text-white/90">@{username}</span>
                </span>
              </div>
            )}

            <div className="flex items-center gap-4">
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="bg-white text-black px-6 py-2 rounded-lg text-sm shadow-md hover:bg-gray-100 hover:scale-105 active:scale-95"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button className="bg-white text-black px-6 py-2 rounded-lg text-sm shadow-md hover:bg-gray-100 hover:scale-105 active:scale-95">
                    Login
                  </button>
                </Link>
              )}

              <button
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md hover:scale-105 active:scale-95 transition-transform duration-300"
              >
                <div className="relative w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`h-0.5 w-full bg-black rounded transition-all duration-300 ${
                      open ? "rotate-45 translate-y-2" : ""
                    }`}
                  ></span>
                  <span
                    className={`h-0.5 w-full bg-black rounded transition-all duration-300 ${
                      open ? "opacity-0" : ""
                    }`}
                  ></span>
                  <span
                    className={`h-0.5 w-full bg-black rounded transition-all duration-300 ${
                      open ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  ></span>
                </div>
              </button>
            </div>
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
