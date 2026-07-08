import { NextResponse } from "next/server";
import { verifyToken, JWT_CONFIG } from "@/lib/auth";

export async function GET(req) {
  try {
    // Ambil cookie manual dari header (cara terbaru yg work di Next.js 15/16)
    const cookieHeader = req.headers.get("cookie") || "";
    const tokenMatch = cookieHeader.match(
      new RegExp(`${JWT_CONFIG.cookieName}=([^;]+)`)
    );

    const token = tokenMatch ? tokenMatch[1] : null;

    if (!token) {
      return NextResponse.json(
        { success: false, user: null, message: "No token found" },
        { status: 401 }
      );
    }

    const session = await verifyToken(token);

    if (!session) {
      return NextResponse.json(
        { success: false, user: null, message: "Invalid token" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: session.id,
        nama: session.nama,
        email: session.email,
        role: session.role,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, user: null, message: err.message },
      { status: 500 }
    );
  }
}
