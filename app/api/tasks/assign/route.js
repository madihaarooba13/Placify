// // // // import { NextResponse } from "next/server";
// // // // import connectDB from "@/db/createDB";
// // // // import SkillProfile from "@/models/SkillProfile";
// // // // import { getServerSession } from "next-auth";
// // // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// // // // export async function POST(req) {
// // // //   try {
// // // //     await connectDB();

// // // //     const session = await getServerSession(authOptions);
// // // //     if (!session || session.user.role !== "teacher") {
// // // //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// // // //     }

// // // //     const body = await req.json();
// // // //     const {
// // // //       email,
// // // //       skill,
// // // //       title,
// // // //       description,
// // // //       type,
// // // //       attachment,
// // // //       dueDate,
// // // //       quiz,
// // // //     } = body;

// // // //     if (!email || !skill || !title) {
// // // //       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
// // // //     }

// // // //     // Find or create profile for student
// // // //     let profile = await SkillProfile.findOne({ userId: email });
// // // //     if (!profile) {
// // // //       profile = new SkillProfile({ userId: email });
// // // //     }

// // // //     // ✅ Handle Assignment vs Quiz
// // // //     if (type === "quiz") {
// // // //       profile.tasks.push({
// // // //         skill,
// // // //         title,
// // // //         type: "quiz",
// // // //         quiz: quiz || [],
// // // //         assignedAt: new Date(),
// // // //         completed: false,
// // // //       });
// // // //     } else {
// // // //       profile.tasks.push({
// // // //         skill,
// // // //         title,
// // // //         description: description || "",
// // // //         attachment: attachment || "",
// // // //         dueDate: dueDate || "",
// // // //         type: "assignment",
// // // //         assignedAt: new Date(),
// // // //         completed: false,
// // // //       });
// // // //     }

// // // //     await profile.save();

// // // //     console.log("✅ Saved task for:", email);
// // // //     console.log("📎 Attachment:", attachment);
// // // //     console.log("📅 Due Date:", dueDate);

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       message: "Task saved successfully!",
// // // //     });
// // // //   } catch (error) {
// // // //     console.error("❌ Task Assign Error:", error);
// // // //     return NextResponse.json({ error: "Server error" }, { status: 500 });
// // // //   }
// // // // }
// // // import { NextResponse } from "next/server";
// // // import connectDB from "@/db/createDB";
// // // import SkillProfile from "@/models/SkillProfile";
// // // import { getServerSession } from "next-auth";
// // // import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// // // export async function POST(req) {
// // //   try {
// // //     await connectDB();
// // //     const session = await getServerSession(authOptions);

// // //     if (!session || session.user.role !== "teacher") {
// // //       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
// // //     }

// // //     const body = await req.json();
// // //     const {
// // //       email,
// // //       skill,
// // //       title,
// // //       description,
// // //       attachment,
// // //       type,
// // //       dueDate,
// // //       quiz,
// // //     } = body;

// // //     if (!email || !skill || !title) {
// // //       return NextResponse.json(
// // //         { error: "Missing required fields" },
// // //         { status: 400 }
// // //       );
// // //     }

// // //     let profile = await SkillProfile.findOne({ userId: email });
// // //     if (!profile) profile = new SkillProfile({ userId: email });

// // //     if (type === "quiz") {
// // //       console.log("🧩 Saving quiz:", quiz);
// // //       profile.quizzes.push({
// // //         skill,
// // //         title,
// // //         type: "quiz",
// // //         quiz: Array.isArray(quiz) ? quiz : [],
// // //         assignedAt: new Date(),
// // //         completed: false,
// // //       });
// // //       console.log(
// // //         `✅ Quiz saved for ${email} with ${quiz?.length || 0} questions`
// // //       );
// // //     } else {
// // //       profile.tasks.push({
// // //         skill,
// // //         title,
// // //         description: description || "",
// // //         type: "assignment",
// // //         attachment: attachment || "",
// // //         dueDate: dueDate || "",
// // //         assignedAt: new Date(),
// // //         completed: false,
// // //       });
// // //       console.log(`✅ Assignment saved for ${email}`);
// // //     }

// // //     await profile.save();
// // //     return NextResponse.json({ success: true, message: "Task/Quiz assigned!" });
// // //   } catch (err) {
// // //     console.error("❌ Error assigning task/quiz:", err);
// // //     return NextResponse.json({ error: "Server error" }, { status: 500 });
// // //   }
// // // }
// // import { NextResponse } from "next/server";
// // import connectDB from "@/db/createDB";
// // import SkillProfile from "@/models/SkillProfile";

// // export async function POST(req) {
// //   await connectDB();
// //   try {
// //     const { email, skill, title, type, quiz } = await req.json();

// //     if (!email || !skill || !title || !quiz || quiz.length === 0) {
// //       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
// //     }

// //     const profile = await SkillProfile.findOne({ userId: email });
// //     if (!profile) {
// //       return NextResponse.json({ error: "User not found" }, { status: 404 });
// //     }

