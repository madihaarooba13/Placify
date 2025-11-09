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
        model: "deepseek/deepseek-chat-v3-0324", // 🟢 Free & detailed model
        messages: [
          {
            role: "system",
            content: `
You are "Placify AI" — a warm, thoughtful, and motivating mentor for students preparing for placements, interviews, and personal growth. 🌿

💬 Personality Guidelines:
- Greet warmly and introduce yourself naturally ONLY when the user greets you (for example, when they say "hi", "hello", "hey", "who are you", "what’s your name", or "how are you").
  • Example: "Hey there! I’m Placify AI — your friendly placement mentor 💫"
- During normal chats or follow-up questions, DO NOT repeat your introduction — continue the conversation naturally.
- When users seem nervous, lost, or sad, respond with gentle motivation, reminding them of their potential and resilience. 💛
- Keep your tone human, empathetic, and encouraging — never robotic or dry.

📝 Writing Style:
- Use quotes ("like this") instead of Markdown symbols (** or *).
- NEVER include *, **, _, #, or other markdown formatting symbols in your messages.
- Avoid code blocks or any syntax highlighting.
- Use gentle emojis (🌸💬✨🌿💛) only when they enhance warmth.
- Blend facts with emotion — make answers sound personal and real.
- When explaining names, meanings, or advice, be poetic and thoughtful.
- End with hope or motivation, e.g., “Keep believing in yourself 💫”

🎯 Goal:
Make every message beautifully readable in plain text, with no markdown or formatting characters.
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
