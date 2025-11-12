// import { NextResponse } from "next/server";
// import connectDB from "@/db/createDB";
// import SkillProfile from "@/models/SkillProfile";
// import User from "@/models/User";

// export async function GET() {
//   await connectDB();

//   try {
//     const profiles = await SkillProfile.find({});

//     const students = await Promise.all(
//       profiles.map(async (profile) => {
//         const user = await User.findOne({ email: profile.userId });

//         // 🎯 Calculate analytics
//         const totalTasks = profile.tasks.length || 0;
//         const completedTasks = profile.tasks.filter((t) => t.completed).length;
//         const taskCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

//         const totalQuizzes = profile.quizzes.length || 0;
//         let totalScore = 0;
//         let attempts = 0;
//         profile.quizzes.forEach((quiz) => {
//           quiz.attempts.forEach((a) => {
//             totalScore += a.score;
//             attempts++;
//           });
//         });
//         const avgScore = attempts > 0 ? (totalScore / attempts).toFixed(1) : 0;

//         return {
//           username: user?.username || "Unnamed Student",
//           email: profile.userId,
//           enrollment: user?.enrollment || "N/A",
//           branch: user?.branch || "N/A",
//           college: user?.college || "N/A",
//           tasks: profile.tasks || [],
//           quizzes: profile.quizzes || [],
//           insights: {
//             taskCompletion,
//             avgScore,
//           },
//         };
//       })
//     );

//     return NextResponse.json({ students });
//   } catch (error) {
//     console.error("🔥 Error fetching performance data:", error);
//     return NextResponse.json(
//       { error: "Failed to load performance data" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";
import User from "@/models/User";

export async function GET() {
  await connectDB();

  try {
    const profiles = await SkillProfile.find({});

    const students = await Promise.all(
      profiles.map(async (profile) => {
        const user = await User.findOne({ email: profile.userId });

        // ✅ Calculate task & quiz analytics
        const totalTasks = profile.tasks.length || 0;
        const completedTasks = profile.tasks.filter((t) => t.completed).length;
        const taskCompletion = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        const totalQuizzes = profile.quizzes.length || 0;
        let totalScore = 0;
        let attempts = 0;
        profile.quizzes.forEach((quiz) => {
          quiz.attempts.forEach((a) => {
            totalScore += a.score;
            attempts++;
          });
        });
        const avgScore = attempts > 0 ? (totalScore / attempts).toFixed(1) : 0;

        return {
          username: user?.username || "Unnamed Student",
          email: profile.userId,
          enrollment: user?.enrollment || "N/A",
          branch: user?.branch || "N/A",
          college: user?.college || "N/A",

          // ✅ Include all task + submission info
          tasks: profile.tasks.map((t) => ({
            title: t.title,
            skill: t.skill,
            completed: t.completed,
            submission: t.submission || "",
            submittedAt: t.submittedAt || null,
          })),

          // ✅ Include quiz info as before
          quizzes: profile.quizzes.map((q) => ({
            title: q.title,
            skill: q.skill,
            completed: q.completed,
            attempts: q.attempts || [],
          })),

          insights: {
            taskCompletion,
            avgScore,
          },
        };
      })
    );

    return NextResponse.json({ students });
  } catch (error) {
    console.error("🔥 Error fetching performance data:", error);
    return NextResponse.json(
      { error: "Failed to load performance data" },
      { status: 500 }
    );
  }
}
