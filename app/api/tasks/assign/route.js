// import { NextResponse } from "next/server";
// import connectDB from "@/db/createDB";
// import SkillProfile from "@/models/SkillProfile";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const session = await getServerSession(authOptions);
//     if (!session || session.user.role !== "teacher") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const body = await req.json();
//     const {
//       email,
//       skill,
//       title,
//       description,
//       type,
//       attachment,
//       dueDate,
//       quiz,
//     } = body;

//     if (!email || !skill || !title) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // Find or create profile for student
//     let profile = await SkillProfile.findOne({ userId: email });
//     if (!profile) {
//       profile = new SkillProfile({ userId: email });
//     }

//     // ✅ Handle Assignment vs Quiz
//     if (type === "quiz") {
//       profile.tasks.push({
//         skill,
//         title,
//         type: "quiz",
//         quiz: quiz || [],
//         assignedAt: new Date(),
//         completed: false,
//       });
//     } else {
//       profile.tasks.push({
//         skill,
//         title,
//         description: description || "",
//         attachment: attachment || "",
//         dueDate: dueDate || "",
//         type: "assignment",
//         assignedAt: new Date(),
//         completed: false,
//       });
//     }

//     await profile.save();

//     console.log("✅ Saved task for:", email);
//     console.log("📎 Attachment:", attachment);
//     console.log("📅 Due Date:", dueDate);

//     return NextResponse.json({
//       success: true,
//       message: "Task saved successfully!",
//     });
//   } catch (error) {
//     console.error("❌ Task Assign Error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    await connectDB();
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      email,
      skill,
      title,
      description,
      attachment,
      type,
      dueDate,
      quiz,
    } = body;

    if (!email || !skill || !title) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    let profile = await SkillProfile.findOne({ userId: email });
    if (!profile) profile = new SkillProfile({ userId: email });

    if (type === "quiz") {
      console.log("🧩 Saving quiz:", quiz);
      profile.quizzes.push({
        skill,
        title,
        type: "quiz",
        quiz: Array.isArray(quiz) ? quiz : [],
        assignedAt: new Date(),
        completed: false,
      });
      console.log(
        `✅ Quiz saved for ${email} with ${quiz?.length || 0} questions`
      );
    } else {
      profile.tasks.push({
        skill,
        title,
        description: description || "",
        type: "assignment",
        attachment: attachment || "",
        dueDate: dueDate || "",
        assignedAt: new Date(),
        completed: false,
      });
      console.log(`✅ Assignment saved for ${email}`);
    }

    await profile.save();
    return NextResponse.json({ success: true, message: "Task/Quiz assigned!" });
  } catch (err) {
    console.error("❌ Error assigning task/quiz:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
