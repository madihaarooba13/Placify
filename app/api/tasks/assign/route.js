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
    const { email, skill, title } = await req.json();

    const profile = await SkillProfile.findOne({ userId: email });
    if (!profile)
      return NextResponse.json({ error: "Student not found" }, { status: 404 });

    profile.tasks.push({ skill, title, completed: false });
    await profile.save();

    return NextResponse.json({ success: true, profile });
  } catch (err) {
    console.error("Task assign error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
