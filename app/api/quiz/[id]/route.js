import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";

export async function GET(req, context) {
  await connectDB();

  try {
    // ✅ FIXED — unwrap params promise
    const { id } = await context.params;
    console.log("🧩 Step 1: Received quiz ID param =", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.log("❌ Invalid ObjectId format:", id);
      return NextResponse.json({ error: "Invalid quiz ID" }, { status: 400 });
    }

    const objectId = new mongoose.Types.ObjectId(id);
    console.log("🧩 Step 2: Converted to ObjectId =", objectId);

    const allProfiles = await SkillProfile.find();
    console.log("🧩 Step 3: Total profiles in DB =", allProfiles.length);
    allProfiles.forEach((p, i) => {
      const quizIds = p.quizzes.map((q) => q._id.toString());
      console.log(`📚 Profile[${i}] (${p.userId}) → quizzes:`, quizIds);
    });

    const profile = await SkillProfile.findOne({ "quizzes._id": objectId });
    console.log("🧩 Step 4: Profile found? =", !!profile);

    if (!profile) {
      console.log("❌ No SkillProfile contains quiz ID:", id);
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    const quiz = profile.quizzes.id(objectId);
    console.log("🧩 Step 5: Quiz extracted? =", !!quiz);

    if (!quiz) {
      console.log("⚠️ Could not extract quiz even though profile was found");
      return NextResponse.json({ error: "Quiz not found" }, { status: 404 });
    }

    console.log("✅ Step 6: Successfully found quiz:", quiz.title);
    return NextResponse.json({ quiz });
  } catch (error) {
    console.error("🔥 Fatal error fetching quiz:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
