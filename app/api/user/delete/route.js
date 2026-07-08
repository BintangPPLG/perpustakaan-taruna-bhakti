import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const users = await db.execute("SELECT * FROM users");

    return NextResponse.json({
      success: true,
      users,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data user" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "User ID wajib dikirim!" },
        { status: 400 }
      );
    }

    await db.execute("DELETE FROM users WHERE id = ?", [userId]);

    return NextResponse.json({
      success: true,
      message: "User berhasil dihapus!",
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Gagal menghapus user." },
      { status: 500 }
    );
  }
}
