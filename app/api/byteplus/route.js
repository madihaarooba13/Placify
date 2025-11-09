import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt?.trim()) {
      return NextResponse.json(
        { text: "Prompt cannot be empty." },
        { status: 400 }
      );
    }

    // BytePlus API endpoint
    const host = "open.byteplusapi.com";
    const region = process.env.BYTEPLUS_Region;
    const service = "byteplus";
    const action = "GenerateText";
    const version = "2023-08-01";
    const url = `https://${host}/?Action=${action}&Version=${version}`;

    // Request body
    const body = {
      Model: "ep-20231130151236-vog1i", // you can replace with your own model ID
      Input: { Text: prompt },
    };

    const bodyStr = JSON.stringify(body);

    // Step 1: Create hashed payload
    const hashedPayload = crypto.createHash("sha256").update(bodyStr).digest("hex");

    // Step 2: Create canonical request
    const canonicalRequest = [
      "POST",
      "/",
      `Action=${action}&Version=${version}`,
      `content-type:application/json\nhost:${host}\n`,
      "content-type;host",
      hashedPayload,
    ].join("\n");

    const hashedCanonicalRequest = crypto.createHash("sha256").update(canonicalRequest).digest("hex");

    // Step 3: String to sign
    const algorithm = "HMAC-SHA256";
    const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const shortDate = now.slice(0, 8);
    const credentialScope = `${shortDate}/${region}/${service}/request`;

    const stringToSign = [
      algorithm,
      now,
      credentialScope,
      hashedCanonicalRequest,
    ].join("\n");

    // Step 4: Derive signing key
    const kDate = crypto
      .createHmac("sha256", "TC3" + process.env.BYTEPLUS_SecretAccessKey)
      .update(shortDate)
      .digest();
    const kRegion = crypto.createHmac("sha256", kDate).update(region).digest();
    const kService = crypto.createHmac("sha256", kRegion).update(service).digest();
    const kSigning = crypto.createHmac("sha256", kService).update("request").digest();

    const signature = crypto.createHmac("sha256", kSigning).update(stringToSign).digest("hex");

    // Step 5: Authorization header
    const authorization = `${algorithm} Credential=${process.env.BYTEPLUS_AccessKeyId}/${credentialScope}, SignedHeaders=content-type;host, Signature=${signature}`;

    // Step 6: Send request
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Host: host,
        Authorization: authorization,
        "X-Date": now,
        "X-Region": region,
        "X-Service": service,
      },
      body: bodyStr,
    });

    const data = await response.json();
    console.log("BytePlus response:", data);

    const aiText = data?.Result?.Output?.Text || "No response from AI.";

    return NextResponse.json({ text: aiText });
  } catch (err) {
    console.error("BytePlus API error:", err);
    return NextResponse.json({ text: "Server error. Please try again." }, { status: 500 });
  }
}
