import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import SkillProfile from "@/models/SkillProfile";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "teacher") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    await connectDB();
    const { email, skillType, skillName, teacherScore, feedback } =
      await req.json();

    let profile = await SkillProfile.findOne({ userId: email });
    if (!profile) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    const skillSet =
      skillType === "soft" ? profile.softSkills : profile.techSkills;
    const skill = skillSet.find((s) => s.name === skillName);

    if (skill) {
      skill.teacherScore = teacherScore;
      skill.finalScore = Math.round((skill.aiScore + teacherScore) / 2);
      skill.feedback = feedback || skill.feedback;
    }

    await profile.save();

    return NextResponse.json({ success: true, profile });
  } catch (err) {
    console.error("Teacher update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
