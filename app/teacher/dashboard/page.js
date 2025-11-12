"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TeacherDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [isAvailable, setIsAvailable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [animateFeedback, setAnimateFeedback] = useState(null);

  // ✅ Auth Check
  useEffect(() => {
    if (status === "loading") return;
    if (!session) router.push("/login");
    else if (session.user.role !== "teacher") router.push("/profile");
  }, [session, status, router]);

  // ✅ Fetch All Students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("/api/assign");
        const data = await res.json();
        setStudents(data.students || []);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleAvailabilityToggle = () => {
    setIsAvailable((prev) => !prev);
  };

  // ✅ Submit feedback + instantly update UI
  const handleRating = async (email, rating, feedbackText) => {
    if (!rating || !feedbackText.trim()) {
      alert("Please fill both rating and feedback!");
      return;
    }

    try {
      const res = await fetch("/api/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, rating, feedback: feedbackText }),
      });

      if (res.ok) {
        const date = new Date();

        // ✨ Update UI instantly
        setStudents((prev) =>
          prev.map((student) =>
            student.email === email
              ? {
                  ...student,
                  feedback: { rating, feedback: feedbackText, date },
                }
              : student
          )
        );

        // 🎇 Add glow animation for updated card
        setAnimateFeedback(email);
        setTimeout(() => setAnimateFeedback(null), 1200);

        alert("✅ Feedback submitted successfully!");
      } else {
        alert("❌ Failed to submit feedback");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  // ✅ Loading
  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center text-lg text-sky-700 font-semibold">
        Loading students...
      </div>
    );

  // ✅ Main UI
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-8 mt-32 lg:mt-22">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center mb-10 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-sky-800">
            Welcome, {session?.user?.name || "Teacher"} 👩‍🏫
          </h1>
          <p className="text-gray-600 mt-2">
            Manage student progress, guide them & track performance 🌱
          </p>
        </div>

        <button
          onClick={handleAvailabilityToggle}
          className={`mt-4 md:mt-0 px-5 py-2 rounded-xl font-semibold text-white transition ${
            isAvailable
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 hover:bg-gray-500"
          }`}
        >
          {isAvailable ? "🟢 Available for Chat" : "🔴 Mark Available"}
        </button>
      </header>

      {/* Students List */}
      <section>
        <h2 className="text-2xl font-semibold text-sky-700 mb-6">
          All Students 👩‍🎓👨‍🎓
        </h2>

        {students.length === 0 ? (
          <p className="text-gray-600 text-center">No students found yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student, idx) => (
              <div
                key={idx}
                className={`bg-white p-6 rounded-2xl shadow-md border-t-4 border-sky-400 hover:shadow-xl transition relative ${
                  animateFeedback === student.email
                    ? "ring-4 ring-green-300 ring-opacity-60"
                    : ""
                }`}
              >
                {/* 🧾 Student Info */}
                <h3 className="text-lg font-semibold text-sky-800">
                  {student.username}
                </h3>
                <p className="text-gray-600 text-sm">{student.email}</p>
                <p className="text-sm mt-1">
                  <strong>Enrollment:</strong> {student.enrollment || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Branch:</strong> {student.branch || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>CGPA:</strong> {student.cgpa || "N/A"}
                </p>

                {/* 🗒 Latest Feedback */}
                {student.feedback ? (
                  <div className="mt-3 bg-gradient-to-b from-sky-50 to-sky-100 border border-sky-200 rounded-xl p-3 transition-all duration-500">
                    <p className="text-xs text-gray-500 mb-1 font-medium">
                      Latest Feedback:
                    </p>
                    <p className="text-sm text-gray-700">
                      <strong>⭐ Rating:</strong> {student.feedback.rating}/10
                    </p>
                    <p className="text-sm text-gray-700 italic">
                      "{student.feedback.feedback}"
                    </p>
                    <p className="text-xs text-gray-400 text-right">
                      {new Date(student.feedback.date).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <p className="mt-3 text-xs text-gray-400 italic">
                    No feedback yet
                  </p>
                )}

                {/* ✏️ Feedback Form */}
                <div className="mt-4">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    placeholder="Rate (1-10)"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 text-sm focus:ring-2 focus:ring-sky-400"
                    id={`rating-${idx}`}
                  />
                  <textarea
                    rows="2"
                    placeholder="Write feedback..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-400"
                    id={`feedback-${idx}`}
                  ></textarea>
                  <button
                    onClick={() =>
                      handleRating(
                        student.email,
                        document.getElementById(`rating-${idx}`).value,
                        document.getElementById(`feedback-${idx}`).value
                      )
                    }
                    className="bg-sky-600 hover:bg-sky-700 text-white mt-3 w-full py-2 rounded-lg font-semibold transition"
                  >
                    Submit Feedback
                  </button>
                </div>

                {/* 🔍 View Details */}
                <button
                  onClick={() =>
                    router.push(`/teacher/student/${student.email}`)
                  }
                  className="mt-4 bg-sky-100 hover:bg-sky-200 text-sky-700 w-full py-2 rounded-lg font-semibold transition"
                >
                  🔍 View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
