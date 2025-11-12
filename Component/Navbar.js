// // // // "use client";
// // // // import React, { useState, useRef, useEffect } from "react";
// // // // import Link from "next/link";
// // // // import { useSession, signOut } from "next-auth/react";

// // // // const Navbar = () => {
// // // //   const { data: session } = useSession();
// // // //   const [open, setOpen] = useState(false);
// // // //   const sidebarRef = useRef(null);
// // // //   const [username, setUsername] = useState("");
// // // //   const [email, setEmail] = useState("");

// // // //   // 🔹 Detect click outside to close sidebar
// // // //   useEffect(() => {
// // // //     const handleClickOutside = (event) => {
// // // //       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
// // // //         setOpen(false);
// // // //       }
// // // //     };
// // // //     document.addEventListener("mousedown", handleClickOutside);
// // // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // // //   }, []);

// // // //   // 🔹 Load and sync username/email
// // // //   useEffect(() => {
// // // //     if (session?.user?.email) {
// // // //       const currentEmail = session.user.email;
// // // //       const storedUser = JSON.parse(localStorage.getItem("placify_user") || "{}");

// // // //       if (storedUser.email !== currentEmail) {
// // // //         const defaultUsername = session.user.name || currentEmail.split("@")[0];
// // // //         const newUserData = { email: currentEmail, username: defaultUsername };
// // // //         localStorage.setItem("placify_user", JSON.stringify(newUserData));
// // // //         setUsername(defaultUsername);
// // // //         setEmail(currentEmail);
// // // //       } else {
// // // //         setUsername(storedUser.username);
// // // //         setEmail(storedUser.email);
// // // //       }
// // // //     }
// // // //   }, [session]);

// // // //   // 🔹 Listen for profile updates
// // // //   useEffect(() => {
// // // //     const handleProfileUpdate = (e) => {
// // // //       if (e.detail?.username && session?.user?.email) {
// // // //         const updatedUser = {
// // // //           email: session.user.email,
// // // //           username: e.detail.username,
// // // //         };
// // // //         localStorage.setItem("placify_user", JSON.stringify(updatedUser));
// // // //         setUsername(e.detail.username);
// // // //       }
// // // //     };
// // // //     window.addEventListener("profileUpdated", handleProfileUpdate);
// // // //     return () =>
// // // //       window.removeEventListener("profileUpdated", handleProfileUpdate);
// // // //   }, [session]);

// // // //   // ✅ Check if teacher by email (from env)
// // // //   const teacherEmails = process.env.NEXT_PUBLIC_TEACHER_EMAILS?.split(",") || [];
// // // //   const isTeacher = teacherEmails.includes(session?.user?.email);

// // // //   // Sidebar menus
// // // //   const studentMenu = [
// // // //     { href: "/", label: "🏠 Home" },
// // // //     { href: "/profile", label: "👤 Profile" },
// // // //     { href: "/dashboard", label: "📊 Dashboard" },
// // // //     { href: "/ai-chatbot", label: "🤖 AI Chatbot" },
// // // //     // { href: "/teacher-guidance", label: "🎓 Teacher Guidance" },
// // // //     { href: "/preparation", label: "🎓Preparation with Teachers" },
// // // //     { href: "/chat-with-mentor", label: "🧑‍🏫Chat with Mentor" }, 
// // // //     { href: "/support", label: "🛠️ Support" },
// // // //   ];

// // // //   const teacherPanel = [
// // // //     { href: "/teacher/dashboard", label: "👩‍🏫 Teacher Dashboard" },
// // // //     { href: "/teacher/tasks", label: "📝 Manage Tasks" },
// // // //     { href: "/teacher/feedback", label: "📈 Student Reviews" },
// // // //     { href: "/teacher/chat", label: "💬 Chat with Students" },
// // // //     { href: "/teacher/Performance-InsightPage", label: "🧠 Performance Insights" },
// // // //   ];

// // // //   return (
// // // //     <>
// // // //       {/* 🌈 Navbar */}
// // // //       <nav className="bg-gradient-to-b from-sky-400 to-sky-600 text-white fixed w-full top-0 left-0 z-50 shadow-md">
// // // //         <div className="max-w-screen-xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          
// // // //           {/* 📱 Mobile layout */}
// // // //           <div className="flex flex-col w-full sm:hidden">
// // // //             {/* Logo */}
// // // //             <div className="flex justify-center items-center">
// // // //               <Link
// // // //                 href="/"
// // // //                 className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
// // // //               >
// // // //                 <img
// // // //                   src="/image.png"
// // // //                   alt="Placify Logo"
// // // //                   width={55}
// // // //                   height={55}
// // // //                   className="rounded-xl shadow-[0_0_15px_#9b5cff] hover:scale-105 transition-transform duration-300"
// // // //                 />
// // // //                 <div className="flex flex-col items-center leading-tight">
// // // //                   <div className="text-2xl font-bold">Placify</div>
// // // //                   <div className="text-sm font-normal -mt-1">
// // // //                     - path to placement
// // // //                   </div>
// // // //                 </div>
// // // //               </Link>
// // // //             </div>

// // // //             {session && (
// // // //               <div className="flex justify-between items-center mt-3 px-1 sm:px-4 gap-3">
// // // //                 <span className="text-base font-semibold whitespace-nowrap ml-1 text-left flex-1">
// // // //                   Welcome,&nbsp;
// // // //                   <span className="text-white/95">@{username}</span>
// // // //                   <br />
// // // //                   <span className="text-xs text-white/80">
// // // //                     {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
// // // //                   </span>
// // // //                 </span>

// // // //                 <div className="flex items-center gap-3 mr-2">
// // // //                   <button
// // // //                     onClick={() => signOut()}
// // // //                     className="bg-white text-black px-3 py-1.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95"
// // // //                   >
// // // //                     Logout
// // // //                   </button>

// // // //                   <button
// // // //                     onClick={() => setOpen(!open)}
// // // //                     aria-label="Toggle menu"
// // // //                     className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 ml-[-6px]"
// // // //                   >
// // // //                     <div className="relative w-6 h-5">
// // // //                       <span
// // // //                         className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // // //                           open ? "rotate-45 top-2.5" : "top-0"
// // // //                         }`}
// // // //                       ></span>
// // // //                       <span
// // // //                         className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ease-in-out ${
// // // //                           open ? "opacity-0" : "opacity-100"
// // // //                         }`}
// // // //                       ></span>
// // // //                       <span
// // // //                         className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // // //                           open ? "-rotate-45 top-2.5" : "top-5"
// // // //                         }`}
// // // //                       ></span>
// // // //                     </div>
// // // //                   </button>
// // // //                 </div>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* 💻 Desktop layout */}
// // // //           <div className="hidden sm:flex items-center justify-between w-full">
// // // //             {/* Logo left */}
// // // //             <Link
// // // //               href="/"
// // // //               className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
// // // //             >
// // // //               <img
// // // //                 src="/image.png"
// // // //                 alt="Placify Logo"
// // // //                 width={60}
// // // //                 height={60}
// // // //                 className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
// // // //               />
// // // //               <div className="flex flex-col">
// // // //                 <div className="text-lg sm:text-3xl font-bold whitespace-nowrap">
// // // //                   Placify
// // // //                   <div className="text-sm sm:text-xs font-normal">
// // // //                     - path to placement
// // // //                   </div>
// // // //                 </div>
// // // //               </div>
// // // //             </Link>

// // // //             {/* Center Welcome text */}
// // // //             {session && (
// // // //               <div className="flex flex-col items-center justify-center text-center mx-auto">
// // // //                 <span className="text-lg sm:text-2xl font-semibold tracking-wide">
// // // //                   Welcome,&nbsp;
// // // //                   <span className="text-white/95">@{username}</span>
// // // //                 </span>
// // // //                 <span className="text-sm mt-1">
// // // //                   {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
// // // //                 </span>
// // // //               </div>
// // // //             )}

// // // //             {/* Right buttons */}
// // // //             <div className="flex items-center gap-4 ml-auto">
// // // //               {session ? (
// // // //                 <button
// // // //                   onClick={() => signOut()}
// // // //                   className="bg-white text-black px-5 py-2 sm:py-2.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95"
// // // //                 >
// // // //                   Logout
// // // //                 </button>
// // // //               ) : (
// // // //                 <Link href="/login">
// // // //                   <button className="bg-white text-black px-6 py-2 sm:py-2.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95">
// // // //                     Login
// // // //                   </button>
// // // //                 </Link>
// // // //               )}

// // // //               <button
// // // //                 onClick={() => setOpen(!open)}
// // // //                 aria-label="Toggle menu"
// // // //                 className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 mr-1"
// // // //               >
// // // //                 <div className="relative w-6 h-5">
// // // //                   <span
// // // //                     className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // // //                       open ? "rotate-45 top-2.5" : "top-0"
// // // //                     }`}
// // // //                   ></span>
// // // //                   <span
// // // //                     className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ease-in-out ${
// // // //                       open ? "opacity-0" : "opacity-100"
// // // //                     }`}
// // // //                   ></span>
// // // //                   <span
// // // //                     className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // // //                       open ? "-rotate-45 top-2.5" : "top-5"
// // // //                     }`}
// // // //                   ></span>
// // // //                 </div>
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </nav>

