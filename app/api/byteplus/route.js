import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt || prompt.trim() === "") {
      return NextResponse.json({ text: "Prompt cannot be empty." }, { status: 400 });
    }

    const body = {
      ModelId: "text-bison-001",
      Text: prompt,
      MaxTokens: 300,
      Temperature: 0.7
    };

    // URL with mandatory Action and Version
    const url = `https://open.byteplusapi.com/v1/text/generate?Action=GenerateText&Version=2023-08-01`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": process.env.BYTEPLUS_API_KEY,
        "X-Region": process.env.BYTEPLUS_Region
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();
    console.log("BytePlus response:", data);

    const aiText = data.Result?.Text || "No response from AI";

    return NextResponse.json({ text: aiText });

  } catch (err) {
    console.error("BytePlus API error:", err);
    return NextResponse.json({ text: "Server error. Please try again." }, { status: 500 });
  }
}
