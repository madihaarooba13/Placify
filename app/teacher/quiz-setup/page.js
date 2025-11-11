"use client";
import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function QuizSetupPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentEmail = searchParams.get("student");

  const [skill, setSkill] = useState("");
  const [numQuestions, setNumQuestions] = useState(1);
  const [questionType, setQuestionType] = useState("mcq");
  const [questions, setQuestions] = useState([]);

  const handleGenerate = () => {
    const num = Math.min(Math.max(numQuestions, 1), 10); // min 1, max 10
    const newQuestions = Array.from({ length: num }, () => ({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    }));
    setQuestions(newQuestions);
  };

  const handleSaveQuiz = async () => {
    if (!skill.trim() || questions.length === 0) {
      alert("Please fill in all details!");
      return;
    }

    const payload = {
      email: studentEmail,
      skill,
      title: `Quiz on ${skill}`,
      type: "quiz",
      quiz: questions,
    };

    try {
      const res = await fetch("/api/tasks/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        alert("✅ Quiz assigned successfully!");
        router.push("/teacher/tasks");
      } else {
        alert(data.error || "Failed to assign quiz ❌");
      }
    } catch (err) {
      console.error(err);
      alert("Server error ❌");
    }
  };

  const updateQuestion = (i, field, value) => {
    const updated = [...questions];
    updated[i][field] = value;
    setQuestions(updated);
  };

  const updateOption = (i, optIdx, value) => {
    const updated = [...questions];
    updated[i].options[optIdx] = value;
    setQuestions(updated);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-sky-800 mb-4 text-center">
          Create New Quiz 🧩
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {studentEmail ? `For Student: ${studentEmail}` : "No student selected"}
        </p>

        {/* Skill Selection */}
        <label className="block text-gray-700 font-semibold mb-2">
          Select Skill/Topic
        </label>
        <select
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-sky-400"
        >
          <option value="">-- Select Skill --</option>
          <optgroup label="Soft Skills 🗣️">
            <option value="Communication">Communication</option>
            <option value="Confidence">Confidence</option>
            <option value="Teamwork">Teamwork</option>
            <option value="Leadership">Leadership</option>
            <option value="Problem Solving">Problem Solving</option>
            <option value="Attitude">Attitude</option>
          </optgroup>
          <optgroup label="Technical Skills 💻">
            <option value="Data Structures & Algorithms">
              Data Structures & Algorithms
            </option>
            <option value="Web Development">Web Development</option>
            <option value="Database Management">Database Management</option>
            <option value="AI / Machine Learning">AI / Machine Learning</option>
          </optgroup>
        </select>

        {/* Number of Questions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Number of Questions (1 - 10)
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Question Type
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-400"
            >
              <option value="mcq">MCQ (Multiple Choice)</option>
              <option value="tf">True / False</option>
              <option value="short">Short Answer</option>
            </select>
          </div>
        </div>

        <div className="flex justify-center mb-6">
          <button
            onClick={handleGenerate}
            className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
          >
            🎯 Generate Quiz Layout
          </button>
        </div>

        {/* Questions Display */}
        {questions.length > 0 && (
          <div className="mt-8 space-y-6">
            {questions.map((q, i) => (
              <div
                key={i}
                className="border border-gray-200 p-6 rounded-2xl shadow-sm"
              >
                <h3 className="text-lg font-semibold text-sky-700 mb-3">
                  Question {i + 1}
                </h3>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) =>
                    updateQuestion(i, "question", e.target.value)
                  }
                  placeholder="Enter question text..."
                  className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-3 focus:ring-2 focus:ring-sky-400"
                />

                {questionType === "mcq" && (
                  <>
                    {q.options.map((opt, idx) => (
                      <input
                        key={idx}
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          updateOption(i, idx, e.target.value)
                        }
                        placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                        className="w-full border border-gray-200 rounded-xl px-4 py-2 mb-2 focus:ring-1 focus:ring-emerald-300"
                      />
                    ))}
                    <select
                      value={q.correctAnswer}
                      onChange={(e) =>
                        updateQuestion(i, "correctAnswer", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2 focus:ring-2 focus:ring-emerald-400"
                    >
                      <option value="">Select Correct Answer</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </>
                )}

                {questionType === "tf" && (
                  <select
                    value={q.correctAnswer}
                    onChange={(e) =>
                      updateQuestion(i, "correctAnswer", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-2 focus:ring-2 focus:ring-sky-400"
                  >
                    <option value="">Select Correct Answer</option>
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                )}

                {questionType === "short" && (
                  <textarea
                    value={q.correctAnswer}
                    onChange={(e) =>
                      updateQuestion(i, "correctAnswer", e.target.value)
                    }
                    placeholder="Enter expected answer"
                    className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-sky-400"
                  />
                )}
              </div>
            ))}

            <div className="flex justify-center mt-8">
              <button
                onClick={handleSaveQuiz}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
              >
                ✅ Save & Assign Quiz
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
