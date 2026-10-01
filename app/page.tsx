"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import {
  Search,
  BookOpen,
  GraduationCap,
  Layers,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  Wifi,
  Laptop,
  Users,
  Compass,
  FileText,
  ChevronRight,
  Info,
} from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const handleProtectedClick = (path = "/dashboard/user") => {
    const loggedIn = typeof document !== "undefined" && document.cookie.includes("session=");
    if (!loggedIn) {
      router.push("/login");
    } else {
      router.push(path);
    }
  };

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!search.trim()) return;

    const loggedIn = typeof document !== "undefined" && document.cookie.includes("session=");
    if (!loggedIn) {
      router.push("/login");
      return;
    }

    router.push(`/dashboard/user/search?query=${encodeURIComponent(search.trim())}`);
  };

  const quickSearchKeywords = [
    "Rekayasa Perangkat Lunak",
    "Jaringan Komputer",
    "Desain Grafis",
    "Kurikulum Merdeka",
    "Sastra & Bahasa",
  ];

  // Kategori Kejuruan SMK Taruna Bhakti Depok
  const kejuruanCategories = [
    {
      id: "rpl",
      title: "Rekayasa Perangkat Lunak",
      abbr: "RPL",
      desc: "Buku pemrograman web, mobile, algoritma, cloud, dan arsitektur database modern.",
      color: "from-blue-600 to-indigo-700",
      accent: "text-blue-700 bg-blue-50 border-blue-200",
      icon: Laptop,
      count: "840+ Judul",
    },
    {
      id: "tkj",
      title: "Teknik Komputer & Jaringan",
      abbr: "TKJ",
      desc: "Materi infrastruktur jaringan, administrasi server Linux, keamanan siber, dan Cisco/Mikrotik.",
      color: "from-emerald-600 to-teal-700",
      accent: "text-emerald-700 bg-emerald-50 border-emerald-200",
      icon: Wifi,
      count: "720+ Judul",
    },
    {
      id: "dkv",
      title: "Desain Komunikasi Visual",
      abbr: "DKV",
      desc: "Panduan desain grafis, ilustrasi digital, tipografi, fotografi, serta motion graphics.",
      color: "from-purple-600 to-violet-700",
      accent: "text-purple-700 bg-purple-50 border-purple-200",
      icon: Sparkles,
      count: "530+ Judul",
    },
    {
      id: "bc",
      title: "Broadcasting & Perfilman",
      abbr: "BC",
      desc: "Teknik produksi video siaran, tata kamera, penulisan naskah, tata suara, dan editing.",
      color: "from-amber-600 to-orange-700",
      accent: "text-amber-700 bg-amber-50 border-amber-200",
      icon: Layers,
      count: "390+ Judul",
    },
    {
      id: "tei",
      title: "Teknik Elektronika Industri",
      abbr: "TEI",
      desc: "Otomasi sistem industri, mikrokontroler Arduino/ESP, sensor IoT, dan rangkaian elektronika.",
      color: "from-cyan-600 to-blue-700",
      accent: "text-cyan-700 bg-cyan-50 border-cyan-200",
      icon: Compass,
      count: "410+ Judul",
    },
    {
      id: "umum",
      title: "Kurikulum & Literasi Umum",
      abbr: "UMUM",
      desc: "Buku teks Kurikulum Merdeka nasional, ensiklopedia sains, sejarah, dan novel literasi pilihan.",
      color: "from-slate-700 to-slate-900",
      accent: "text-slate-700 bg-slate-100 border-slate-200",
      icon: BookOpen,
      count: "1.100+ Judul",
    },
  ];

  // Buku Unggulan dengan Cover SVG Art Berkualitas Tinggi
  const featuredBooks = [
    {
      id: 1,
      title: "Clean Code & Arsitektur Perangkat Lunak Modern",
      author: "Robert C. Martin",
      jurusan: "Rekayasa Perangkat Lunak",
      year: "2024",
      coverColor: "bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-950",
      tag: "Rekomendasi RPL",
      available: "Tersedia Digital",
    },
    {
      id: 2,
      title: "Administrasi Jaringan & Keamanan Sistem Linux",
      author: "Iwan Sofana",
      jurusan: "Teknik Komputer Jaringan",
      year: "2023",
      coverColor: "bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950",
      tag: "Rekomendasi TKJ",
      available: "Tersedia Digital",
    },
    {
      id: 3,
      title: "Prinsip Desain Komunikasi Visual & UI/UX Interaktif",
      author: "Don Norman",
      jurusan: "Desain Komunikasi Visual",
      year: "2024",
      coverColor: "bg-gradient-to-br from-purple-800 via-violet-900 to-slate-950",
      tag: "Rekomendasi DKV",
      available: "Tersedia Digital",
    },
    {
      id: 4,
      title: "Laskar Pelangi & Antologi Sastra Kontemporer",
      author: "Andrea Hirata",
      jurusan: "Literasi Umum & Sastra",
      year: "2023",
      coverColor: "bg-gradient-to-br from-sky-800 via-blue-900 to-slate-950",
      tag: "Buku Terpopuler",
      available: "Tersedia Digital",
    },
  ];

  // Berita & Agenda Resmi Literasi
  const newsItems = [
    {
      title: "Pencanangan Pekan Literasi Digital Siswa SMK Taruna Bhakti 2026",
      date: "24 Februari 2026",
      category: "Agenda Sekolah",
      desc: "Pengenalan fasilitas peminjaman mandiri berbasis kartu siswa dan integrasi katalog digital untuk seluruh kompetensi keahlian.",
    },
    {
      title: "Penambahan 300+ Modul Praktik Berbasis Cloud & Kecerdasan Buatan",
      date: "12 Februari 2026",
      category: "Koleksi Baru",
      desc: "Perpustakaan memperluas koleksi e-book kejuruan teknologi informasi untuk menunjang pembelajaran teaching factory.",
    },
    {
      title: "Sosialisasi Etika Sitasi & Penulisan Laporan Tugas Akhir / PKL",
      date: "28 Januari 2026",
      category: "Bimbingan Belajar",
      desc: "Pelatihan pemanfaatan referensi perpustakaan digital bagi siswa tingkat akhir dalam menyusun laporan PKL dan uji kompetensi.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col animate-fade-in">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-slate-900 to-slate-950 text-white pt-14 pb-24 border-b border-slate-800">
        {/* Subtle geometric background highlights (non-slop, clean institutional lighting) */}
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-600/30 blur-3xl"></div>
          <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* LEFT COLUMN: HERO CONTENT */}
            <div className="lg:col-span-7 flex flex-col space-y-6 text-left animate-fade-in-up">
              
              {/* Institution badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/30 text-blue-200 text-xs font-medium w-fit">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Portal Resmi Perpustakaan SMK Taruna Bhakti Depok</span>
              </div>

              {/* Title without overly bold/fat weight */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
                Pusat Literasi, Riset, &amp; Modul Kejuruan Digital
              </h1>

              {/* Subtitle */}
              <p className="text-slate-300 text-base sm:text-lg font-normal leading-relaxed max-w-2xl">
                Mendukung eksplorasi akademik dan keterampilan praktis siswa Rekayasa Perangkat Lunak, Jaringan Komputer, DKV, Broadcast, dan Elektronika Industri melalui ribuan koleksi terkurasi.
              </p>

              {/* SEARCH BOX */}
              <form
                onSubmit={handleSearch}
                className="pt-2 flex flex-col sm:flex-row gap-2 max-w-2xl"
              >
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 h-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari judul buku, penulis, materi pelajaran, atau topik kejuruan..."
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl text-slate-900 placeholder:text-slate-400 text-sm border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium shadow-md transition-all active:scale-98 whitespace-nowrap"
                >
                  <Search className="w-4 h-4" />
                  <span>Temukan Buku</span>
                </button>
              </form>

              {/* QUICK CHIPS */}
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
                <span className="font-medium text-slate-400">Pencarian populer:</span>
                {quickSearchKeywords.map((keyword, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setSearch(keyword);
                    }}
                    className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700/60 transition-colors"
                  >
                    {keyword}
                  </button>
                ))}
              </div>

              {/* ACTION LINKS */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <button
                  onClick={() => handleProtectedClick("/dashboard/user/books")}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  <span>Jelajahi Katalog Buku</span>
                </button>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-slate-300 hover:text-white rounded-lg text-sm font-medium hover:bg-slate-800/50 transition-all border border-slate-700/60"
                >
                  <span>Masuk Akun Siswa</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>

            {/* RIGHT COLUMN: INSTITUTIONAL SHOWCASE CARD */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end animate-fade-in-up delay-150">
              <div className="w-full max-w-md bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/70 p-6 shadow-xl relative group">
                
                {/* Header card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-700/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Rekomendasi Pekan Ini</p>
                      <h3 className="text-sm font-medium text-white">Koleksi Terpilih Siswa TB</h3>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300">
                    Aktif
                  </span>
                </div>

                {/* Book graphic preview */}
                <div className="my-5 p-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-slate-700/60 flex gap-4 items-center">
                  <div className="w-20 h-28 shrink-0 rounded-lg bg-gradient-to-tr from-blue-700 via-indigo-800 to-blue-950 p-2.5 flex flex-col justify-between shadow-md border border-blue-500/30 text-white">
                    <div className="text-[9px] uppercase tracking-wider text-blue-200 font-medium">
                      SMK TB
                    </div>
                    <BookOpen className="w-6 h-6 text-blue-200 self-center" />
                    <div className="text-[8px] text-blue-200/90 leading-tight">
                      Modul Resmi
                    </div>
                  </div>
                  
                  <div className="space-y-1.5 text-left">
                    <span className="inline-block text-[11px] font-medium text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800/60">
                      Rekayasa Perangkat Lunak
                    </span>
                    <h4 className="text-sm font-medium text-white leading-snug">
                      Clean Code &amp; Desain Arsitektur Modern
                    </h4>
                    <p className="text-xs text-slate-400">Oleh Robert C. Martin</p>
                    <p className="text-[11px] text-emerald-400 flex items-center gap-1 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Tersedia untuk dipinjam / dibaca digital</span>
                    </p>
                  </div>
                </div>

                {/* Information summary */}
                <div className="grid grid-cols-3 gap-2 py-3 border-t border-slate-700/60 text-center">
                  <div className="p-2 rounded-lg bg-slate-900/40">
                    <span className="block text-xs font-semibold text-white">3.500+</span>
                    <span className="text-[11px] text-slate-400">Eksemplar</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40">
                    <span className="block text-xs font-semibold text-white">5 Jurusan</span>
                    <span className="text-[11px] text-slate-400">Kejuruan</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-900/40">
                    <span className="block text-xs font-semibold text-white">Gratis</span>
                    <span className="text-[11px] text-slate-400">Siswa &amp; Guru</span>
                  </div>
                </div>

                {/* Button inside card */}
                <button
                  onClick={() => handleProtectedClick("/dashboard/user/book/1")}
                  className="w-full mt-3 py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>Lihat Detail Modul</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK HIGHLIGHTS BAR */}
      <section className="bg-white border-b border-slate-200/80 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-slate-100">
            
            <div className="flex items-center gap-3.5 pt-4 md:pt-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800">Koleksi Terverifikasi</h4>
                <p className="text-xs text-slate-500">Materi kurikulum merdeka &amp; modul kejuruan mutakhir</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Laptop className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800">Akses Mandiri Digital</h4>
                <p className="text-xs text-slate-500">Baca modul dan pantau riwayat peminjaman dari mana saja</p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 pt-4 md:pt-0 md:pl-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-800">Yayasan Setya Bhakti</h4>
                <p className="text-xs text-slate-500">Komitmen meningkatkan budaya literasi dan kompetensi siswa</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* KATEGORI KEJURUAN SECTION */}
      <section id="kategori" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-700">
                Katalog Program Kejuruan
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                Koleksi Berdasarkan Jurusan &amp; Bidang Studi
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-2 md:mt-0 max-w-md">
              Temukan buku kejuruan yang dirancang selaras dengan kurikulum industri dan kebutuhan sertifikasi keahlian.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kejuruanCategories.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => handleProtectedClick("/dashboard/user/books")}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${item.accent}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                        {item.count}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                        {item.abbr}
                      </span>
                      <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-blue-700">
                    <span>Lihat Daftar Buku</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* BUKU POPULER / KATALOG REKOMENDASI */}
      <section id="buku" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-700">
                Pilihan Pustakawan
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                Koleksi Paling Sering Dipinjam
              </h2>
            </div>
            <button
              onClick={() => handleProtectedClick("/dashboard/user/books")}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-700 hover:text-blue-800 mt-2 md:mt-0"
            >
              <span>Lihat Semua Katalog</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((b) => (
              <div
                key={b.id}
                onClick={() => handleProtectedClick(`/dashboard/user/book/${b.id}`)}
                className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                {/* Book cover visual header */}
                <div className={`p-6 ${b.coverColor} text-white flex flex-col justify-between h-48 relative overflow-hidden`}>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white border border-white/30">
                      {b.tag}
                    </span>
                    <span className="text-[11px] text-slate-300 font-mono">{b.year}</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold line-clamp-2 text-white leading-snug">
                      {b.title}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1">{b.author}</p>
                  </div>
                </div>

                {/* Book info body */}
                <div className="p-4 bg-white flex flex-col justify-between flex-1">
                  <div>
                    <span className="inline-block text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {b.jurusan}
                    </span>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-600 mt-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{b.available}</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-blue-700">
                    <span>Akses Modul</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BERITA & AGENDA LITERASI */}
      <section id="berita" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-slate-200">
            <div>
              <span className="text-xs font-semibold tracking-wider uppercase text-blue-700">
                Informasi &amp; Kegiatan
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900 mt-1">
                Berita &amp; Agenda Literasi Sekolah
              </h2>
            </div>
            <p className="text-sm text-slate-500 mt-2 md:mt-0 max-w-md">
              Pembaruan kegiatan literasi, agenda bedah buku, dan informasi layanan terbaru SMK Taruna Bhakti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsItems.map((n, i) => (
              <div
                key={i}
                onClick={() => handleProtectedClick()}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium border border-blue-100">
                      {n.category}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {n.date}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-blue-700 transition-colors leading-snug">
                    {n.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {n.desc}
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-blue-700">
                  <span>Baca Selengkapnya</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FASILITAS & JAM LAYANAN */}
      <section id="fasilitas" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* JAM OPERASIONAL */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-8 flex flex-col justify-between shadow-md">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/50 border border-blue-400/30 text-blue-200 text-xs font-medium mb-4">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Jadwal Pelayanan Perpustakaan</span>
                </div>

                <h3 className="text-2xl font-semibold text-white tracking-tight">
                  Jam Operasional Perpustakaan
                </h3>

                <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                  Layanan perpustakaan fisik bertempat di Lantai 2 Gedung Utama SMK Taruna Bhakti Depok, sedangkan portal digital aktif 24 jam.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-slate-800 text-sm">
                    <span className="text-slate-300">Senin - Kamis</span>
                    <span className="font-semibold text-white">07.00 - 16.00 WIB</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-800 text-sm">
                    <span className="text-slate-300">Jumat</span>
                    <span className="font-semibold text-white">07.00 - 15.00 WIB</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-slate-800 text-sm">
                    <span className="text-slate-300">Sabtu - Minggu</span>
                    <span className="text-amber-400 font-medium">Tutup (Fisik)</span>
                  </div>
                  <div className="flex items-center justify-between py-2 text-sm">
                    <span className="text-slate-300">Akses Portal Digital</span>
                    <span className="text-emerald-400 font-medium">Aktif 24 Jam Nonstop</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Jl. Pekapuran RT 02/06 Kel. Curug, Kec. Cimanggis, Kota Depok</span>
              </div>
            </div>

            {/* FASILITAS PERPUSTAKAAN */}
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold tracking-wider uppercase text-blue-700">
                  Kenyamanan Belajar
                </span>
                <h3 className="text-2xl font-semibold text-slate-900 mt-1">
                  Fasilitas Pusat Sumber Belajar
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  Ruang baca dirancang ergonomis guna menunjang produktivitas riset dan diskusi ilmiah peserta didik.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  
                  <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-3">
                      <Laptop className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">Workstation PC &amp; E-Catalogue</h4>
                    <p className="text-xs text-slate-500 mt-1">Komputer pencarian buku dan akses jurnal digital ilmiah.</p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
                      <Wifi className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">Akses Wi-Fi Kecepatan Tinggi</h4>
                    <p className="text-xs text-slate-500 mt-1">Konektivitas stabil untuk mengunduh modul kejuruan.</p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-3">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">Ruang Baca Tenang Ber-AC</h4>
                    <p className="text-xs text-slate-500 mt-1">Lingkungan kondusif untuk membaca intensif dan konsentrasi.</p>
                  </div>

                  <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center mb-3">
                      <Users className="w-4 h-4" />
                    </div>
                    <h4 className="text-sm font-semibold text-slate-900">Pojok Kolaborasi &amp; Diskusi</h4>
                    <p className="text-xs text-slate-500 mt-1">Area bertukar ide kelompok untuk proyek pembelajaran.</p>
                  </div>

                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
                <span className="text-xs text-slate-500">
                  Butuh bantuan pustakawan? Kunjungi meja sirkulasi di jam kerja.
                </span>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-800"
                >
                  <span>Mulai Akses Peminjaman</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CTA BANNER */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative w-16 h-16 mx-auto mb-4 bg-white rounded-2xl p-1.5 shadow-md">
            <Image
              src="/logo-taruna.jpg"
              alt="Logo Taruna Bhakti"
              fill
              sizes="64px"
              className="object-contain"
            />
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
            Tingkatkan Wawasan dan Keahlian Anda Bersama Perpustakaan Digital
          </h2>
          <p className="text-blue-100 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Daftar dengan akun siswa atau guru SMK Taruna Bhakti untuk mulai meminjam buku, menandai modul favorit, dan mengunduh referensi belajar resmi.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="px-6 py-3 bg-white text-blue-900 hover:bg-blue-50 text-sm font-semibold rounded-xl shadow-md transition-all active:scale-98"
            >
              Daftar Akun Perpustakaan
            </Link>
            <Link
              href="/login"
              className="px-6 py-3 bg-blue-950/60 hover:bg-blue-950 text-white text-sm font-medium rounded-xl border border-blue-400/30 transition-all"
            >
              Masuk dengan Akun yang Ada
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-400 text-sm border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* BRAND */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative w-11 h-11 rounded-xl bg-white p-1 overflow-hidden shrink-0">
                  <Image
                    src="/logo-taruna.jpg"
                    alt="Logo SMK Taruna Bhakti"
                    fill
                    sizes="44px"
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-white tracking-tight">
                    SMK Taruna Bhakti Depok
                  </h4>
                  <p className="text-xs text-blue-400">Yayasan Setya Bhakti</p>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-md">
                Pusat Sumber Belajar dan Perpustakaan Digital SMK Taruna Bhakti didedikasikan untuk memperluas akses pengetahuan kejuruan dan literasi umum bagi seluruh sivitas akademika sekolah.
              </p>

              <div className="text-xs text-slate-400 space-y-1 pt-1">
                <p className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>Jl. Pekapuran RT 02/06 Kel. Curug, Kec. Cimanggis, Kota Depok, Jawa Barat 16953</span>
                </p>
              </div>
            </div>

            {/* LINKS */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
                Layanan &amp; Fitur
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="#kategori" className="hover:text-white transition-colors">
                    Koleksi Program Kejuruan
                  </Link>
                </li>
                <li>
                  <Link href="#buku" className="hover:text-white transition-colors">
                    Katalog Buku Terpopuler
                  </Link>
                </li>
                <li>
                  <Link href="#berita" className="hover:text-white transition-colors">
                    Agenda &amp; Berita Literasi
                  </Link>
                </li>
                <li>
                  <Link href="#fasilitas" className="hover:text-white transition-colors">
                    Jam Operasional &amp; Fasilitas
                  </Link>
                </li>
              </ul>
            </div>

            {/* AKUN */}
            <div>
              <h5 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
                Akses Pengguna
              </h5>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Login Siswa &amp; Guru
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white transition-colors">
                    Registrasi Anggota Baru
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Portal Petugas &amp; Admin
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <p>
              &copy; {new Date().getFullYear()} Perpustakaan Digital SMK Taruna Bhakti Depok. Seluruh hak cipta dilindungi undang-undang.
            </p>
            <p className="text-slate-500">
              Dikembangkan untuk kemajuan pendidikan kejuruan Indonesia.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