// // // //       {/* 📋 Sidebar (Scrollable + Custom Scrollbar) */}
// // // //       <div
// // // //         ref={sidebarRef}
// // // //         className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-gradient-to-b from-sky-100 to-sky-200 text-black shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
// // // //           open ? "translate-x-0" : "translate-x-full"
// // // //         } rounded-l-3xl overflow-y-auto scroll-smooth custom-scroll`}
// // // //       >
// // // //         <div className="p-6 flex justify-between items-center border-b border-black/20 sticky top-0 bg-sky-100/90 backdrop-blur-sm z-10">
// // // //           <h2 className="text-lg font-semibold">Menu</h2>
// // // //           <button
// // // //             onClick={() => setOpen(false)}
// // // //             className="hover:text-gray-700 text-black text-xl font-bold transition-transform active:scale-90 cursor-pointer"
// // // //           >
// // // //             ✕
// // // //           </button>
// // // //         </div>

// // // //         {session && (
// // // //           <div className="px-6 mt-4 text-sm text-gray-600 font-medium">
// // // //             Signed in as <span className="text-sky-700">{email}</span>
// // // //           </div>
// // // //         )}

// // // //         {/* 🧭 Common Menu */}
// // // //         <ul className="flex flex-col font-medium mt-6 space-y-6 px-6 text-black">
// // // //           {studentMenu.map((item, index) => (
// // // //             <li key={index}>
// // // //               <Link
// // // //                 href={item.href}
// // // //                 onClick={() => setOpen(false)}
// // // //                 className="flex items-center gap-4 py-4 px-5 rounded-xl border border-black/20 hover:bg-black/10 hover:scale-105 cursor-pointer transition-all transform shadow-sm active:scale-95"
// // // //               >
// // // //                 {item.label}
// // // //               </Link>
// // // //             </li>
// // // //           ))}
// // // //         </ul>

// // // //         {/* Divider */}
// // // //         <hr className="my-4 border-t border-gray-400/40 mx-6" />

// // // //         {/* 🎓 Teacher Panel */}
// // // //         <div className="px-6 mt-3 mb-10">
// // // //           <h3 className="text-base font-semibold text-gray-700 mb-3">
// // // //             Teacher Panel 👩‍🏫
// // // //           </h3>

// // // //           <ul className="flex flex-col font-medium space-y-4">
// // // //             {teacherPanel.map((item, index) => (
// // // //               <li key={index}>
// // // //                 <Link
// // // //                   href={isTeacher ? item.href : "#"}
// // // //                   onClick={() => isTeacher && setOpen(false)}
// // // //                   className={`flex items-center gap-4 py-3 px-5 rounded-xl border border-black/20 transition-all transform shadow-sm ${
// // // //                     isTeacher
// // // //                       ? "hover:bg-black/10 hover:scale-105 cursor-pointer active:scale-95"
// // // //                       : "cursor-not-allowed opacity-50"
// // // //                   }`}
// // // //                 >
// // // //                   {item.label}
// // // //                 </Link>
// // // //               </li>
// // // //             ))}
// // // //           </ul>
// // // //         </div>
// // // //       </div>

// // // //       {/* 🌈 Custom scrollbar styles */}
// // // //       <style jsx>{`
// // // //         .custom-scroll::-webkit-scrollbar {
// // // //           width: 8px;
// // // //         }
// // // //         .custom-scroll::-webkit-scrollbar-track {
// // // //           background: #e0f2fe;
// // // //           border-radius: 10px;
// // // //         }
// // // //         .custom-scroll::-webkit-scrollbar-thumb {
// // // //           background: linear-gradient(to bottom, #38bdf8, #0ea5e9);
// // // //           border-radius: 10px;
// // // //         }
// // // //         .custom-scroll::-webkit-scrollbar-thumb:hover {
// // // //           background: linear-gradient(to bottom, #0284c7, #0369a1);
// // // //         }
// // // //       `}</style>
// // // //     </>
// // // //   );
// // // // };

// // // // export default Navbar;
// // // "use client";
// // // import React, { useState, useRef, useEffect } from "react";
// // // import Link from "next/link";
// // // import { useSession, signOut } from "next-auth/react";

// // // const Navbar = () => {
// // //   const { data: session } = useSession();
// // //   const [open, setOpen] = useState(false);
// // //   const sidebarRef = useRef(null);
// // //   const [username, setUsername] = useState("");
// // //   const [email, setEmail] = useState("");

// // //   // 🔹 Detect click outside to close sidebar
// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
// // //         setOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // 🔹 Load and sync username/email
// // //   useEffect(() => {
// // //     if (session?.user?.email) {
// // //       const currentEmail = session.user.email;
// // //       const storedUser = JSON.parse(localStorage.getItem("placify_user") || "{}");

// // //       if (storedUser.email !== currentEmail) {
// // //         const defaultUsername = session.user.name || currentEmail.split("@")[0];
// // //         const newUserData = { email: currentEmail, username: defaultUsername };
// // //         localStorage.setItem("placify_user", JSON.stringify(newUserData));
// // //         setUsername(defaultUsername);
// // //         setEmail(currentEmail);
// // //       } else {
// // //         setUsername(storedUser.username);
// // //         setEmail(storedUser.email);
// // //       }
// // //     }
// // //   }, [session]);

// // //   // 🔹 Listen for profile updates
// // //   useEffect(() => {
// // //     const handleProfileUpdate = (e) => {
// // //       if (e.detail?.username && session?.user?.email) {
// // //         const updatedUser = {
// // //           email: session.user.email,
// // //           username: e.detail.username,
// // //         };
// // //         localStorage.setItem("placify_user", JSON.stringify(updatedUser));
// // //         setUsername(e.detail.username);
// // //       }
// // //     };
// // //     window.addEventListener("profileUpdated", handleProfileUpdate);
// // //     return () =>
// // //       window.removeEventListener("profileUpdated", handleProfileUpdate);
// // //   }, [session]);

// // //   // ✅ Check if teacher by email (from env)
// // //   const teacherEmails = process.env.NEXT_PUBLIC_TEACHER_EMAILS?.split(",") || [];
// // //   const isTeacher = teacherEmails.includes(session?.user?.email);

// // //   // Sidebar menus
// // //   const studentMenu = [
// // //     { href: "/", label: "🏠 Home" },
// // //     { href: "/profile", label: "👤 Profile" },
// // //     { href: "/dashboard", label: "📊 Dashboard" },
// // //     { href: "/ai-chatbot", label: "🤖 AI Chatbot" },
// // //     { href: "/preparation", label: "🎓 Preparation with Teachers" },
// // //     { href: "/chat-with-mentor", label: "🧑‍🏫 Chat with Mentor" },
// // //     { href: "/support", label: "🛠️ Support" },
// // //   ];

// // //   const teacherPanel = [
// // //     { href: "/teacher/dashboard", label: "👩‍🏫 Teacher Dashboard" },
// // //     { href: "/teacher/tasks", label: "📝 Manage Tasks" },
// // //     { href: "/teacher/feedback", label: "📈 Student Reviews" },
// // //     { href: "/teacher/chat", label: "💬 Chat with Students" },
// // //     { href: "/teacher/Performance-InsightPage", label: "🧠 Performance Insights" },
// // //   ];

// // //   return (
// // //     <>
// // //       {/* 🌈 Navbar */}
// // //       <nav className="bg-gradient-to-b from-sky-400 to-sky-600 text-white fixed w-full top-0 left-0 z-50 shadow-md">
// // //         <div className="max-w-screen-xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          
// // //           {/* 📱 Mobile layout */}
// // //           <div className="flex flex-col w-full sm:hidden">
// // //             {/* Logo */}
// // //             <div className="flex justify-center items-center">
// // //               <Link
// // //                 href="/"
// // //                 className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
// // //               >
// // //                 <img
// // //                   src="/image.png"
// // //                   alt="Placify Logo"
// // //                   width={55}
// // //                   height={55}
// // //                   className="rounded-xl shadow-[0_0_15px_#9b5cff] hover:scale-105 transition-transform duration-300"
// // //                 />
// // //                 <div className="flex flex-col items-center leading-tight">
// // //                   <div className="text-2xl font-bold">Placify</div>
// // //                   <div className="text-sm font-normal -mt-1">
// // //                     - path to placement
// // //                   </div>
// // //                 </div>
// // //               </Link>
// // //             </div>

