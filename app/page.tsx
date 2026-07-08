"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleProtectedClick = () => {
    const loggedIn = document.cookie.includes("session=");
    if (!loggedIn) router.push("/login");
    else router.push("/dashboard/user");
  };

  // === SEARCH FUNCTIONALITY ===
  const handleSearch = () => {
    if (!search.trim()) return;

    const loggedIn = document.cookie.includes("session=");
    if (!loggedIn) {
      router.push("/login");
      return;
    }

    router.push(`/dashboard/user/search?q=${search}`);
  };

  const berita = [
    {
      title: "Perpustakaan TB Tambah Koleksi Digital Baru",
      date: "21 November 2025",
      desc: "Lebih dari 120 buku digital baru ditambahkan untuk mendukung pembelajaran siswa.",
      img: "/img/news1.jpg",
    },
    {
      title: "Lomba Literasi Tingkat Nasional",
      date: "18 November 2025",
      desc: "Siswa Taruna Bhakti berhasil meraih prestasi dalam lomba literasi tingkat nasional.",
      img: "/img/news2.jpg",
    },
    {
      title: "Pembaruan Sistem Perpustakaan",
      date: "10 November 2025",
      desc: "Sistem perpustakaan kini memiliki tampilan baru untuk mempermudah pencarian buku.",
      img: "/img/news3.jpg",
    },
  ];

  const koleksi = [
    { title: "Buku Umum", desc: "Buku bacaan umum untuk seluruh siswa", icon: "📘" },
    { title: "Pelajaran", desc: "Materi pelajaran SD–SMK lengkap", icon: "📚" },
    { title: "Majalah", desc: "Majalah bermanfaat untuk menambah wawasan", icon: "📰" },
    { title: "Komik Edukasi", desc: "Belajar sambil hiburan dengan komik edukatif", icon: "📖" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-20">
        <div className="max-w-6xl mx-auto px-6 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">
            Perpustakaan Digital Taruna Bhakti
          </h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
            Akses ribuan koleksi buku digital secara cepat, modern, dan gratis.
            Tingkatkan literasi dengan teknologi yang lebih maju.
          </p>

          {/* SEARCH BAR */}
          <div className="mt-10 flex justify-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari buku, kategori, atau penulis..."
              className="w-full max-w-xl px-5 py-3 rounded-l-xl shadow-md outline-none text-gray-800"
            />
            <button
              onClick={handleSearch}
              className="px-5 py-3 bg-blue-900 text-white rounded-r-xl shadow-md hover:bg-blue-950 transition"
            >
              🔍 Cari
            </button>
          </div>

          {/* LOGIN BUTTON */}
          <button
            onClick={() => router.push("/login")}
            className="mt-8 bg-white text-blue-700 px-6 py-3 rounded-xl font-bold shadow hover:bg-blue-100 transition"
          >
            Masuk untuk Akses Buku
          </button>
        </div>
      </div>

      {/* KOLEKSI */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center">
          Koleksi Perpustakaan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {koleksi.map((item, i) => (
            <div
              key={i}
              onClick={handleProtectedClick}
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg hover:scale-105 transition cursor-pointer border border-blue-100"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-blue-800">{item.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BERITA */}
      <section className="bg-white py-16 border-t">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 mb-10 text-center">
            Berita & Informasi Sekolah
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {berita.map((n, i) => (
              <div
                key={i}
                className="bg-gray-50 rounded-xl shadow hover:shadow-lg transition border border-blue-100 cursor-pointer"
                onClick={handleProtectedClick}
              >
                <img
                  src={n.img}
                  className="w-full h-40 object-cover rounded-t-xl"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-blue-800">{n.title}</h3>
                  <p className="text-xs text-gray-500 mt-1">{n.date}</p>
                  <p className="text-sm text-gray-700 mt-3">{n.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-blue-50 py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Tentang Perpustakaan</h2>

          <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Perpustakaan Digital Taruna Bhakti dibangun sebagai dukungan terhadap 
            proses belajar siswa dengan menghadirkan akses mudah ke ribuan buku digital, 
            materi pelajaran, hingga informasi sekolah terbaru. Dengan tampilan modern 
            dan fitur interaktif, perpustakaan digital ini mengajak siswa untuk 
            meningkatkan minat baca melalui teknologi.
          </p>

          <button
            onClick={handleProtectedClick}
            className="mt-8 bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow hover:bg-blue-800 transition"
          >
            Mulai Jelajahi Buku
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Perpustakaan Digital Taruna Bhakti. All Rights Reserved.
      </footer>
    </div>
  );
}
