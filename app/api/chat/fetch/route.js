import { NextResponse } from "next/server";
import connectDB from "@/db/createDB";
import Chat from "@/models/Chat";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Not authorized" }, { status: 401 });

    const { otherUser } = await req.json();

    await connectDB();
    const chats = await Chat.find({
      $or: [
        { from: session.user.email, to: otherUser },
        { from: otherUser, to: session.user.email },
      ],
    }).sort({ timestamp: 1 });

    return NextResponse.json(chats);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
