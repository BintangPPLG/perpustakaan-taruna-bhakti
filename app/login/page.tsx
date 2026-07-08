"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email dan password wajib diisi!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        console.log("✅ Login successful!");
        console.log("✅ User data:", data.user);
        
        // Simpan user data di localStorage sebagai fallback
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log("💾 User data saved to localStorage");
        }
        
        // Redirect berdasarkan role
        setTimeout(() => {
          console.log("🔄 Redirecting to dashboard...");
          if (data.user.role === "admin") {
            window.location.href = "/dashboard/admin";
          } else if (data.user.role === "petugas") {
            window.location.href = "/dashboard/teacher";
          } else {
            window.location.href = "/dashboard/user";
          }
        }, 300);
      } else {
        setError(data.message || "Login gagal!");
        setLoading(false);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat menghubungkan ke server. Pastikan server berjalan!");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-md border border-blue-100">

        <div className="flex flex-col items-center mb-6">
          <Image
            src="/logo-taruna.jpg"
            width={90}
            height={90}
            alt="Logo Taruna Bhakti"
            className="drop-shadow-md"
          />
          <h1 className="text-2xl font-extrabold text-blue-900 mt-4 text-center">
            Perpustakaan Digital  
            <br /> SMK Taruna Bhakti
          </h1>
        </div>

        <Link href="/" className="text-blue-600 underline text-sm mb-6 inline-block">
          ← Kembali ke halaman utama
        </Link>

        <h2 className="text-3xl font-bold text-blue-900 mb-2">Masuk</h2>
        <p className="text-gray-600 mb-8">
          Silahkan masuk untuk melanjutkan.
        </p>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mb-5 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div className="mb-5">
          <label className="block mb-1 font-semibold text-blue-800">Email</label>
          <input
            type="email"
            className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
            placeholder="Masukkan email anda"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="block mb-1 font-semibold text-blue-800">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none text-black"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-3 text-xl cursor-pointer text-blue-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {/* BUTTON LOGIN */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-700 hover:bg-blue-800 transition text-white p-3 rounded-lg font-semibold shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>

        {/* REGISTER */}
        <p className="mt-5 text-center text-gray-700">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-blue-700 font-semibold underline"
          >
            Daftar
          </Link>
        </p>

      </div>
    </div>
  );
}
