"use client";
import React from "react";
import {
  BookOpen,
  Brain,
  Trophy,
  CheckCircle2,
  Target,
  Clock,
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function PlacementPage() {
  const { data: session } = useSession();

  // 👇 dynamic link & text based on login
  const loginLink = session ? "/dashboard" : "/login";
  const loginText = session ? "Go to Dashboard" : "Login to Continue";

  return (
    <div className="min-h-screen bg-white text-black mt-26">
      {/* Header / Hero Section */}
      <div className="bg-gradient-to-r from-sky-100 to-sky-200 py-16 text-center shadow-sm">
        <h1 className="text-4xl md:text-5xl font-bold text-sky-800">
          Placement Preparation
        </h1>
        <p className="mt-4 text-gray-700 text-lg font-medium max-w-2xl mx-auto">
          Whether you’re just starting or already preparing, Placify helps you
          plan, learn, and grow with expert guidance and AI-powered support.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-16">
        {/* What is Placement */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4 text-sky-700">
            <Target /> What is Placement?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Placement is a bridge between your learning and your professional
            journey. Companies visit colleges to select students based on their
            technical skills, problem-solving ability, communication, and
            confidence. It is not only about <em>marks</em> — it is about how
            well you can apply what you know.
            <br />
            <br />
            <span className="font-semibold text-black">How Placify Helps:</span>
            <br />
            Placify prepares students in a structured and guided manner. We help
            you learn Data Structures & Algorithms in a planned way, revise
            important CS subjects, build real-world projects, track your growth,
            and practice mock interviews — all in one place.
          </p>
        </section>

        {/* 🌟 What You’ll Get After Login */}
        <section className="bg-sky-50 py-14 px-6 rounded-xl shadow-sm">
          <h2 className="text-2xl font-semibold text-center mb-8 text-sky-700">
            What You’ll Get After Login ✨
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-center">
            {[
              {
                icon: "📊",
                title: "Personal Dashboard",
                desc: "Track your growth, skills, and placement readiness with real-time analytics.",
              },
              {
                icon: "🤖",
                title: "AI Chat Mentor",
                desc: "Get instant help with DSA, Resume, and Interview prep anytime.",
              },
              {
                icon: "👩‍🏫",
                title: "Teacher Feedback",
                desc: "Receive direct insights and improvement guidance from mentors.",
              },
              {
                icon: "📝",
                title: "Daily Practice Tasks",
                desc: "Improve daily with curated questions, assignments, and challenges.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow hover:shadow-md transition duration-300"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-1 text-sky-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What You Need to Prepare */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6 text-sky-700">
            <Brain /> What You Need to Prepare
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <BookOpen className="w-8 h-8 text-sky-700 mb-3" />
              <h3 className="font-semibold mb-2 text-sky-800">
                DSA & Problem Solving
              </h3>
              <p className="text-gray-600 text-sm">
                Arrays, Strings, Trees, Graphs, Dynamic Programming — practice
                is the key.
              </p>
            </div>

            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <Trophy className="w-8 h-8 text-sky-700 mb-3" />
              <h3 className="font-semibold mb-2 text-sky-800">
                Core CS Subjects
              </h3>
              <p className="text-gray-600 text-sm">
                DBMS, OS, OOP, CN — asked in{" "}
                <em>almost every technical interview</em>.
              </p>
            </div>

            <div className="border rounded-xl p-6 shadow-sm hover:shadow-md transition">
              <CheckCircle2 className="w-8 h-8 text-sky-700 mb-3" />
              <h3 className="font-semibold mb-2 text-sky-800">
                Projects & GitHub
              </h3>
              <p className="text-gray-600 text-sm">
                Projects show your <em>real practical skills</em> — Placify
                helps plan and build them.
              </p>
            </div>
          </div>
        </section>

        {/* How to Prepare */}
        <section>
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-6 text-sky-700">
            <Clock /> How to Prepare
          </h2>

          <div className="space-y-4 text-gray-700 text-[15px]">
            <p>
              ✅ Start solving DSA daily for 1 hour consistently — not all in one
              day.
            </p>
            <p>✅ Make notes of important CS topics and revise weekly.</p>
            <p>
              ✅ Build <strong>2 confident projects</strong> and explain them
              clearly.
            </p>
            <p>
              ✅ Practice mock interviews to improve communication and
              confidence.
            </p>
          </div>
        </section>

        {/* Call to Action (with session logic) */}
        <section className="bg-gradient-to-r from-sky-500 to-sky-700 text-white text-center py-16 rounded-xl shadow-lg mt-16">
          <h2 className="text-3xl font-semibold mb-4">
            Start Your Placement Journey 🚀
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/90">
            {session
              ? "You're already logged in! Continue your personalized preparation below."
              : "Log in to Placify and unlock your personalized dashboard. Get AI-based support, expert feedback from teachers, and daily placement practice — all in one place."}
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href={loginLink}
              className="bg-white text-sky-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            >
              {loginText}
            </a>
            <a
              href="/ai-chatbot"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-sky-600 transition-all duration-300"
            >
              Explore AI Chatbot
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
