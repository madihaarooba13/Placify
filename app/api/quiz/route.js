// export async function POST(req) {
//   await connectDB();
//   try {
//     const body = await req.json();

//     const { userId, title, skill } = body;

//     const profile = await SkillProfile.findOne({ userId });
//     if (!profile) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const newQuiz = {
//       title,
//       skill,
//       quiz: [
//         {
//           question: "Sample Question?",
//           options: ["A", "B", "C", "D"],
//           correctAnswer: "A",
//         },
//       ],
//     };

//     profile.quizzes.push(newQuiz);
//     await profile.save();

//     const created = profile.quizzes[profile.quizzes.length - 1];
//     return NextResponse.json({ success: true, quizId: created._id });
//   } catch (err) {
//     console.error("Error adding quiz:", err);
//     return NextResponse.json({ error: "Failed to add quiz" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";

export async function GET(req, { params }) {
  await connectDB();

  try {
    const { id } = params;
    console.log("📘 [API] Trying to fetch quiz ID:", id);

    // 🔍 Find profile containing this quiz ID
    const profile = await SkillProfile.findOne({ "quizzes._id": id });

    if (!profile) {
      console.log("❌ No SkillProfile found for quiz ID:", id);
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    // 🎯 Extract quiz by ID
    const quiz = profile.quizzes.id(id);
    if (!quiz) {
      console.log("⚠️ Quiz found in profile but could not extract quiz data");
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    console.log("✅ Quiz found successfully:", quiz.title);
    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("🔥 Error fetching quiz:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
