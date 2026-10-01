"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UserNavbar from "../../components/UserNavbar";
import BookCarousel from "../../components/BookCarousel";
import {
  Laptop,
  Wifi,
  Sparkles,
  Layers,
  Compass,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

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

    const loadUserFromStorage = () => {
      savedUser = localStorage.getItem("user");
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setLoading(false);
        } catch (e) {
          console.error("Error parsing localStorage user:", e);
        }
      }
    };

    loadUserFromStorage();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" && e.newValue) {
        try {
          const userData = JSON.parse(e.newValue);
          setUser(userData);
        } catch (e) {
          console.error("Error parsing updated user:", e);
        }
      }
    };

    const handleUserUpdated = (e: CustomEvent) => {
      if (e.detail) {
        setUser(e.detail);
        localStorage.setItem("user", JSON.stringify(e.detail));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("userUpdated", handleUserUpdated as EventListener);

    const verifyAndUpdateUser = async () => {
      if (cancelled) return;
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (cancelled) return;
        const data = await res.json();

        if (data.success && data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          savedUser = localStorage.getItem("user");
          if (!savedUser) {
            localStorage.removeItem("user");
            setTimeout(() => {
              window.location.href = "/login";
            }, 1000);
          }
        }
      } catch (err) {
        console.error("API verification error:", err);
        savedUser = localStorage.getItem("user");
        if (!savedUser) {
          localStorage.removeItem("user");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1000);
        }
      }
    };

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

  // Kategori Kejuruan SMK Taruna Bhakti Depok
  const categories = [
    { title: "Rekayasa Perangkat Lunak", code: "RPL", icon: Laptop },
    { title: "Teknik Komputer Jaringan", code: "TKJ", icon: Wifi },
    { title: "Desain Komunikasi Visual", code: "DKV", icon: Sparkles },
    { title: "Broadcasting Perfilman", code: "BC", icon: Layers },
    { title: "Elektronika Industri", code: "TEI", icon: Compass },
    { title: "Kurikulum Merdeka Umum", code: "UMUM", icon: BookOpen },
  ];

  const collections = [
    { title: "Fase E (Kelas X)", desc: "Materi dasar kejuruan dan mata pelajaran umum Kurikulum Merdeka" },
    { title: "Fase F (Kelas XI & XII)", desc: "Modul kejuruan spesifik konsentrasi keahlian dan uji sertifikasi" },
    { title: "Laporan PKL & Riset", desc: "Arsip laporan praktik kerja lapangan dan tugas akhir siswa TB" },
    { title: "Jurnal & Referensi Guru", desc: "Kumpulan modul ajar resmi dan karya tulis ilmiah pendidik" },
  ];

  const books = [
    { id: 1, title: "Clean Code & Desain Perangkat Lunak", author: "Robert C. Martin", category: "RPL" },
    { id: 2, title: "Administrasi Server Linux & Mikrotik", author: "Iwan Sofana", category: "TKJ" },
    { id: 3, title: "Prinsip Desain Komunikasi Visual & UI/UX", author: "Don Norman", category: "DKV" },
    { id: 4, title: "Laskar Pelangi & Antologi Sastra", author: "Andrea Hirata", category: "Sastra" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-2">
          <div className="w-8 h-8 border-2 border-blue-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-medium text-slate-600">Memuat data perpustakaan...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center p-6 max-w-sm">
          <p className="text-sm font-semibold text-red-600 mb-1">Sesi Tidak Ditemukan</p>
          <p className="text-xs text-slate-500 mb-4">Mengarahkan ke halaman masuk akun...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 animate-fade-in">
      <UserNavbar user={user} />

      {/* WELCOME BANNER */}
      <section className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-950 text-white py-10 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-block text-xs font-medium text-blue-300 bg-blue-900/50 px-2.5 py-0.5 rounded-full border border-blue-500/30 mb-2">
                Selamat Datang di Portal Siswa
              </span>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Halo, {user.nama}
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                Jelajahi referensi modul kejuruan dan buku kurikulum SMK Taruna Bhakti Depok
              </p>
            </div>

            <button
              onClick={() => router.push("/dashboard/user/books")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-medium transition-colors w-fit shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Katalog Lengkap</span>
            </button>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* STATS OVERVIEW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Total Koleksi</span>
            <div className="text-2xl font-semibold text-slate-900 mt-1">3.500+</div>
            <span className="text-[11px] text-blue-600 mt-1 block font-medium">Buku &amp; Modul</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Buku Favorit</span>
            <div className="text-2xl font-semibold text-slate-900 mt-1">18</div>
            <span className="text-[11px] text-emerald-600 mt-1 block font-medium">Tersimpan</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Sedang Dipinjam</span>
            <div className="text-2xl font-semibold text-slate-900 mt-1">2</div>
            <span className="text-[11px] text-amber-600 mt-1 block font-medium">Aktif</span>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs">
            <span className="text-xs text-slate-500 font-medium">Program Kejuruan</span>
            <div className="text-2xl font-semibold text-slate-900 mt-1">5</div>
            <span className="text-[11px] text-indigo-600 mt-1 block font-medium">Kompetensi TB</span>
          </div>
        </div>

        {/* KATEGORI UTAMA */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Kategori Kejuruan &amp; Studi
              </h2>
              <p className="text-xs text-slate-500">Pilih bidang kompetensi untuk menyaring materi</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={i}
                  onClick={() => router.push(`/dashboard/user/books?category=${encodeURIComponent(cat.title)}`)}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 transition-all cursor-pointer text-center group"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="inline-block mt-3 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 bg-blue-50 rounded">
                    {cat.code}
                  </span>
                  <h3 className="mt-1 text-xs font-semibold text-slate-900 line-clamp-2">
                    {cat.title}
                  </h3>
                </div>
              );
            })}
          </div>
        </section>

        {/* KOLEKSI TINGKAT / FASE */}
        <section>
          <div className="mb-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Koleksi Berdasarkan Tingkat Pendidikan
            </h2>
            <p className="text-xs text-slate-500">Materi pembelajaran berdasarkan fase Kurikulum Merdeka</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {collections.map((col, i) => (
              <div
                key={i}
                onClick={() => router.push(`/dashboard/user/books?collection=${encodeURIComponent(col.title)}`)}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {col.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {col.desc}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-700 flex items-center justify-center shrink-0 ml-4 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* BUKU REKOMENDASI */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Rekomendasi Pustakawan
            </h2>
            <p className="text-xs text-slate-500">Buku dan modul terpilih untuk pekan ini</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
            <BookCarousel books={books} />
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <footer className="py-6 border-t border-slate-200 text-center text-xs text-slate-500 bg-white">
        &copy; {new Date().getFullYear()} Perpustakaan Digital SMK Taruna Bhakti Depok &bull; Yayasan Setya Bhakti
      </footer>
    </div>
  );
}