// // //             {session && (
// // //               <div className="flex justify-between items-center mt-3 px-1 sm:px-4 gap-3">
// // //                 <span className="text-base font-semibold whitespace-nowrap ml-1 text-left flex-1">
// // //                   Welcome,&nbsp;
// // //                   <span className="text-white/95">@{username}</span>
// // //                   <br />
// // //                   <span className="text-xs text-white/80">
// // //                     {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
// // //                   </span>
// // //                 </span>

// // //                 <div className="flex items-center gap-3 mr-2">
// // //                   <button
// // //                     onClick={() => signOut()}
// // //                     className="bg-white text-black px-3 py-1.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95"
// // //                   >
// // //                     Logout
// // //                   </button>

// // //                   <button
// // //                     onClick={() => setOpen(!open)}
// // //                     aria-label="Toggle menu"
// // //                     className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 ml-[-6px]"
// // //                   >
// // //                     <div className="relative w-6 h-5">
// // //                       <span
// // //                         className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // //                           open ? "rotate-45 top-2.5" : "top-0"
// // //                         }`}
// // //                       ></span>
// // //                       <span
// // //                         className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ease-in-out ${
// // //                           open ? "opacity-0" : "opacity-100"
// // //                         }`}
// // //                       ></span>
// // //                       <span
// // //                         className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // //                           open ? "-rotate-45 top-2.5" : "top-5"
// // //                         }`}
// // //                       ></span>
// // //                     </div>
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* 💻 Desktop layout */}
// // //           <div className="hidden sm:flex items-center justify-between w-full">
// // //             {/* Logo left */}
// // //             <Link
// // //               href="/"
// // //               className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
// // //             >
// // //               <img
// // //                 src="/image.png"
// // //                 alt="Placify Logo"
// // //                 width={60}
// // //                 height={60}
// // //                 className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
// // //               />
// // //               <div className="flex flex-col">
// // //                 <div className="text-lg sm:text-3xl font-bold whitespace-nowrap">
// // //                   Placify
// // //                   <div className="text-sm sm:text-xs font-normal">
// // //                     - path to placement
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </Link>

// // //             {/* Center Welcome text */}
// // //             {session && (
// // //               <div className="flex flex-col items-center justify-center text-center mx-auto">
// // //                 <span className="text-lg sm:text-2xl font-semibold tracking-wide">
// // //                   Welcome,&nbsp;
// // //                   <span className="text-white/95">@{username}</span>
// // //                 </span>
// // //                 <span className="text-sm mt-1">
// // //                   {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
// // //                 </span>
// // //               </div>
// // //             )}

// // //             {/* Right buttons */}
// // //             <div className="flex items-center gap-4 ml-auto">
// // //               {session ? (
// // //                 <button
// // //                   onClick={() => signOut()}
// // //                   className="bg-white text-black px-5 py-2 sm:py-2.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95"
// // //                 >
// // //                   Logout
// // //                 </button>
// // //               ) : (
// // //                 <Link href="/login">
// // //                   <button className="bg-white text-black px-6 py-2 sm:py-2.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95">
// // //                     Login
// // //                   </button>
// // //                 </Link>
// // //               )}

// // //               <button
// // //                 onClick={() => setOpen(!open)}
// // //                 aria-label="Toggle menu"
// // //                 className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 mr-1"
// // //               >
// // //                 <div className="relative w-6 h-5">
// // //                   <span
// // //                     className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // //                       open ? "rotate-45 top-2.5" : "top-0"
// // //                     }`}
// // //                   ></span>
// // //                   <span
// // //                     className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ease-in-out ${
// // //                       open ? "opacity-0" : "opacity-100"
// // //                     }`}
// // //                   ></span>
// // //                   <span
// // //                     className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // //                       open ? "-rotate-45 top-2.5" : "top-5"
// // //                     }`}
// // //                   ></span>
// // //                 </div>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       {/* 📋 Sidebar */}
// // //       <div
// // //         ref={sidebarRef}
// // //         className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-gradient-to-b from-sky-100 to-sky-200 text-black shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
// // //           open ? "translate-x-0" : "translate-x-full"
// // //         } rounded-l-3xl overflow-y-auto scroll-smooth custom-scroll`}
// // //       >
// // //         <div className="p-6 flex justify-between items-center border-b border-black/20 sticky top-0 bg-sky-100/90 backdrop-blur-sm z-10">
// // //           <h2 className="text-lg font-semibold">
// // //             {isTeacher ? "Teacher Menu" : "Student Menu"}
// // //           </h2>
// // //           <button
// // //             onClick={() => setOpen(false)}
// // //             className="hover:text-gray-700 text-black text-xl font-bold transition-transform active:scale-90 cursor-pointer"
// // //           >
// // //             ✕
// // //           </button>
// // //         </div>

// // //         {session && (
// // //           <div className="px-6 mt-4 text-sm text-gray-600 font-medium">
// // //             Signed in as <span className="text-sky-700">{email}</span>
// // //           </div>
// // //         )}

// // //         {/* 🧭 Student Menu – only show if NOT teacher */}
// // //         {!isTeacher && (
// // //           <ul className="flex flex-col font-medium mt-6 space-y-6 px-6 text-black">
// // //             {studentMenu.map((item, index) => (
// // //               <li key={index}>
// // //                 <Link
// // //                   href={item.href}
// // //                   onClick={() => setOpen(false)}
// // //                   className="flex items-center gap-4 py-4 px-5 rounded-xl border border-black/20 hover:bg-black/10 hover:scale-105 cursor-pointer transition-all transform shadow-sm active:scale-95"
// // //                 >
// // //                   {item.label}
// // //                 </Link>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}

// // //         {/* 🎓 Teacher Panel – only show if teacher */}
// // //         {isTeacher && (
// // //           <>
// // //             <hr className="my-4 border-t border-gray-400/40 mx-6" />
// // //             <div className="px-6 mt-3 mb-10">
// // //               <h3 className="text-base font-semibold text-gray-700 mb-3">
// // //                 Teacher Panel 👩‍🏫
// // //               </h3>

// // //               <ul className="flex flex-col font-medium space-y-4">
// // //                 {teacherPanel.map((item, index) => (
// // //                   <li key={index}>
// // //                     <Link
// // //                       href={item.href}
// // //                       onClick={() => setOpen(false)}
// // //                       className="flex items-center gap-4 py-3 px-5 rounded-xl border border-black/20 transition-all transform shadow-sm hover:bg-black/10 hover:scale-105 cursor-pointer active:scale-95"
// // //                     >
// // //                       {item.label}
// // //                     </Link>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>

// // //       {/* 🌈 Custom scrollbar styles */}
// // //       <style jsx>{`
// // //         .custom-scroll::-webkit-scrollbar {
// // //           width: 8px;
// // //         }
// // //         .custom-scroll::-webkit-scrollbar-track {
// // //           background: #e0f2fe;
// // //           border-radius: 10px;
// // //         }
// // //         .custom-scroll::-webkit-scrollbar-thumb {
// // //           background: linear-gradient(to bottom, #38bdf8, #0ea5e9);
// // //           border-radius: 10px;
// // //         }
// // //         .custom-scroll::-webkit-scrollbar-thumb:hover {
// // //           background: linear-gradient(to bottom, #0284c7, #0369a1);
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // };

// // // export default Navbar;

// // // "use client";
// // // import React, { useState, useRef, useEffect } from "react";
// // // import Link from "next/link";
// // // import { useSession, signOut } from "next-auth/react";

// // // const Navbar = () => {
// // //   const { data: session } = useSession();
// // //   const [open, setOpen] = useState(false);
// // //   const sidebarRef = useRef(null);
// // //   const [username, setUsername] = useState("");
// // //   const [email, setEmail] = useState("");

// // //   // 🔹 Detect click outside to close sidebar
// // //   useEffect(() => {
// // //     const handleClickOutside = (event) => {
// // //       if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
// // //         setOpen(false);
// // //       }
// // //     };
// // //     document.addEventListener("mousedown", handleClickOutside);
// // //     return () => document.removeEventListener("mousedown", handleClickOutside);
// // //   }, []);

// // //   // 🔹 Load and sync username/email
// // //   useEffect(() => {
// // //     if (session?.user?.email) {
// // //       const currentEmail = session.user.email;
// // //       const storedUser = JSON.parse(localStorage.getItem("placify_user") || "{}");

// // //       if (storedUser.email !== currentEmail) {
// // //         const defaultUsername = session.user.name || currentEmail.split("@")[0];
// // //         const newUserData = { email: currentEmail, username: defaultUsername };
// // //         localStorage.setItem("placify_user", JSON.stringify(newUserData));
// // //         setUsername(defaultUsername);
// // //         setEmail(currentEmail);
// // //       } else {
// // //         setUsername(storedUser.username);
// // //         setEmail(storedUser.email);
// // //       }
// // //     }
// // //   }, [session]);

