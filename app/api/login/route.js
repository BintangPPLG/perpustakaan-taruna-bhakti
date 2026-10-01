import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import bcrypt from "bcrypt";
import { JWT_CONFIG } from "@/lib/auth";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const [rows] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return Response.json({ message: "Email tidak ditemukan" }, { status: 404 });
    }

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return Response.json({ message: "Password salah" }, { status: 401 });
    }

    // BUAT JWT
    const token = await new SignJWT({
      id: user.id,
      nama: user.nama,
      role: user.role,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime(JWT_CONFIG.expiresIn)
      .sign(JWT_CONFIG.key);

    // SET COOKIE
    cookies().set(JWT_CONFIG.cookieName, token, {
      httpOnly: true,
      secure: JWT_CONFIG.isProduction,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({ message: "Login berhasil", success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
