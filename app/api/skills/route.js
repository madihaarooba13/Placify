// app/api/skills/route.js
import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";
import { computeFinalScore } from "@/lib/score";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    const doc = await SkillProfile.findOne({ userId });
    return NextResponse.json(doc || {});
  } catch (e) {
    console.error("GET /api/skills error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { userId, softSkills = [], techSkills = [] } = body;
    if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });

    // recompute finals defensively
    const mapWithFinal = (arr) =>
      arr.map((s) => ({
        ...s,
        finalScore: computeFinalScore(s),
      }));

    const updated = await SkillProfile.findOneAndUpdate(
      { userId },
      { softSkills: mapWithFinal(softSkills), techSkills: mapWithFinal(techSkills), lastUpdated: Date.now() },
      { upsert: true, new: true }
    );

    return NextResponse.json(updated);
  } catch (e) {
    console.error("POST /api/skills error", e);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
