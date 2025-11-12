import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";

export async function POST(req) {
  await connectDB();
  try {
    const body = await req.json();
    const { userId, updatedSkills } = body;

    const profile = await SkillProfile.findOne({ userId });
    if (!profile)
      return NextResponse.json(
        { success: false, message: "Profile not found" },
        { status: 404 }
      );

    // Split updated skills into soft + tech by keyword
    const soft = updatedSkills.filter((s) =>
      ["Communication", "Confidence", "Teamwork", "Leadership", "Problem Solving", "Attitude"].includes(s.name)
    );
    const tech = updatedSkills.filter(
      (s) => !["Communication", "Confidence", "Teamwork", "Leadership", "Problem Solving", "Attitude"].includes(s.name)
    );

    profile.softSkills = soft;
    profile.techSkills = tech;
    profile.lastUpdated = new Date();

    await profile.save();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
