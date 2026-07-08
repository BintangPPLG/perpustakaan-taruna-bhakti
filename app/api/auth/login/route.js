import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { JWT_CONFIG } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email dan password wajib diisi!" },
        { status: 400 }
      );
    }

    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return NextResponse.json(
        { success: false, message: "Email tidak ditemukan!" },
        { status: 400 }
      );
    }

    const user = rows[0];

    let match = false;
    if (user.password && user.password.startsWith("$2")) {
      match = await bcrypt.compare(password, user.password);
    } else {
      match = password === user.password;
    }

    if (!match) {
      return NextResponse.json(
        { success: false, message: "Password salah!" },
        { status: 400 }
      );
    }

    const userRole = user.role || "murid";

    const token = await new SignJWT({
      id: user.id,
      nama: user.nama,
      email: user.email,
      role: userRole,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(JWT_CONFIG.expiresIn)
      .sign(JWT_CONFIG.key);

    const response = NextResponse.json({
      success: true,
      message: "Login berhasil!",
      role: userRole,
      user: {
        id: user.id,
        nama: user.nama,
        email: user.email,
        password: user.password, // ← supaya ditampilkan di profil
        role: userRole,
      },
    });

    response.cookies.set(JWT_CONFIG.cookieName, token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
