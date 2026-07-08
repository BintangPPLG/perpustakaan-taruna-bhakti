"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserNavbar from "../../components/UserNavbar";
import BookCarousel from "../../components/BookCarousel";

// ===== 🟦 TIPE UNTUK USER =====
interface UserType {
  id?: number;
  nama?: string;
  email?: string;
  role?: "user" | "siswa" | "admin" | "petugas" | string;
  profileImage?: string;
}

export default function UserHome() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    let savedUser = localStorage.getItem("user");

    // Function to load user from localStorage
    const loadUserFromStorage = () => {
      savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          console.log("📦 User data loaded from localStorage:", userData);
          setUser(userData);
          setLoading(false);
        } catch (e) {
          console.error("❌ Error parsing localStorage user:", e);
        }
      }
    };

    // Load user initially
    loadUserFromStorage();

    // Listen for storage changes (when profile is updated in other tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" && e.newValue) {
        try {
          const userData = JSON.parse(e.newValue);
          console.log("🔄 User data updated from storage (other tab):", userData);
          setUser(userData);
          savedUser = e.newValue;
        } catch (e) {
          console.error("❌ Error parsing updated user:", e);
        }
      }
    };

    // Listen for custom event (from same tab)
    const handleUserUpdated = (e: CustomEvent) => {
      if (e.detail) {
        console.log("🔄 User data updated from custom event:", e.detail);
        setUser(e.detail);
        localStorage.setItem("user", JSON.stringify(e.detail));
        savedUser = JSON.stringify(e.detail);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userUpdated", handleUserUpdated as EventListener);

    // Verify dengan API di background
    const verifyAndUpdateUser = async () => {
      if (cancelled) return;

      try {
        console.log("🔍 Verifying user with API...");
        
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (cancelled) return;

        const data = await res.json();
        
        console.log("📦 API Response:", data);

        if (data.success && data.user) {
          console.log("✅ User verified from API:", data.user);
          setUser(data.user);
          // Update localStorage dengan data terbaru
          localStorage.setItem("user", JSON.stringify(data.user));
          savedUser = JSON.stringify(data.user);
        } else {
          console.warn("⚠️ API verification failed:", data.message);
          // Tetap gunakan data dari localStorage jika ada
          savedUser = localStorage.getItem("user");
          if (!savedUser) {
            // Jika tidak ada data di localStorage dan API gagal, redirect ke login
            console.error("❌ No user data available, redirecting to login");
            localStorage.removeItem("user");
            setTimeout(() => {
              window.location.href = "/login";
            }, 1000);
          }
        }
      } catch (err) {
        console.error("❌ API verification error:", err);
        // Tetap gunakan data dari localStorage jika ada
        savedUser = localStorage.getItem("user");
        if (!savedUser) {
          localStorage.removeItem("user");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        }
      }
    };

    // Jalankan verification setelah sedikit delay
    const timer = setTimeout(() => {
      verifyAndUpdateUser();
    }, 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("userUpdated", handleUserUpdated as EventListener);
    };
  }, [router]);

  // Data Dummy
  const categories = [
    { title: "Pra Nikah", icon: "💍" },
    { title: "Menikah", icon: "❤️" },
    { title: "Golden Age", icon: "🌟" },
    { title: "Press", icon: "📘" },
    { title: "Buku Anak", icon: "👶" },
    { title: "Bacaan Bermutu", icon: "📖" },
  ];

  const collections = [
    { title: "SD / MI", desc: "Koleksi buku pelajaran dan bacaan SD/MI" },
    { title: "SMP / MTs", desc: "Koleksi digital untuk jenjang SMP/MTs" },
    { title: "SMA / SMK / MA", desc: "Koleksi lengkap untuk SMA/SMK/MA" },
    { title: "SLB", desc: "Koleksi pendidikan khusus SLB" },
    { title: "PAUD", desc: "Koleksi edukasi usia dini (PAUD)" },
  ];

  const books = [
    { id: 1, title: "Rahasia Hujan", author: "Ayu Lestari", image: "/img/buku1.jpg" },
    { id: 2, title: "Dunia Kecilku", author: "Raihan Putra", image: "/img/buku2.jpg" },
    { id: 3, title: "Si Penjelajah", author: "Dimas Ardi", image: "/img/buku3.jpg" },
    { id: 4, title: "Ilmu Sains Mudah", author: "Rani", image: "/img/buku4.jpg" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-blue-700 text-xl font-semibold mb-2">Memuat...</div>
          <div className="text-gray-500 text-sm">Mohon tunggu sebentar</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold mb-2">Tidak dapat memuat data pengguna</div>
          <div className="text-gray-500 text-sm mb-4">Mengarahkan ke halaman login...</div>
          <div className="text-xs text-gray-400">Cek console browser untuk detail error</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      <UserNavbar user={user} />

      {/* BANNER */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-12 shadow-xl">
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Selamat Datang, {user.nama}! 👋
          </h1>
          <p className="text-blue-100 mt-2 text-lg">
            Jelajahi ribuan koleksi buku digital tersedia untuk Anda
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 pt-10">

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-white rounded-xl p-6 shadow-md border hover:shadow-lg transition">
            <div className="text-3xl font-bold text-blue-700">120</div>
            <div className="text-sm text-gray-600">Total Buku</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border hover:shadow-lg transition">
            <div className="text-3xl font-bold text-pink-600">18</div>
            <div className="text-sm text-gray-600">Favorit</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border hover:shadow-lg transition">
            <div className="text-3xl font-bold text-green-700">7</div>
            <div className="text-sm text-gray-600">Dipinjam</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md border hover:shadow-lg transition">
            <div className="text-3xl font-bold text-purple-700">10</div>
            <div className="text-sm text-gray-600">Kategori</div>
          </div>
        </div>

        {/* Categories */}
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Kategori Utama
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {categories.map((cat, i) => (
            <div
              key={i}
              onClick={() => router.push(`/dashboard/user/books?category=${encodeURIComponent(cat.title)}`)}
              className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition cursor-pointer hover:scale-105 border"
            >
              <div className="w-14 h-14 mx-auto bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-3xl">
                {cat.icon}
              </div>
              <h3 className="mt-3 font-semibold text-blue-800 text-sm text-center">
                {cat.title}
              </h3>
            </div>
          ))}
        </div>

        {/* Collections */}
        <h2 className="text-2xl font-bold text-blue-900 mb-6">
          Koleksi Sekolah & Madrasah
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
          {collections.map((col, i) => (
            <div
              key={i}
              onClick={() => router.push(`/dashboard/user/books?collection=${encodeURIComponent(col.title)}`)}
              className="bg-white shadow hover:shadow-lg transition rounded-xl p-6 flex items-center gap-4 border cursor-pointer hover:scale-105"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl font-bold">
                {col.title.substring(0, 2)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700">
                  {col.title}
                </h3>
                <p className="text-gray-600 text-sm">{col.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Buku Rekomendasi
        </h2>

        <div className="bg-white rounded-xl shadow p-6 border mb-12">
          <BookCarousel books={books} />
        </div>

        {/* New Books */}
        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Buku Terbaru
        </h2>

        <div className="bg-white rounded-xl shadow p-6 border mb-12">
          <BookCarousel books={books.slice(0, 4)} />
        </div>

      </div>
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Perpustakaan Digital Taruna Bhakti. All Rights Reserved.
      </footer>
    </div>
  );
}
