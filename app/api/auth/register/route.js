import { db } from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req) {
  try {
    const { nama, email, password } = await req.json();

    // Validasi input
    if (!nama || !email || !password) {
      return Response.json(
        { success: false, message: "Semua field wajib diisi!" },
        { status: 400 }
      );
    }

    // Validasi format email sederhana
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Format email tidak valid!" },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const [existingUsers] = await db.execute(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existingUsers.length > 0) {
      return Response.json(
        { success: false, message: "Email sudah terdaftar!" },
        { status: 400 }
      );
    }

    // Hash password
    const hash = await bcrypt.hash(password, 10);

    // Insert ke database dengan role default = murid
    await db.execute(
      "INSERT INTO users (nama, email, password, role) VALUES (?, ?, ?, 'murid')",
      [nama, email, hash]
    );

    return Response.json(
      { success: true, message: "Registrasi berhasil! Silakan login." },
      { status: 201 }
    );

  } catch (error) {
    console.error("Register error:", error);
    
    // Error message yang lebih user-friendly
    let errorMessage = "Terjadi kesalahan pada server";
    
    if (error.code === "ECONNREFUSED") {
      errorMessage = "Database tidak dapat diakses. Pastikan MySQL sudah berjalan!";
    } else if (error.code === "ER_BAD_DB_ERROR") {
      errorMessage = "Database tidak ditemukan. Pastikan database 'perpustakaan_tb' sudah dibuat!";
    } else if (error.code === "ER_ACCESS_DENIED_ERROR") {
      errorMessage = "Akses database ditolak. Periksa kredensial database!";
    } else if (error.code === "ER_NO_SUCH_TABLE") {
      errorMessage = "Tabel users tidak ditemukan. Jalankan script database.sql terlebih dahulu!";
    } else if (error.code === "ER_DUP_ENTRY") {
      errorMessage = "Email sudah terdaftar!";
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return Response.json(
      {
        success: false,
        message: errorMessage,
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
