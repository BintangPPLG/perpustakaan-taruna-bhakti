"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  User as UserIcon,
  BookOpen,
  GraduationCap,
  Shield,
  LogOut,
  ChevronDown,
  History,
} from "lucide-react";

interface UserProps {
  user: {
    nama?: string;
    email?: string;
    role?: string;
  } | null;
}

export default function UserNavbar({ user }: UserProps) {
  const [showProfile, setShowProfile] = useState(false);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      localStorage.removeItem("user");
      document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      window.location.href = "/";
    } catch (error) {
      localStorage.removeItem("user");
      document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      window.location.href = "/";
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/dashboard/user/search?query=${encodeURIComponent(search.trim())}`);
  };

  const getInitials = (nama?: string) => {
    if (!nama) return "TB";
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* LEFT: LOGO */}
          <Link href="/dashboard/user" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 bg-white p-1 shadow-2xs group-hover:scale-105 transition-transform">
              <Image
                src="/logo-taruna.jpg"
                alt="Logo SMK Taruna Bhakti"
                fill
                sizes="40px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                Perpustakaan TB
              </span>
              <span className="text-[11px] font-medium text-blue-600">
                Portal Siswa &amp; Guru
              </span>
            </div>
          </Link>

          {/* CENTER: SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center flex-1 max-w-md mx-6"
          >
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari buku, modul, penulis..."
                className="w-full pl-9 pr-20 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Cari
              </button>
            </div>
          </form>

          {/* RIGHT: USER MENU */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all text-slate-700"
              aria-label="Menu akun pengguna"
            >
              <div className="w-9 h-9 rounded-lg bg-blue-700 text-white flex items-center justify-center font-semibold text-xs shadow-xs">
                {getInitials(user?.nama)}
              </div>
              <div className="hidden md:flex flex-col text-left">
                <span className="text-xs font-medium text-slate-900 truncate max-w-[120px]">
                  {user?.nama ?? "Pengguna"}
                </span>
                <span className="text-[10px] text-blue-600 uppercase font-semibold">
                  {user?.role ?? "Siswa"}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* DROPDOWN MENU */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-scale-up">
                
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-xs font-semibold text-slate-900 truncate">
                    {user?.nama ?? "Pengguna"}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {user?.email ?? ""}
                  </p>
                  <span className="inline-block mt-2 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded text-[10px] font-semibold uppercase">
                    Peran: {user?.role ?? "siswa"}
                  </span>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard/user/profile"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors"
                    onClick={() => setShowProfile(false)}
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    <span>Profil Saya</span>
                  </Link>

                  <Link
                    href="/dashboard/user/history"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors"
                    onClick={() => setShowProfile(false)}
                  >
                    <History className="w-4 h-4 text-slate-400" />
                    <span>Riwayat Peminjaman</span>
                  </Link>

                  {user?.role === "guru" && (
                    <Link
                      href="/dashboard/teacher"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors"
                      onClick={() => setShowProfile(false)}
                    >
                      <GraduationCap className="w-4 h-4 text-slate-400" />
                      <span>Dashboard Guru</span>
                    </Link>
                  )}

                  {user?.role === "admin" && (
                    <Link
                      href="/dashboard/admin"
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors"
                      onClick={() => setShowProfile(false)}
                    >
                      <Shield className="w-4 h-4 text-slate-400" />
                      <span>Dashboard Admin</span>
                    </Link>
                  )}
                </div>

                <div className="pt-1 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-colors text-left font-medium"
                  >
                    <LogOut className="w-4 h-4 text-red-500" />
                    <span>Keluar Akun</span>
                  </button>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

      {showProfile && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowProfile(false)}
        />
      )}
    </nav>
  );
}
