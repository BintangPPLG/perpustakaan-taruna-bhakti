import { db } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { nama, email, password } = body;

    if (!nama || !email || !password) {
      return new Response(JSON.stringify({ message: "Data tidak lengkap" }), {
        status: 400,
      });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Insert ke database
    await db.execute(
      "INSERT INTO users (nama, email, password) VALUES (?, ?, ?)",
      [nama, email, hashed]
    );

    return new Response(JSON.stringify({ message: "Registrasi berhasil" }), {
      status: 201,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
}