// //     // ✅ Normalize quiz structure
// //     const formattedQuiz = quiz.map((q) => ({
// //       question: q.question?.trim() || "Untitled Question",
// //       options: Array.isArray(q.options) ? q.options.filter(Boolean) : [],
// //       correctAnswer: q.correctAnswer?.trim() || "",
// //     }));

// //     const newQuiz = {
// //       skill,
// //       title,
// //       type,
// //       quiz: formattedQuiz,
// //       assignedAt: new Date(),
// //       completed: false,
// //     };

// //     profile.quizzes.push(newQuiz);
// //     await profile.save();

// //     console.log("✅ Quiz assigned successfully:", title);
// //     return NextResponse.json({ success: true });
// //   } catch (error) {
// //     console.error("❌ Error assigning quiz:", error);
// //     return NextResponse.json(
// //       { error: "Server error while assigning quiz" },
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
//     const { email, skill, title, type, description, attachment, dueDate, quiz } =
//       await req.json();

//     if (!email || !skill || !title || !type) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }

//     const profile = await SkillProfile.findOne({ userId: email });
//     if (!profile) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // ✅ Handle QUIZ type
//     if (type === "quiz") {
//       if (!quiz || quiz.length === 0) {
//         return NextResponse.json(
//           { error: "No quiz questions provided" },
//           { status: 400 }
//         );
//       }

//       const formattedQuiz = quiz.map((q) => ({
//         question: q.question?.trim() || "Untitled Question",
//         options: Array.isArray(q.options) ? q.options.filter(Boolean) : [],
//         correctAnswer: q.correctAnswer?.trim() || "",
//       }));

//       const newQuiz = {
//         skill,
//         title,
//         type: "quiz",
//         quiz: formattedQuiz,
//         assignedAt: new Date(),
//         completed: false,
//       };

//       profile.quizzes.push(newQuiz);
//       await profile.save();

//       console.log(`✅ Quiz '${title}' assigned to ${email}`);
//       return NextResponse.json({ success: true, message: "Quiz assigned!" });
//     }

//     // ✅ Handle ASSIGNMENT type
//     else if (type === "assignment") {
//       const newTask = {
//         skill,
//         title,
//         description: description || "",
//         attachment: attachment || "",
//         dueDate: dueDate || "",
//         type: "assignment",
//         assignedAt: new Date(),
//         completed: false,
//       };

//       profile.tasks.push(newTask);
//       await profile.save();

//       console.log(`✅ Assignment '${title}' assigned to ${email}`);
//       return NextResponse.json({
//         success: true,
//         message: "Assignment assigned successfully!",
//       });
//     }

//     // ❌ Unknown type
//     return NextResponse.json({ error: "Invalid task type" }, { status: 400 });
//   } catch (error) {
//     console.error("❌ Error assigning task/quiz:", error);
//     return NextResponse.json(
//       { error: "Server error while assigning task/quiz" },
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
    const {
      email,
      skill,
      title,
      type,
      description,
      attachment,
      dueDate,
      quiz,
    } = await req.json();

    // ✅ Validate required fields
    if (!email || !skill || !title || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // ✅ Find or create student SkillProfile
    let profile = await SkillProfile.findOne({ userId: email });
    if (!profile) {
      profile = new SkillProfile({
        userId: email,
        softSkills: [],
        techSkills: [],
        tasks: [],
        quizzes: [],
      });
      console.log("🆕 Created new SkillProfile for:", email);
    }

    // ✅ Handle QUIZ creation
    if (type === "quiz") {
      if (!quiz || quiz.length === 0) {
        return NextResponse.json(
          { error: "Quiz questions missing" },
          { status: 400 }
        );
      }

      // Format quiz properly
      const formattedQuiz = quiz.map((q) => ({
        question: q.question?.trim() || "Untitled Question",
        options: Array.isArray(q.options) ? q.options.filter(Boolean) : [],
        correctAnswer: q.correctAnswer?.trim() || "",
      }));

      const newQuiz = {
        skill,
        title,
        type: "quiz",
        quiz: formattedQuiz,
        assignedAt: new Date(),
        completed: false,
      };

      profile.quizzes.push(newQuiz);
      await profile.save();

      console.log(`✅ Quiz '${title}' assigned to ${email}`);
      return NextResponse.json({
        success: true,
        message: "Quiz assigned successfully!",
      });
    }

    // ✅ Handle ASSIGNMENT creation
    else if (type === "assignment") {
      const newTask = {
        skill,
        title,
        description: description || "",
        attachment: attachment || "",
        dueDate: dueDate || "",
        type: "assignment",
        assignedAt: new Date(),
        completed: false,
      };

      profile.tasks.push(newTask);
      await profile.save();

      console.log(`✅ Assignment '${title}' assigned to ${email}`);
      return NextResponse.json({
        success: true,
        message: "Assignment assigned successfully!",
      });
    }

    // ❌ Invalid type (neither quiz nor assignment)
    return NextResponse.json(
      { error: "Invalid task type specified" },
      { status: 400 }
    );
  } catch (error) {
    console.error("❌ Error assigning task/quiz:", error);
    return NextResponse.json(
      { error: "Server error while assigning task/quiz" },
      { status: 500 }
    );
  }
}
