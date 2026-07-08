"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

    router.push(`/dashboard/user/search?query=${encodeURIComponent(search)}`);
  };

  const getInitials = (nama?: string) => {
    if (!nama) return "U";
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="w-full p-4 bg-blue-800 text-white flex justify-between items-center shadow-lg">
      
      {/* LEFT - LOGO */}
      <Link href="/dashboard/user">
        <h1 className="text-xl font-bold cursor-pointer hover:text-blue-200 transition">
          Perpustakaan TB
        </h1>
      </Link>

      {/* CENTER - SEARCH BAR */}
      <form
        onSubmit={handleSearch}
        className="hidden md:flex items-center bg-blue-700 px-3 py-2 rounded-lg"
      >
        <input
          type="text"
          placeholder="Cari buku..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent outline-none text-white placeholder-blue-200 text-sm w-56"
        />
        <button
          type="submit"
          className="ml-2 bg-white text-blue-800 px-3 py-1 rounded-md text-sm font-semibold hover:bg-blue-100 transition"
        >
          Cari
        </button>
      </form>

      {/* RIGHT - PROFILE */}
      <div className="relative">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="flex items-center gap-2 hover:bg-blue-700 rounded-lg px-3 py-2 transition"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-sm">
            {getInitials(user?.nama)}
          </div>
          <span className="hidden md:block font-medium">
            {user?.nama ?? "User"}
          </span>
          <span className="text-sm">▼</span>
        </button>

        {showProfile && (
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="font-semibold text-gray-800 text-sm">
                {user?.nama ?? "User"}
              </p>
              <p className="text-xs text-gray-500">{user?.email ?? ""}</p>
              <p className="text-xs text-blue-600 mt-1 font-medium capitalize">
                {user?.role ?? "user"}
              </p>
            </div>

            <Link
              href="/dashboard/user/profile"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setShowProfile(false)}
            >
              👤 Profil Saya
            </Link>

            <Link
              href="/dashboard/user/history"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setShowProfile(false)}
            >
              📚 Riwayat Peminjaman
            </Link>

            {user?.role === "guru" && (
              <Link
                href="/dashboard/teacher"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setShowProfile(false)}
              >
                🧑‍🏫 Dashboard Guru
              </Link>
            )}

            {user?.role === "admin" && (
              <Link
                href="/dashboard/admin"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                onClick={() => setShowProfile(false)}
              >
                🛠️ Dashboard Admin
              </Link>
            )}

            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
            >
              🚪 Keluar
            </button>
          </div>
        )}
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