// // //   // 🔹 Listen for profile updates
// // //   useEffect(() => {
// // //     const handleProfileUpdate = (e) => {
// // //       if (e.detail?.username && session?.user?.email) {
// // //         const updatedUser = {
// // //           email: session.user.email,
// // //           username: e.detail.username,
// // //         };
// // //         localStorage.setItem("placify_user", JSON.stringify(updatedUser));
// // //         setUsername(e.detail.username);
// // //       }
// // //     };
// // //     window.addEventListener("profileUpdated", handleProfileUpdate);
// // //     return () =>
// // //       window.removeEventListener("profileUpdated", handleProfileUpdate);
// // //   }, [session]);

// // //   // ✅ Check if teacher by email (from env)
// // //   const teacherEmails = process.env.NEXT_PUBLIC_TEACHER_EMAILS?.split(",") || [];
// // //   const isTeacher = teacherEmails.includes(session?.user?.email);

// // //   // Sidebar menus
// // //   const studentMenu = [
// // //     { href: "/", label: "🏠 Home" },
// // //     { href: "/profile", label: "👤 Profile" },
// // //     { href: "/dashboard", label: "📊 Dashboard" },
// // //     { href: "/ai-chatbot", label: "🤖 AI Chatbot" },
// // //     { href: "/preparation", label: "🎓 Preparation with Teachers" },
// // //     { href: "/chat-with-mentor", label: "🧑‍🏫 Chat with Mentor" },
// // //     { href: "/support", label: "🛠️ Support" },
// // //   ];

// // //   const teacherPanel = [
// // //     { href: "/teacher/dashboard", label: "👩‍🏫 Teacher Dashboard" },
// // //     { href: "/teacher/tasks", label: "📝 Manage Tasks" },
// // //     { href: "/teacher/feedback", label: "📈 Student Reviews" },
// // //     { href: "/teacher/chat", label: "💬 Chat with Students" },
// // //     { href: "/teacher/Performance-InsightPage", label: "🧠 Performance Insights" },
// // //   ];

// // //   return (
// // //     <>
// // //       {/* 🌈 Navbar */}
// // //       <nav className="bg-gradient-to-b from-sky-400 to-sky-600 text-white fixed w-full top-0 left-0 z-50 shadow-md">
// // //         <div className="max-w-screen-xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          
// // //           {/* 📱 Mobile layout */}
// // //           <div className="flex flex-col w-full sm:hidden">
// // //             {/* Logo */}
// // //             <div className="flex justify-center items-center">
// // //               <Link
// // //                 href="/"
// // //                 className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
// // //               >
// // //                 <img
// // //                   src="/image.png"
// // //                   alt="Placify Logo"
// // //                   width={55}
// // //                   height={55}
// // //                   className="rounded-xl shadow-[0_0_15px_#9b5cff] hover:scale-105 transition-transform duration-300"
// // //                 />
// // //                 <div className="flex flex-col items-center leading-tight">
// // //                   <div className="text-2xl font-bold">Placify</div>
// // //                   <div className="text-sm font-normal -mt-1">
// // //                     - path to placement
// // //                   </div>
// // //                 </div>
// // //               </Link>
// // //             </div>

// // //             {/* 👇 Login or Logout for mobile */}
// // //             <div className="flex justify-between items-center mt-3 px-1 sm:px-4 gap-3">
// // //               {session ? (
// // //                 <>
// // //                   <span className="text-base font-semibold whitespace-nowrap ml-1 text-left flex-1">
// // //                     Welcome,&nbsp;
// // //                     <span className="text-white/95">@{username}</span>
// // //                     <br />
// // //                     <span className="text-xs text-white/80">
// // //                       {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
// // //                     </span>
// // //                   </span>

// // //                   <div className="flex items-center gap-3 mr-2">
// // //                     <button
// // //                       onClick={() => signOut()}
// // //                       className="bg-white text-black px-3 py-1.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95"
// // //                     >
// // //                       Logout
// // //                     </button>

// // //                     <button
// // //                       onClick={() => setOpen(!open)}
// // //                       aria-label="Toggle menu"
// // //                       className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 ml-[-6px]"
// // //                     >
// // //                       <div className="relative w-6 h-5">
// // //                         <span
// // //                           className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // //                             open ? "rotate-45 top-2.5" : "top-0"
// // //                           }`}
// // //                         ></span>
// // //                         <span
// // //                           className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ease-in-out ${
// // //                             open ? "opacity-0" : "opacity-100"
// // //                           }`}
// // //                         ></span>
// // //                         <span
// // //                           className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // //                             open ? "-rotate-45 top-2.5" : "top-5"
// // //                           }`}
// // //                         ></span>
// // //                       </div>
// // //                     </button>
// // //                   </div>
// // //                 </>
// // //               ) : (
// // //                 <div className="flex justify-between items-center w-full px-2">
// // //                   <Link href="/login" className="flex-1">
// // //                     <button className="bg-white text-black px-4 py-1.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95">
// // //                       Login
// // //                     </button>
// // //                   </Link>

// // //                   <button
// // //                     onClick={() => setOpen(!open)}
// // //                     aria-label="Toggle menu"
// // //                     className="relative w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300"
// // //                   >
// // //                     <div className="relative w-6 h-5">
// // //                       <span
// // //                         className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // //                           open ? "rotate-45 top-2.5" : "top-0"
// // //                         }`}
// // //                       ></span>
// // //                       <span
// // //                         className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ease-in-out ${
// // //                           open ? "opacity-0" : "opacity-100"
// // //                         }`}
// // //                       ></span>
// // //                       <span
// // //                         className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // //                           open ? "-rotate-45 top-2.5" : "top-5"
// // //                         }`}
// // //                       ></span>
// // //                     </div>
// // //                   </button>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* 💻 Desktop layout */}
// // //           <div className="hidden sm:flex items-center justify-between w-full">
// // //             {/* Logo left */}
// // //             <Link
// // //               href="/"
// // //               className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
// // //             >
// // //               <img
// // //                 src="/image.png"
// // //                 alt="Placify Logo"
// // //                 width={60}
// // //                 height={60}
// // //                 className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
// // //               />
// // //               <div className="flex flex-col">
// // //                 <div className="text-lg sm:text-3xl font-bold whitespace-nowrap">
// // //                   Placify
// // //                   <div className="text-sm sm:text-xs font-normal">
// // //                     - path to placement
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </Link>

// // //             {/* Center Welcome text */}
// // //             {session && (
// // //               <div className="flex flex-col items-center justify-center text-center mx-auto">
// // //                 <span className="text-lg sm:text-2xl font-semibold tracking-wide">
// // //                   Welcome,&nbsp;
// // //                   <span className="text-white/95">@{username}</span>
// // //                 </span>
// // //                 <span className="text-sm mt-1">
// // //                   {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
// // //                 </span>
// // //               </div>
// // //             )}

// // //             {/* Right buttons */}
// // //             <div className="flex items-center gap-4 ml-auto">
// // //               {session ? (
// // //                 <button
// // //                   onClick={() => signOut()}
// // //                   className="bg-white text-black px-5 py-2 sm:py-2.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95"
// // //                 >
// // //                   Logout
// // //                 </button>
// // //               ) : (
// // //                 <Link href="/login">
// // //                   <button className="bg-white text-black px-6 py-2 sm:py-2.5 rounded-lg text-sm shadow-md cursor-pointer transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95">
// // //                     Login
// // //                   </button>
// // //                 </Link>
// // //               )}

// // //               <button
// // //                 onClick={() => setOpen(!open)}
// // //                 aria-label="Toggle menu"
// // //                 className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 mr-1"
// // //               >
// // //                 <div className="relative w-6 h-5">
// // //                   <span
// // //                     className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // //                       open ? "rotate-45 top-2.5" : "top-0"
// // //                     }`}
// // //                   ></span>
// // //                   <span
// // //                     className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ease-in-out ${
// // //                       open ? "opacity-0" : "opacity-100"
// // //                     }`}
// // //                   ></span>
// // //                   <span
// // //                     className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// // //                       open ? "-rotate-45 top-2.5" : "top-5"
// // //                     }`}
// // //                   ></span>
// // //                 </div>
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </nav>

// // //       {/* 📋 Sidebar */}
// // //       <div
// // //         ref={sidebarRef}
// // //         className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-gradient-to-b from-sky-100 to-sky-200 text-black shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
// // //           open ? "translate-x-0" : "translate-x-full"
// // //         } rounded-l-3xl overflow-y-auto scroll-smooth custom-scroll`}
// // //       >
// // //         <div className="p-6 flex justify-between items-center border-b border-black/20 sticky top-0 bg-sky-100/90 backdrop-blur-sm z-10">
// // //           <h2 className="text-lg font-semibold">
// // //             {isTeacher ? "Teacher Menu" : "Student Menu"}
// // //           </h2>
// // //           <button
// // //             onClick={() => setOpen(false)}
// // //             className="hover:text-gray-700 text-black text-xl font-bold transition-transform active:scale-90 cursor-pointer"
// // //           >
// // //             ✕
// // //           </button>
// // //         </div>

