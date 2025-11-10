import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    const result = await cloudinary.api.ping();
    return NextResponse.json({ status: "✅ Cloudinary Connected", result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ status: "❌ Failed to connect", error: err.message });
  }
}
