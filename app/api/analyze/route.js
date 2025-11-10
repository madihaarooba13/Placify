// app/api/analyze/route.js
import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import SkillProfile from "@/models/SkillProfile";
import { computeFinalScore } from "@/lib/score";

export async function POST(req) {
  try {
    const { userId, message } = await req.json();
    if (!userId || !message) return NextResponse.json({ error: "Missing data" }, { status: 400 });

    // Call OpenRouter (DeepSeek free)
    const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          {
            role: "system",
            content: `
You are an evaluator for a placement platform (Placify).
Analyze the student's message and rate skills 0-100. Output ONLY JSON:

{
  "soft": {
    "Communication": number,
    "Confidence": number,
    "Teamwork": number,
    "Leadership": number,
    "Problem-Solving": number,
    "Attitude": number
  },
  "tech": {
    "Data Structures & Algorithms": number,
    "Web Development": number,
    "Database Management": number,
    "AI / Machine Learning": number
  },
  "feedback": "one-line summary"
}
If a skill is not reflected, return 50 for that skill.
            `.trim(),
          },
          { role: "user", content: message },
        ],
        max_tokens: 400,
        temperature: 0.3,
      }),
    });

    const data = await aiRes.json();
    let parsed;
    try {
      parsed = JSON.parse(data?.choices?.[0]?.message?.content?.trim() || "{}");
    } catch {
      parsed = {
        soft: {
          Communication: 60, Confidence: 60, Teamwork: 50, Leadership: 50, "Problem-Solving": 55, Attitude: 60,
        },
        tech: {
          "Data Structures & Algorithms": 50, "Web Development": 50, "Database Management": 50, "AI / Machine Learning": 50,
        },
        feedback: "Neutral tone detected.",
      };
    }

    await connectDB();
    const existing = await SkillProfile.findOne({ userId });

    // prepare arrays with merge/update
    const ensureSoft = (arr = []) => {
      const names = Object.keys(parsed.soft || {});
      const byName = new Map(arr.map((s) => [s.name, s]));
      const out = names.map((name) => {
        const old = byName.get(name) || { name, aiScore: 0, teacherScore: 0, taskScore: 0, tips: [] };
        const aiScore = parsed.soft[name] ?? old.aiScore ?? 0;
        const merged = {
          ...old,
          name,
          aiScore,
          feedback: parsed.feedback || old.feedback || "",
          tips:
            old.tips?.length
              ? old.tips
              : [
                  "Practice daily 10 mins.",
                  "Avoid filler words.",
                  "Reflect with short recordings.",
                ],
        };
        return { ...merged, finalScore: computeFinalScore(merged) };
      });
      return out;
    };

    const ensureTech = (arr = []) => {
      const names = Object.keys(parsed.tech || {});
      const byName = new Map(arr.map((s) => [s.name, s]));
      const out = names.map((name) => {
        const old = byName.get(name) || { name, aiScore: 0, teacherScore: 0, taskScore: 0, goals: [], project: "" };
        const aiScore = parsed.tech[name] ?? old.aiScore ?? 0;
        const merged = {
          ...old,
          name,
          aiScore,
          project: old.project || "Updated via AI analysis",
          goals: old.goals?.length ? old.goals : ["Practice weekly", "Build a mini project"],
          feedback: parsed.feedback || old.feedback || "",
        };
        return { ...merged, finalScore: computeFinalScore(merged) };
      });
      return out;
    };

    if (!existing) {
      const doc = await SkillProfile.create({
        userId,
        softSkills: ensureSoft(),
        techSkills: ensureTech(),
        lastUpdated: Date.now(),
      });
      return NextResponse.json({ success: true, data: doc });
    }

    // merge into existing doc
    const mergedSoft = ensureSoft(existing.softSkills);
    const mergedTech = ensureTech(existing.techSkills);

    existing.softSkills = mergedSoft;
    existing.techSkills = mergedTech;
    existing.lastUpdated = Date.now();
    await existing.save();

    return NextResponse.json({ success: true, data: existing });
  } catch (e) {
    console.error("POST /api/analyze error", e);
    return NextResponse.json({ error: "Analyzer failed" }, { status: 500 });
  }
}
