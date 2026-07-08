import { NextResponse } from "next/server";
import { verifyToken, JWT_CONFIG } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req) {
  try {
    // Get token from cookie
    const cookieHeader = req.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(
      new RegExp(`${JWT_CONFIG.cookieName}=([^;]+)`)
    );

    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Tidak terautentikasi" },
        { status: 401 }
      );
    }

    // Verify token
    const session = await verifyToken(token);

    if (!session || !session.id) {
      return NextResponse.json(
        { success: false, message: "Token tidak valid" },
        { status: 401 }
      );
    }

    // Get nama from request body
    const body = await req.json();
    const { nama } = body;

    if (!nama || !nama.trim()) {
      return NextResponse.json(
        { success: false, message: "Nama tidak boleh kosong" },
        { status: 400 }
      );
    }

    // Update nama di database
    await db.execute(
      "UPDATE users SET nama = ? WHERE id = ?",
      [nama.trim(), session.id]
    );

    return NextResponse.json({
      success: true,
      message: "Nama berhasil diperbarui",
      user: {
        id: session.id,
        nama: nama.trim(),
        email: session.email,
        role: session.role,
      },
    });
  } catch (error) {
    console.error("Error updating name:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Terjadi kesalahan saat memperbarui nama",
      },
      { status: 500 }
    );
  }
}












