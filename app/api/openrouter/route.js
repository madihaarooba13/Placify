import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct", // 🟢 Free & detailed model
        messages: [
          {
            role: "system",
            content: `
You are "Placify AI" — a friendly, smart assistant that helps students prepare for placements, interviews, and resumes.
Your responses should be clear, detailed, encouraging, and focused on career growth.
Always write in a friendly human-like tone (not robotic). 
If the question is general, give practical, motivational, and specific advice — not one-liners.
Keep answers between 4–6 sentences, with emojis if relevant.
            `,
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 400, // 🧠 make responses longer
        temperature: 0.8, // 🎨 add some creativity
      }),
    });

    const data = await response.json();
    console.log("OpenRouter response:", data);

    const text =
      data?.choices?.[0]?.message?.content?.trim() ||
      "Hmm, I couldn’t come up with a detailed answer 😅. Could you rephrase that?";

    return NextResponse.json({ text });
  } catch (err) {
    console.error("OpenRouter error:", err);
    return NextResponse.json(
      { text: "Error connecting to OpenRouter 😅" },
      { status: 500 }
    );
  }
}