// // //         {session && (
// // //           <div className="px-6 mt-4 text-sm text-gray-600 font-medium">
// // //             Signed in as <span className="text-sky-700">{email}</span>
// // //           </div>
// // //         )}

// // //         {/* 🧭 Student Menu */}
// // //         {!isTeacher && (
// // //           <ul className="flex flex-col font-medium mt-6 space-y-6 px-6 text-black">
// // //             {studentMenu.map((item, index) => (
// // //               <li key={index}>
// // //                 <Link
// // //                   href={item.href}
// // //                   onClick={() => setOpen(false)}
// // //                   className="flex items-center gap-4 py-4 px-5 rounded-xl border border-black/20 hover:bg-black/10 hover:scale-105 cursor-pointer transition-all transform shadow-sm active:scale-95"
// // //                 >
// // //                   {item.label}
// // //                 </Link>
// // //               </li>
// // //             ))}
// // //           </ul>
// // //         )}

// // //         {/* 🎓 Teacher Panel */}
// // //         {isTeacher && (
// // //           <>
// // //             <hr className="my-4 border-t border-gray-400/40 mx-6" />
// // //             <div className="px-6 mt-3 mb-10">
// // //               <h3 className="text-base font-semibold text-gray-700 mb-3">
// // //                 Teacher Panel 👩‍🏫
// // //               </h3>
// // //               <ul className="flex flex-col font-medium space-y-4">
// // //                 {teacherPanel.map((item, index) => (
// // //                   <li key={index}>
// // //                     <Link
// // //                       href={item.href}
// // //                       onClick={() => setOpen(false)}
// // //                       className="flex items-center gap-4 py-3 px-5 rounded-xl border border-black/20 transition-all transform shadow-sm hover:bg-black/10 hover:scale-105 cursor-pointer active:scale-95"
// // //                     >
// // //                       {item.label}
// // //                     </Link>
// // //                   </li>
// // //                 ))}
// // //               </ul>
// // //             </div>
// // //           </>
// // //         )}
// // //       </div>

// // //       {/* 🌈 Custom Scrollbar */}
// // //       <style jsx>{`
// // //         .custom-scroll::-webkit-scrollbar {
// // //           width: 8px;
// // //         }
// // //         .custom-scroll::-webkit-scrollbar-track {
// // //           background: #e0f2fe;
// // //           border-radius: 10px;
// // //         }
// // //         .custom-scroll::-webkit-scrollbar-thumb {
// // //           background: linear-gradient(to bottom, #38bdf8, #0ea5e9);
// // //           border-radius: 10px;
// // //         }
// // //         .custom-scroll::-webkit-scrollbar-thumb:hover {
// // //           background: linear-gradient(to bottom, #0284c7, #0369a1);
// // //         }
// // //       `}</style>
// // //     </>
// // //   );
// // // };

// // // export default Navbar;

// // "use client";
// // import React, { useState, useRef, useEffect } from "react";
// // import Link from "next/link";
// // import { useSession, signOut } from "next-auth/react";
// // import { Search } from "lucide-react"; // ✅ only new import

// // const Navbar = () => {
// //   const { data: session } = useSession();
// //   const [open, setOpen] = useState(false);
// //   const [showSearch, setShowSearch] = useState(false);
// //   const [query, setQuery] = useState("");
// //   const [matches, setMatches] = useState([]);
// //   const [currentIndex, setCurrentIndex] = useState(0);

// //   const sidebarRef = useRef(null);
// //   const searchRef = useRef(null);

// //   const [username, setUsername] = useState("");
// //   const [email, setEmail] = useState("");

// //   // 🔹 Close sidebar or search when clicking outside
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (
// //         sidebarRef.current &&
// //         !sidebarRef.current.contains(e.target) &&
// //         searchRef.current &&
// //         !searchRef.current.contains(e.target)
// //       ) {
// //         setOpen(false);
// //         setShowSearch(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   // 🔹 Load username/email
// //   useEffect(() => {
// //     if (session?.user?.email) {
// //       const currentEmail = session.user.email;
// //       const storedUser = JSON.parse(localStorage.getItem("placify_user") || "{}");
// //       if (storedUser.email !== currentEmail) {
// //         const defaultUsername = session.user.name || currentEmail.split("@")[0];
// //         const newUser = { email: currentEmail, username: defaultUsername };
// //         localStorage.setItem("placify_user", JSON.stringify(newUser));
// //         setUsername(defaultUsername);
// //         setEmail(currentEmail);
// //       } else {
// //         setUsername(storedUser.username);
// //         setEmail(storedUser.email);
// //       }
// //     }
// //   }, [session]);

// //   const teacherEmails = process.env.NEXT_PUBLIC_TEACHER_EMAILS?.split(",") || [];
// //   const isTeacher = teacherEmails.includes(session?.user?.email);

// //   // ---------- Search Logic ----------
// //   const removeHighlights = () =>
// //     document.querySelectorAll(".search-highlight").forEach((el) => (el.outerHTML = el.textContent));

// //   useEffect(() => {
// //     removeHighlights();
// //     const term = query.trim();
// //     if (!term) {
// //       setMatches([]);
// //       return;
// //     }

// //     const found = [];
// //     const elements = Array.from(document.querySelectorAll("body *")).filter(
// //       (el) =>
// //         !["SCRIPT", "STYLE", "MARK"].includes(el.tagName) &&
// //         !el.closest("nav") &&
// //         el.childNodes.length
// //     );

// //     elements.forEach((el) => {
// //       el.childNodes.forEach((node) => {
// //         if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
// //           const text = node.nodeValue;
// //           const lower = text.toLowerCase();
// //           const t = term.toLowerCase();
// //           let i = 0;
// //           const parts = [];
// //           while (i < text.length) {
// //             const idx = lower.indexOf(t, i);
// //             if (idx === -1) break;
// //             parts.push(
// //               text.slice(i, idx),
// //               `<mark class="search-highlight bg-yellow-300 text-black px-0.5 rounded">${text.slice(
// //                 idx,
// //                 idx + t.length
// //               )}</mark>`
// //             );
// //             i = idx + 1;
// //           }
// //           parts.push(text.slice(i));
// //           if (parts.length > 1) {
// //             const span = document.createElement("span");
// //             span.innerHTML = parts.join("");
// //             el.replaceChild(span, node);
// //             span.querySelectorAll(".search-highlight").forEach((m) => found.push(m));
// //           }
// //         }
// //       });
// //     });

// //     setMatches(found);
// //     setCurrentIndex(0);
// //     if (found.length) {
// //       found[0].style.background = "#3b82f6";
// //       found[0].style.color = "white";
// //       found[0].scrollIntoView({ behavior: "smooth", block: "center" });
// //     }
// //   }, [query]);

// //   const goTo = (i) => {
// //     if (!matches.length) return;
// //     const total = matches.length;
// //     const newI = (i + total) % total;
// //     matches.forEach((m, idx) => {
// //       m.style.background = idx === newI ? "#3b82f6" : "#fde047";
// //       m.style.color = idx === newI ? "white" : "black";
// //     });
// //     matches[newI].scrollIntoView({ behavior: "smooth", block: "center" });
// //     setCurrentIndex(newI);
// //   };

// //   const next = () => goTo(currentIndex + 1);
// //   const prev = () => goTo(currentIndex - 1);
// //   const clear = () => {
// //     setQuery("");
// //     removeHighlights();
// //     setMatches([]);
// //     setShowSearch(false);
// //   };

// //   // Menus (unchanged)
// //   const studentMenu = [
// //     { href: "/", label: "🏠 Home" },
// //     { href: "/profile", label: "👤 Profile" },
// //     { href: "/dashboard", label: "📊 Dashboard" },
// //     { href: "/ai-chatbot", label: "🤖 AI Chatbot" },
// //     { href: "/preparation", label: "🎓 Preparation with Teachers" },
// //     { href: "/chat-with-mentor", label: "🧑‍🏫 Chat with Mentor" },
// //     { href: "/support", label: "🛠️ Support" },
// //   ];

// //   const teacherPanel = [
// //     { href: "/teacher/dashboard", label: "👩‍🏫 Teacher Dashboard" },
// //     { href: "/teacher/tasks", label: "📝 Manage Tasks" },
// //     { href: "/teacher/feedback", label: "📈 Student Reviews" },
// //     { href: "/teacher/chat", label: "💬 Chat with Students" },
// //     { href: "/teacher/Performance-InsightPage", label: "🧠 Performance Insights" },
// //   ];

// //   return (
// //     <>
// //       {/* 🌈 Navbar */}
// //       <nav className="bg-gradient-to-b from-sky-400 to-sky-600 text-white fixed w-full top-0 left-0 z-50 shadow-md">
// //         <div className="max-w-screen-xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
// //           {/* 💻 Desktop layout */}
// //           <div className="hidden sm:flex items-center justify-between w-full">
// //             {/* Logo left (unchanged) */}
// //             <Link
// //               href="/"
// //               className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
// //             >
// //               <img
// //                 src="/image.png"
// //                 alt="Placify Logo"
// //                 width={60}
// //                 height={60}
// //                 className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
// //               />
// //               <div className="flex flex-col">
// //                 <div className="text-lg sm:text-3xl font-bold whitespace-nowrap">
// //                   Placify
// //                   <div className="text-sm sm:text-xs font-normal">- path to placement</div>
// //                 </div>
// //               </div>
// //             </Link>

// //             {/* Center Welcome text (same) */}
// //             {session && (
// //               <div className="flex flex-col items-center justify-center text-center mx-auto">
// //                 <span className="text-lg sm:text-2xl font-semibold tracking-wide">
// //                   Welcome,&nbsp;
// //                   <span className="text-white/95">@{username}</span>
// //                 </span>
// //                 <span className="text-sm mt-1">
// //                   {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
// //                 </span>
// //               </div>
// //             )}

// //             {/* Right section (Logout + Search + Menu) */}
// //             <div className="flex items-center gap-3 ml-auto">
// //               {/* Search icon beside Logout */}
// //               <button
// //                 onClick={() => setShowSearch(!showSearch)}
// //                 className="bg-white text-black p-2 rounded-full shadow-md hover:scale-105 transition-transform duration-200"
// //                 aria-label="Search this page"
// //               >
// //                 <Search size={18} />
// //               </button>

// //               {session ? (
// //                 <button
// //                   onClick={() => signOut()}
// //                   className="bg-white text-black px-5 py-2 sm:py-2.5 rounded-lg text-sm shadow-md transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95"
// //                 >
// //                   Logout
// //                 </button>
// //               ) : (
// //                 <Link href="/login">
// //                   <button className="bg-white text-black px-6 py-2 sm:py-2.5 rounded-lg text-sm shadow-md transition-all duration-200 transform hover:bg-gray-100 hover:scale-105 active:scale-95">
// //                     Login
// //                   </button>
// //                 </Link>
// //               )}

// //               {/* Hamburger (unchanged) */}
// //               <button
// //                 onClick={() => setOpen(!open)}
// //                 aria-label="Toggle menu"
// //                 className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-transform duration-300 mr-1"
// //               >
// //                 <div className="relative w-6 h-5">
// //                   <span
// //                     className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// //                       open ? "rotate-45 top-2.5" : "top-0"
// //                     }`}
// //                   ></span>
// //                   <span
// //                     className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ease-in-out ${
// //                       open ? "opacity-0" : "opacity-100"
// //                     }`}
// //                   ></span>
// //                   <span
// //                     className={`absolute block h-0.5 w-6 bg-black transform transition-all duration-300 ease-in-out ${
// //                       open ? "-rotate-45 top-2.5" : "top-5"
// //                     }`}
// //                   ></span>
// //                 </div>
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* 🔍 Floating Search Bar */}
// //       {showSearch && (
// //         <div
// //           ref={searchRef}
// //           className="fixed top-20 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-xl px-3 py-2 flex items-center gap-2 z-[999] w-[85%] sm:w-[40%] animate-fadeIn"
// //         >
// //           <input
// //             type="text"
// //             value={query}
// //             onChange={(e) => setQuery(e.target.value)}
// //             placeholder="Search this page..."
// //             className="flex-1 px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 focus:ring-2 focus:ring-sky-400 outline-none text-sm"
// //           />
// //           <span className="text-gray-600 text-xs font-semibold min-w-[60px] text-center">
// //             {matches.length ? `${currentIndex + 1} / ${matches.length}` : "0 / 0"}
// //           </span>
// //           <button onClick={prev} disabled={!matches.length} className="px-2 py-1 rounded text-xs bg-gray-200 hover:bg-gray-300">↑</button>
// //           <button onClick={next} disabled={!matches.length} className="px-2 py-1 rounded text-xs bg-gray-200 hover:bg-gray-300">↓</button>
// //           <button onClick={clear} className="text-red-600 text-lg font-bold px-2">✕</button>
// //         </div>
// //       )}

