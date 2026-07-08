import { NextResponse } from "next/server";
import { JWT_CONFIG } from "@/lib/auth";

export async function POST() {
  try {
    const response = NextResponse.json({ success: true, message: "Logout berhasil" });
    response.cookies.delete(JWT_CONFIG.cookieName);
    return response;
  } catch (error) {
    return NextResponse.json({ success: false, message: "Logout gagal" }, { status: 500 });
  }
}

