"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, LogIn, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
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
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
        }

        setTimeout(() => {
          if (data.user?.role === "admin") {
            window.location.href = "/dashboard/admin";
          } else if (data.user?.role === "petugas") {
            window.location.href = "/dashboard/teacher";
          } else {
            window.location.href = "/dashboard/user";
          }
        }, 300);
      } else {
        setError(data.message || "Email atau password tidak sesuai!");
        setLoading(false);
      }
    } catch (err) {
      setError("Gagal terhubung ke server. Pastikan koneksi dan database aktif.");
      console.error("Login error:", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-md p-8 sm:p-10 animate-fade-in-up">
        
        {/* BACK LINK */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-700 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Kembali ke Beranda</span>
        </Link>

        {/* LOGO & HEADING */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative w-16 h-16 rounded-2xl bg-white border border-slate-200 p-1.5 shadow-xs mb-3">
            <Image
              src="/logo-taruna.jpg"
              alt="Logo SMK Taruna Bhakti"
              fill
              sizes="64px"
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-blue-700">
            Perpustakaan Digital
          </span>
          <h1 className="text-xl font-semibold text-slate-900 mt-1">
            SMK Taruna Bhakti Depok
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Silakan masuk dengan akun terdaftar untuk mengakses koleksi
          </p>
        </div>

        {/* ERROR ALERT */}
        {error && (
          <div className="mb-6 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* EMAIL */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Alamat Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Mail className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@smktarunabhakti.net"
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-medium text-slate-700">
                Kata Sandi
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Lock className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? "Sembunyikan sandi" : "Lihat sandi"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 px-4 bg-blue-700 hover:bg-blue-800 active:scale-98 text-white rounded-xl text-sm font-medium shadow-xs hover:shadow transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4" />
                <span>Masuk Akun</span>
              </>
            )}
          </button>
        </form>

        {/* REGISTER FOOTNOTE */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-600">
          <span>Belum memiliki akun perpustakaan? </span>
          <Link
            href="/register"
            className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
          >
            Daftar Sekarang
          </Link>
        </div>

      </div>
    </div>
  );
}
