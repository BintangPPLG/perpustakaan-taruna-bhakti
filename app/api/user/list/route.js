import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.execute(
      "SELECT id, nama, email, role FROM users ORDER BY id DESC"
    );

    return NextResponse.json({ users: rows });
  } catch (err) {
    console.error("List user error:", err);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data user." },
      { status: 500 }
    );
  }
}
