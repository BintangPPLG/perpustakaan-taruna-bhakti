"use client";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!nama || !email || !password) {
      setError("Semua field wajib diisi!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama, email, password }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Registrasi berhasil! Silakan login.");
        window.location.href = "/login";
      } else {
        setError(data.message || "Terjadi kesalahan saat registrasi.");
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungkan ke server. Pastikan server berjalan!");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-10 border border-blue-100">

        <Link href="/" className="text-blue-600 underline text-sm mb-6 inline-block">
          ← Kembali ke halaman utama
        </Link>

        <h2 className="text-3xl font-bold text-blue-900 mb-2">Daftar Akun</h2>
        <p className="text-gray-600 mb-8">Silakan isi data Anda untuk membuat akun baru.</p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* NAMA */}
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-blue-800">Nama Lengkap</label>
          <input
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Masukkan nama lengkap"
          />
        </div>

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-blue-800">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Masukkan email"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-blue-800">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Masukkan password"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-xl text-blue-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 transition text-white p-3 rounded-lg font-semibold shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses..." : "Daftar Akun"}
        </button>

        <p className="mt-5 text-center text-gray-700">
          Sudah punya akun?{" "}
          <Link href="/login" className="text-blue-700 font-semibold underline">
            Masuk
          </Link>
        </p>

      </div>
    </div>
  );
}