// //       <style jsx global>{`
// //         @keyframes fadeIn {
// //           from { opacity: 0; transform: translate(-50%, -10px); }
// //           to { opacity: 1; transform: translate(-50%, 0); }
// //         }
// //         .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
// //       `}</style>
// //     </>
// //   );
// // };

// // export default Navbar;

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { useSession, signOut } from "next-auth/react";
// import { Search } from "lucide-react";

// const Navbar = () => {
//   const { data: session } = useSession();
//   const [open, setOpen] = useState(false);
//   const [showSearch, setShowSearch] = useState(false);
//   const [query, setQuery] = useState("");
//   const [matches, setMatches] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const sidebarRef = useRef(null);
//   const searchRef = useRef(null);

//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");

//   // Close sidebar or search when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (
//         (!sidebarRef.current || !sidebarRef.current.contains(e.target)) &&
//         (!searchRef.current || !searchRef.current.contains(e.target))
//       ) {
//         setOpen(false);
//         setShowSearch(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Load username/email
//   useEffect(() => {
//     if (session?.user?.email) {
//       const currentEmail = session.user.email;
//       const storedUser = JSON.parse(localStorage.getItem("placify_user") || "{}");

//       if (storedUser.email !== currentEmail) {
//         const defaultUsername = session.user.name || currentEmail.split("@")[0];
//         const newUserData = { email: currentEmail, username: defaultUsername };
//         localStorage.setItem("placify_user", JSON.stringify(newUserData));
//         setUsername(defaultUsername);
//         setEmail(currentEmail);
//       } else {
//         setUsername(storedUser.username);
//         setEmail(storedUser.email);
//       }
//     }
//   }, [session]);

//   const teacherEmails = process.env.NEXT_PUBLIC_TEACHER_EMAILS?.split(",") || [];
//   const isTeacher = teacherEmails.includes(session?.user?.email);

//   // Search Logic
//   const removeHighlights = () =>
//     document.querySelectorAll(".search-highlight").forEach((el) => (el.outerHTML = el.textContent));

//   useEffect(() => {
//     removeHighlights();
//     const term = query.trim();
//     if (!term) {
//       setMatches([]);
//       return;
//     }

//     const found = [];
//     const elements = Array.from(document.querySelectorAll("body *")).filter(
//       (el) =>
//         !["SCRIPT", "STYLE", "MARK"].includes(el.tagName) &&
//         !el.closest("nav") &&
//         el.childNodes.length
//     );

//     elements.forEach((el) => {
//       el.childNodes.forEach((node) => {
//         if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
//           const text = node.nodeValue;
//           const lower = text.toLowerCase();
//           const t = term.toLowerCase();
//           let i = 0;
//           const parts = [];
//           while (i < text.length) {
//             const idx = lower.indexOf(t, i);
//             if (idx === -1) break;
//             parts.push(
//               text.slice(i, idx),
//               `<mark class="search-highlight bg-yellow-300 text-black px-0.5 rounded">${text.slice(
//                 idx,
//                 idx + t.length
//               )}</mark>`
//             );
//             i = idx + 1;
//           }
//           parts.push(text.slice(i));
//           if (parts.length > 1) {
//             const span = document.createElement("span");
//             span.innerHTML = parts.join("");
//             el.replaceChild(span, node);
//             span.querySelectorAll(".search-highlight").forEach((m) => found.push(m));
//           }
//         }
//       });
//     });

//     setMatches(found);
//     setCurrentIndex(0);
//     if (found.length) {
//       found[0].style.background = "#3b82f6";
//       found[0].style.color = "white";
//       found[0].scrollIntoView({ behavior: "smooth", block: "center" });
//     }
//   }, [query]);

//   const goTo = (i) => {
//     if (!matches.length) return;
//     const total = matches.length;
//     const newI = (i + total) % total;
//     matches.forEach((m, idx) => {
//       m.style.background = idx === newI ? "#3b82f6" : "#fde047";
//       m.style.color = idx === newI ? "white" : "black";
//     });
//     matches[newI].scrollIntoView({ behavior: "smooth", block: "center" });
//     setCurrentIndex(newI);
//   };

//   const next = () => goTo(currentIndex + 1);
//   const prev = () => goTo(currentIndex - 1);
//   const clear = () => {
//     setQuery("");
//     removeHighlights();
//     setMatches([]);
//     setShowSearch(false);
//   };

//   const studentMenu = [
//     { href: "/", label: "🏠 Home" },
//     { href: "/profile", label: "👤 Profile" },
//     { href: "/dashboard", label: "📊 Dashboard" },
//     { href: "/ai-chatbot", label: "🤖 AI Chatbot" },
//     { href: "/preparation", label: "🎓 Preparation with Teachers" },
//     { href: "/chat-with-mentor", label: "🧑‍🏫 Chat with Mentor" },
//     { href: "/support", label: "🛠️ Support" },
//   ];

