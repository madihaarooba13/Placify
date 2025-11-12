// // // import { NextResponse } from "next/server";
// // // import dbConnect from "@/lib/dbConnect";
// // // import SkillProfile from "@/models/SkillProfile";

// // // export async function POST(req) {
// // //   try {
// // //     const { quizId, userEmail, answers } = await req.json();
// // //     await dbConnect();

// // //     const profile = await SkillProfile.findOne({ "quizzes._id": quizId });
// // //     if (!profile) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });

// // //     const quiz = profile.quizzes.id(quizId);
// // //     if (!quiz) return NextResponse.json({ error: "Quiz not found" }, { status: 404 });

// // //     // ✅ calculate score
// // //     let score = 0;
// // //     quiz.quiz.forEach((q, i) => {
// // //       if (answers[i] === q.correctAnswer) score++;
// // //     });

// // //     // ✅ save attempt
// // //     quiz.attempts.push({
// // //       userEmail,
// // //       answers,
// // //       score,
// // //       submittedAt: new Date(),
// // //     });

// // //     await profile.save();

// // //     return NextResponse.json({ success: true, score });
// // //   } catch (err) {
// // //     return NextResponse.json({ error: err.message }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from "next/server";
// // import connectDB from "@/db/createDB";
// // import SkillProfile from "@/models/SkillProfile";

// // export async function POST(req) {
// //   await connectDB();

// //   try {
// //     const { userEmail, quizId, answers, score } = await req.json();

// //     if (!userEmail || !quizId) {
// //       return NextResponse.json(
// //         { error: "Missing userEmail or quizId" },
// //         { status: 400 }
// //       );
// //     }

// //     // 🔍 Find the profile containing the quiz
// //     const profile = await SkillProfile.findOne({ "quizzes._id": quizId });
// //     if (!profile) {
// //       return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
// //     }

// //     // 🎯 Get quiz from embedded quizzes array
// //     const quiz = profile.quizzes.id(quizId);
// //     if (!quiz) {
// //       return NextResponse.json(
// //         { error: "Quiz not found inside profile" },
// //         { status: 404 }
// //       );
// //     }

// //     // 🧠 Add attempt info
// //     quiz.attempts.push({
// //       userEmail,
// //       answers,
// //       score,
// //       submittedAt: new Date(),
// //     });

// //     await profile.save();

// //     console.log("✅ Quiz result saved:", { userEmail, score });

// //     return NextResponse.json({ message: "Result saved successfully ✅" });
// //   } catch (err) {
// //     console.error("❌ Error saving quiz result:", err);
// //     return NextResponse.json(
// //       { error: "Server error while saving result" },
// //       { status: 500 }
// //     );
// //   }
// // }

// import { NextResponse } from "next/server";
// import connectDB from "@/db/createDB";
// import SkillProfile from "@/models/SkillProfile";

// export async function POST(req) {
//   await connectDB();

//   try {
//     const { userEmail, quizId, answers, score } = await req.json();

//     console.log("📩 Incoming submission:", { userEmail, quizId, answers, score });

//     if (!userEmail || !quizId) {
//       return NextResponse.json(
//         { error: "Missing userEmail or quizId" },
//         { status: 400 }
//       );
//     }

//     // 🧩 Find the profile that contains this quiz
//     const profile = await SkillProfile.findOne({ "quizzes._id": quizId });
//     if (!profile) {
//       console.log("❌ No SkillProfile found for quiz ID:", quizId);
//       return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
//     }

//     // 🧩 Find the quiz within the profile
//     const quiz = profile.quizzes.id(quizId);
//     if (!quiz) {
//       console.log("❌ Quiz not found inside quizzes[] in SkillProfile");
//       return NextResponse.json({ error: "Quiz not found in profile" }, { status: 404 });
//     }

//     // ✅ Push attempt
//     quiz.attempts.push({
//       userEmail,
//       answers,
//       score,
//       submittedAt: new Date(),
//     });

//     console.log("✅ Attempt pushed successfully:", quiz.attempts.slice(-1)[0]);

//     await profile.save();
//     console.log("💾 Profile saved successfully for user:", userEmail);

//     return NextResponse.json({ message: "Result saved successfully ✅" });
//   } catch (err) {
//     console.error("❌ Error saving quiz result:", err);
//     return NextResponse.json(
//       { error: "Server error while saving result" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";

export async function POST(req) {
  await connectDB();

  try {
    // 🧩 Step 1: Get data from frontend
    const { userEmail, quizId, answers, score } = await req.json();

    console.log("📩 Incoming submission:", { userEmail, quizId, answers, score });

    if (!userEmail || !quizId) {
      return NextResponse.json(
        { error: "Missing userEmail or quizId" },
        { status: 400 }
      );
    }

    // 🧩 Step 2: Find the user profile that contains this quiz
    const profile = await SkillProfile.findOne({ "quizzes._id": quizId });

    if (!profile) {
      console.log("❌ No SkillProfile found for quiz ID:", quizId);
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    console.log("🧩 Step 3: Profile found for user:", profile.userId);

    // 🧩 Step 3: Extract the quiz object from that profile
    const quiz = profile.quizzes.id(quizId);

    if (!quiz) {
      console.log("❌ Quiz not found inside quizzes[] in SkillProfile");
      return NextResponse.json({ error: "Quiz not found inside profile" }, { status: 404 });
    }

    console.log("🧠 Step 4: Quiz title:", quiz.title);

    // 🩵 Step 5: If old quiz doesn't have 'attempts' array, fix it
    if (!quiz.attempts) {
      console.log("⚠️ 'attempts' field missing — initializing empty array");
      quiz.attempts = [];
    }

    // 🧩 Step 6: Add the new attempt entry
    const newAttempt = {
      userEmail,
      answers,
      score,
      submittedAt: new Date(),
    };

    quiz.attempts.push(newAttempt);

    console.log("✅ Step 7: Attempt pushed successfully:", newAttempt);

    // 🧩 Step 8: Save the updated profile
    await profile.save();

    console.log("💾 Step 9: Profile saved successfully for:", userEmail);

    return NextResponse.json({
      message: "Result saved successfully ✅",
      attempt: newAttempt,
    });
  } catch (err) {
    console.error("❌ Error saving quiz result:", err);
    return NextResponse.json(
      { error: "Server error while saving result" },
      { status: 500 }
    );
  }
}
