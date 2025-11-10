// app/api/tasks/complete/route.js
import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";
import { computeFinalScore } from "@/lib/score";

export async function POST(req) {
  try {
    await connectDB();
    const { userId, skillName, category = "soft", points = 5 } = await req.json();
    if (!userId || !skillName) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const doc = await SkillProfile.findOne({ userId });
    if (!doc) return NextResponse.json({ error: "Profile not found" }, { status: 404 });

    const list = category === "tech" ? doc.techSkills : doc.softSkills;
    const idx = list.findIndex((s) => s.name === skillName);
    if (idx < 0) return NextResponse.json({ error: "Skill not found" }, { status: 404 });

    const current = Number(list[idx].taskScore || 0);
    list[idx].taskScore = Math.min(100, current + Number(points));
    list[idx].finalScore = computeFinalScore(list[idx]);
    doc.lastUpdated = Date.now();
    await doc.save();

    return NextResponse.json({ success: true, data: doc });
  } catch (e) {
    console.error("POST /api/tasks/complete error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