//   const teacherPanel = [
//     { href: "/teacher/dashboard", label: "👩‍🏫 Teacher Dashboard" },
//     { href: "/teacher/tasks", label: "📝 Manage Tasks" },
//     { href: "/teacher/feedback", label: "📈 Student Reviews" },
//     { href: "/teacher/chat", label: "💬 Chat with Students" },
//     { href: "/teacher/Performance-InsightPage", label: "🧠 Performance Insights" },
//   ];

//   return (
//     <>
//       {/* 🌈 Navbar */}
//       <nav className="bg-gradient-to-b from-sky-400 to-sky-600 text-white fixed w-full top-0 left-0 z-50 shadow-md">
//         <div className="max-w-screen-xl mx-auto px-4 py-4 sm:py-5">
//           {/* 📱 Mobile Layout */}
//           <div className="flex flex-col w-full sm:hidden">
//             <div className="flex justify-center items-center">
//               <Link
//                 href="/"
//                 className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
//               >
//                 <img
//                   src="/image.png"
//                   alt="Placify Logo"
//                   width={50}
//                   height={50}
//                   className="rounded-xl shadow-[0_0_15px_#9b5cff]"
//                 />
//                 <div className="flex flex-col items-center leading-tight">
//                   <div className="text-2xl font-bold">Placify</div>
//                   <div className="text-sm font-normal -mt-1">- path to placement</div>
//                 </div>
//               </Link>
//             </div>

//             {/* Welcome + Buttons */}
//             <div className="flex justify-between items-center mt-3 px-1 gap-2">
//               {session ? (
//                 <>
//                   <div className="flex-1 text-left text-sm">
//                     <p className="font-semibold">
//                       Welcome, <span className="text-white/90">@{username}</span>
//                     </p>
//                     <p className="text-xs text-white/80">
//                       {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
//                     </p>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() => setShowSearch(!showSearch)}
//                       className="bg-white text-black p-2 rounded-full shadow-md hover:scale-105 cursor-pointer"
//                     >
//                       <Search size={16} />
//                     </button>
//                     <button
//                       onClick={() => signOut()}
//                       className="bg-white text-black px-3 py-1.5 rounded-md text-xs shadow-md hover:scale-105 cursor-pointer"
//                     >
//                       Logout
//                     </button>
//                     <button
//                       onClick={() => setOpen(!open)}
//                       className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105"
//                     >
//                       <div className="relative w-5 h-4">
//                         <span
//                           className={`absolute block h-0.5 w-5 bg-black transition-all duration-300 ${
//                             open ? "rotate-45 top-2" : "top-0"
//                           }`}
//                         ></span>
//                         <span
//                           className={`absolute block h-0.5 w-5 bg-black top-2 transition-all duration-300 ${
//                             open ? "opacity-0" : "opacity-100"
//                           }`}
//                         ></span>
//                         <span
//                           className={`absolute block h-0.5 w-5 bg-black transition-all duration-300 ${
//                             open ? "-rotate-45 top-2" : "top-4"
//                           }`}
//                         ></span>
//                       </div>
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <div className="flex justify-between items-center w-full">
//                   <Link href="/login">
//                     <button className="bg-white text-black px-3 py-1.5 rounded-md text-xs shadow-md hover:scale-105">
//                       Login
//                     </button>
//                   </Link>
//                   <button
//                     onClick={() => setOpen(!open)}
//                     className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105"
//                   >
//                     <div className="relative w-5 h-4">
//                       <span
//                         className={`absolute block h-0.5 w-5 bg-black transition-all duration-300 ${
//                           open ? "rotate-45 top-2" : "top-0"
//                         }`}
//                       ></span>
//                       <span
//                         className={`absolute block h-0.5 w-5 bg-black top-2 transition-all duration-300 ${
//                           open ? "opacity-0" : "opacity-100"
//                         }`}
//                       ></span>
//                       <span
//                         className={`absolute block h-0.5 w-5 bg-black transition-all duration-300 ${
//                           open ? "-rotate-45 top-2" : "top-4"
//                         }`}
//                       ></span>
//                     </div>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* 💻 Desktop Layout */}
//           <div className="hidden sm:flex items-center justify-between w-full">
//             {/* Logo */}
//             <Link
//               href="/"
//               className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
//             >
//               <img
//                 src="/image.png"
//                 alt="Placify Logo"
//                 width={60}
//                 height={60}
//                 className="rounded-xl shadow-md"
//               />
//               <div className="flex flex-col">
//                 <div className="text-3xl font-bold">Placify</div>
//                 <div className="text-xs">- path to placement</div>
//               </div>
//             </Link>

//             {session && (
//               <div className="flex flex-col items-center justify-center text-center mx-auto">
//                 <span className="text-2xl font-semibold">
//                   Welcome,&nbsp;<span className="text-white/95">@{username}</span>
//                 </span>
//                 <span className="text-sm">
//                   {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
//                 </span>
//               </div>
//             )}

//             {/* Right Buttons */}
//             <div className="flex items-center gap-3 ml-auto">
//               <button
//                 onClick={() => setShowSearch(!showSearch)}
//                 className="bg-white text-black p-2 rounded-full shadow-md hover:scale-105 cursor-pointer"
//               >
//                 <Search size={18} />
//               </button>

//               {session ? (
//                 <button
//                   onClick={() => signOut()}
//                   className="bg-white text-black px-5 py-2 rounded-lg text-sm shadow-md hover:scale-105 cursor-pointer"
//                 >
//                   Logout
//                 </button>
//               ) : (
//                 <Link href="/login">
//                   <button className="bg-white text-black px-6 py-2 rounded-lg text-sm shadow-md hover:scale-105 cursor-pointer">
//                     Login
//                   </button>
//                 </Link>
//               )}

//               <button
//                 onClick={() => setOpen(!open)}
//                 className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105"
//               >
//                 <div className="relative w-6 h-5">
//                   <span
//                     className={`absolute block h-0.5 w-6 bg-black transition-all duration-300 ${
//                       open ? "rotate-45 top-2.5" : "top-0"
//                     }`}
//                   ></span>
//                   <span
//                     className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ${
//                       open ? "opacity-0" : "opacity-100"
//                     }`}
//                   ></span>
//                   <span
//                     className={`absolute block h-0.5 w-6 bg-black transition-all duration-300 ${
//                       open ? "-rotate-45 top-2.5" : "top-5"
//                     }`}
//                   ></span>
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* 🔍 Floating Search Bar */}
//       {showSearch && (
//         <div
//           ref={searchRef}
//           className="fixed top-20 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-xl px-3 py-2 flex items-center gap-2 z-[999] w-[85%] sm:w-[40%]"
//         >
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search this page..."
//             className="flex-1 px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 focus:ring-2 focus:ring-sky-400 outline-none text-sm"
//           />
//           <span className="text-gray-600 text-xs font-semibold min-w-[60px] text-center">
//             {matches.length ? `${currentIndex + 1} / ${matches.length}` : "0 / 0"}
//           </span>
//           <button onClick={prev} disabled={!matches.length} className="px-2 py-1 rounded text-xs bg-gray-200 hover:bg-gray-300 cursor-pointer">↑</button>
//           <button onClick={next} disabled={!matches.length} className="px-2 py-1 rounded text-xs bg-gray-200 hover:bg-gray-300 cursor-pointer">↓</button>
//           <button onClick={clear} className="text-red-600 text-lg font-bold px-2 cursor-pointer">✕</button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;

