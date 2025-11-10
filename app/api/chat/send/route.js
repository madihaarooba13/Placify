import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import Chat from "@/models/Chat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    await connectDB();
    const { to, message } = await req.json();

    const chat = await Chat.create({
      from: session.user.email,
      to,
      message,
    });

    return NextResponse.json({ success: true, chat });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