"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Search } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [matches, setMatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sidebarRef = useRef(null);
  const searchRef = useRef(null);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // ✅ Detect outside clicks to close sidebar/search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !sidebarRef.current?.contains(e.target) &&
        !searchRef.current?.contains(e.target)
      ) {
        setOpen(false);
        setShowSearch(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Stop closing when clicking inside sidebar or hamburger
  const handleHamburgerClick = (e) => {
    e.stopPropagation(); // prevent outer listener
    setOpen((prev) => !prev);
  };

  const handleSidebarClick = (e) => e.stopPropagation();

  // 🔹 Load username/email
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

  const teacherEmails = process.env.NEXT_PUBLIC_TEACHER_EMAILS?.split(",") || [];
  const isTeacher = teacherEmails.includes(session?.user?.email);

  // ---------- Search Logic ----------
  const removeHighlights = () =>
    document.querySelectorAll(".search-highlight").forEach((el) => (el.outerHTML = el.textContent));

  useEffect(() => {
    removeHighlights();
    const term = query.trim();
    if (!term) {
      setMatches([]);
      return;
    }

    const found = [];
    const elements = Array.from(document.querySelectorAll("body *")).filter(
      (el) =>
        !["SCRIPT", "STYLE", "MARK"].includes(el.tagName) &&
        !el.closest("nav") &&
        el.childNodes.length
    );

    elements.forEach((el) => {
      el.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim()) {
          const text = node.nodeValue;
          const lower = text.toLowerCase();
          const t = term.toLowerCase();
          let i = 0;
          const parts = [];
          while (i < text.length) {
            const idx = lower.indexOf(t, i);
            if (idx === -1) break;
            parts.push(
              text.slice(i, idx),
              `<mark class="search-highlight bg-yellow-300 text-black px-0.5 rounded">${text.slice(
                idx,
                idx + t.length
              )}</mark>`
            );
            i = idx + 1;
          }
          parts.push(text.slice(i));
          if (parts.length > 1) {
            const span = document.createElement("span");
            span.innerHTML = parts.join("");
            el.replaceChild(span, node);
            span.querySelectorAll(".search-highlight").forEach((m) => found.push(m));
          }
        }
      });
    });

    setMatches(found);
    setCurrentIndex(0);
    if (found.length) {
      found[0].style.background = "#3b82f6";
      found[0].style.color = "white";
      found[0].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [query]);

  const goTo = (i) => {
    if (!matches.length) return;
    const total = matches.length;
    const newI = (i + total) % total;
    matches.forEach((m, idx) => {
      m.style.background = idx === newI ? "#3b82f6" : "#fde047";
      m.style.color = idx === newI ? "white" : "black";
    });
    matches[newI].scrollIntoView({ behavior: "smooth", block: "center" });
    setCurrentIndex(newI);
  };

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);
  const clear = () => {
    setQuery("");
    removeHighlights();
    setMatches([]);
    setShowSearch(false);
  };

  // Sidebar Menus
  const studentMenu = [
    { href: "/", label: "🏠 Home" },
    { href: "/profile", label: "👤 Profile" },
    { href: "/dashboard", label: "📊 Dashboard" },
    { href: "/ai-chatbot", label: "🤖 AI Chatbot" },
    { href: "/preparation", label: "🎓 Preparation with Teachers" },
    { href: "/chat-with-mentor", label: "🧑‍🏫 Chat with Mentor" },
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
        <div className="max-w-screen-xl mx-auto px-4 py-4 sm:py-5">
          {/* 📱 Mobile Layout */}
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
                  width={50}
                  height={50}
                  className="rounded-xl shadow-[0_0_15px_#9b5cff]"
                />
                <div className="flex flex-col items-center leading-tight">
                  <div className="text-2xl font-bold">Placify</div>
                  <div className="text-sm font-normal -mt-1">- path to placement</div>
                </div>
              </Link>
            </div>

            {/* Welcome + Buttons */}
            <div className="flex justify-between items-center mt-3 px-1 gap-2">
              {session ? (
                <>
                  <div className="flex-1 text-left text-sm">
                    <p className="font-semibold">
                      Welcome, <span className="text-white/90">@{username}</span>
                    </p>
                    <p className="text-xs text-white/80">
                      {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowSearch(!showSearch)}
                      className="bg-white text-black p-2 rounded-full shadow-md hover:scale-105 cursor-pointer"
                    >
                      <Search size={16} />
                    </button>
                    <button
                      onClick={() => signOut()}
                      className="bg-white text-black px-3 py-1.5 rounded-md text-xs shadow-md hover:scale-105 cursor-pointer"
                    >
                      Logout
                    </button>
                    <button
                      onClick={handleHamburgerClick}
                      className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105"
                    >
                      <div className="relative w-5 h-4">
                        <span
                          className={`absolute block h-0.5 w-5 bg-black transition-all duration-300 ${
                            open ? "rotate-45 top-2" : "top-0"
                          }`}
                        ></span>
                        <span
                          className={`absolute block h-0.5 w-5 bg-black top-2 transition-all duration-300 ${
                            open ? "opacity-0" : "opacity-100"
                          }`}
                        ></span>
                        <span
                          className={`absolute block h-0.5 w-5 bg-black transition-all duration-300 ${
                            open ? "-rotate-45 top-2" : "top-4"
                          }`}
                        ></span>
                      </div>
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-center w-full">
                  <Link href="/login">
                    <button className="bg-white text-black px-3 py-1.5 rounded-md text-xs shadow-md hover:scale-105">
                      Login
                    </button>
                  </Link>
                  <button
                    onClick={handleHamburgerClick}
                    className="relative w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105"
                  >
                    <div className="relative w-5 h-4">
                      <span
                        className={`absolute block h-0.5 w-5 bg-black transition-all duration-300 ${
                          open ? "rotate-45 top-2" : "top-0"
                        }`}
                      ></span>
                      <span
                        className={`absolute block h-0.5 w-5 bg-black top-2 transition-all duration-300 ${
                          open ? "opacity-0" : "opacity-100"
                        }`}
                      ></span>
                      <span
                        className={`absolute block h-0.5 w-5 bg-black transition-all duration-300 ${
                          open ? "-rotate-45 top-2" : "top-4"
                        }`}
                      ></span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* 💻 Desktop Layout */}
          <div className="hidden sm:flex items-center justify-between w-full">
            <Link
              href="/"
              className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
            >
              <img
                src="/image.png"
                alt="Placify Logo"
                width={60}
                height={60}
                className="rounded-xl shadow-md"
              />
              <div className="flex flex-col">
                <div className="text-3xl font-bold">Placify</div>
                <div className="text-xs">- path to placement</div>
              </div>
            </Link>

            {session && (
              <div className="flex flex-col items-center justify-center text-center mx-auto">
                <span className="text-2xl font-semibold">
                  Welcome,&nbsp;<span className="text-white/95">@{username}</span>
                </span>
                <span className="text-sm">
                  {isTeacher ? "Teacher Dashboard 👩‍🏫" : "Student Dashboard 🎓"}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="bg-white text-black p-2 rounded-full shadow-md hover:scale-105 cursor-pointer"
              >
                <Search size={18} />
              </button>

              {session ? (
                <button
                  onClick={() => signOut()}
                  className="bg-white text-black px-5 py-2 rounded-lg text-sm shadow-md hover:scale-105 cursor-pointer"
                >
                  Logout
                </button>
              ) : (
                <Link href="/login">
                  <button className="bg-white text-black px-6 py-2 rounded-lg text-sm shadow-md hover:scale-105 cursor-pointer">
                    Login
                  </button>
                </Link>
              )}

              <button
                onClick={handleHamburgerClick}
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:scale-105"
              >
                <div className="relative w-6 h-5">
                  <span
                    className={`absolute block h-0.5 w-6 bg-black transition-all duration-300 ${
                      open ? "rotate-45 top-2.5" : "top-0"
                    }`}
                  ></span>
                  <span
                    className={`absolute block h-0.5 w-6 bg-black top-2.5 transition-all duration-300 ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`absolute block h-0.5 w-6 bg-black transition-all duration-300 ${
                      open ? "-rotate-45 top-2.5" : "top-5"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 📋 Sidebar */}
      <div
        ref={sidebarRef}
        onClick={handleSidebarClick}
        className={`fixed top-0 right-0 h-full w-72 sm:w-80 bg-gradient-to-b from-sky-100 to-sky-200 text-black shadow-2xl z-[999] transform transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        } rounded-l-3xl overflow-y-auto`}
      >
        <div className="p-6 flex justify-between items-center border-b border-black/20 sticky top-0 bg-sky-100/90 backdrop-blur-sm z-10">
          <h2 className="text-lg font-semibold">
            {isTeacher ? "Teacher Menu" : "Student Menu"}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="hover:text-gray-700 text-black text-xl font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {session && (
          <div className="px-6 mt-4 text-sm text-gray-600 font-medium">
            Signed in as <span className="text-sky-700">{email}</span>
          </div>
        )}

        <ul className="flex flex-col font-medium mt-6 space-y-6 px-6 text-black">
          {(isTeacher ? teacherPanel : studentMenu).map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-4 py-4 px-5 rounded-xl border border-black/20 hover:bg-black/10 hover:scale-105 cursor-pointer transition-all transform shadow-sm"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔍 Floating Search */}
      {showSearch && (
        <div
          ref={searchRef}
          className="fixed top-20 left-1/2 -translate-x-1/2 bg-white shadow-xl rounded-xl px-3 py-2 flex items-center gap-2 z-[1000] w-[85%] sm:w-[40%]"
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search this page..."
            className="flex-1 px-3 py-1.5 rounded-md border border-gray-300 text-gray-700 focus:ring-2 focus:ring-sky-400 outline-none text-sm "
          />
          <span className="text-gray-600 text-xs font-semibold min-w-[55px] text-center">
            {matches.length ? `${currentIndex + 1} / ${matches.length}` : "0 / 0"}
          </span>
          <button onClick={prev} disabled={!matches.length} className="px-2 py-1 rounded text-xs bg-gray-200 hover:bg-gray-300 cursor-pointer">↑</button>
          <button onClick={next} disabled={!matches.length} className="px-2 py-1 rounded text-xs bg-gray-200 hover:bg-gray-300 cursor-pointer">↓</button>
          <button onClick={clear} className="text-red-600 text-lg font-bold px-2 cursor-pointer">✕</button>
        </div>
      )}
    </>
  );
};

export default Navbar;

