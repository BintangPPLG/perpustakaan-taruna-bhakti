"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  image?: string;
};

type SimpleCategory = {
  title: string;
  icon?: string;
};

type SimpleCollection = {
  title: string;
  desc: string;
};

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("query") || searchParams.get("q") || "").trim();
  const router = useRouter();

  const [results, setResults] = useState<Book[]>([]);
  const [categoryMatches, setCategoryMatches] = useState<SimpleCategory[]>([]);
  const [collectionMatches, setCollectionMatches] = useState<SimpleCollection[]>([]);

  useEffect(() => {
    const q = query.toLowerCase();

    const dummyBooks: Book[] = [
      {
        id: 1,
        title: "Rahasia Hujan",
        author: "Ayu Lestari",
        image: "/img/buku1.jpg",
      },
      {
        id: 2,
        title: "Dunia Kecilku",
        author: "Raihan Putra",
        image: "/img/buku2.jpg",
      },
      {
        id: 3,
        title: "Si Penjelajah",
        author: "Dimas Ardi",
        image: "/img/buku3.jpg",
      },
      {
        id: 4,
        title: "Ilmu Sains Mudah",
        author: "Rani",
        image: "/img/buku4.jpg",
      },
    ];

    const categories: SimpleCategory[] = [
      { title: "Pra Nikah", icon: "💍" },
      { title: "Menikah", icon: "❤️" },
      { title: "Golden Age", icon: "🌟" },
      { title: "Press", icon: "📘" },
      { title: "Buku Anak", icon: "👶" },
      { title: "Bacaan Bermutu", icon: "📖" },
    ];

    const collections: SimpleCollection[] = [
      { title: "SD / MI", desc: "Koleksi buku pelajaran dan bacaan SD/MI" },
      { title: "SMP / MTs", desc: "Koleksi digital untuk jenjang SMP/MTs" },
      { title: "SMA / SMK / MA", desc: "Koleksi lengkap untuk SMA/SMK/MA" },
      { title: "SLB", desc: "Koleksi pendidikan khusus SLB" },
      { title: "PAUD", desc: "Koleksi edukasi usia dini (PAUD)" },
    ];

    const filteredBooks = dummyBooks.filter((b) =>
      b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );

    const filteredCategories = categories.filter((c) =>
      c.title.toLowerCase().includes(q)
    );

    const filteredCollections = collections.filter((c) =>
      c.title.toLowerCase().includes(q)
    );

    setResults(filteredBooks);
    setCategoryMatches(filteredCategories);
    setCollectionMatches(filteredCollections);
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full flex justify-center py-10 flex-1">
        <div className="w-full max-w-6xl flex flex-col items-center text-center px-4">
          {/* Judul */}
          <h1 className="text-2xl font-bold mb-4 text-blue-900">
            Hasil Pencarian: "{query || "-"}"
          </h1>
          <p className="text-gray-600 mb-8 text-sm">
            Menampilkan hasil buku, kategori utama, dan koleksi sekolah/madrasah yang sesuai.
          </p>

          {/* Kategori Utama yang cocok */}
          {categoryMatches.length > 0 && (
            <div className="w-full mb-10 text-left">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">
                Kategori yang cocok
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {categoryMatches.map((cat) => (
                  <button
                    key={cat.title}
                    onClick={() =>
                      router.push(`/dashboard/user/books?category=${encodeURIComponent(cat.title)}`)
                    }
                    className="bg-white rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer border flex flex-col items-center justify-center hover:scale-105"
                  >
                    <div className="text-3xl mb-2">
                      {cat.icon}
                    </div>
                    <span className="font-semibold text-blue-800 text-sm text-center">
                      {cat.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Koleksi Sekolah/Madrasah yang cocok */}
          {collectionMatches.length > 0 && (
            <div className="w-full mb-10 text-left">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">
                Koleksi Sekolah & Madrasah yang cocok
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {collectionMatches.map((col) => (
                  <button
                    key={col.title}
                    onClick={() =>
                      router.push(`/dashboard/user/books?collection=${encodeURIComponent(col.title)}`)
                    }
                    className="bg-white shadow hover:shadow-lg transition rounded-xl p-4 flex items-center gap-3 border cursor-pointer hover:scale-105 text-left"
                  >
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                      {col.title.substring(0, 2)}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-blue-700">
                        {col.title}
                      </h3>
                      <p className="text-xs text-gray-600">{col.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* GRID BUKU */}
          <div className="w-full mb-6 text-left">
            <h2 className="text-lg font-semibold text-blue-900 mb-4">
              Buku yang cocok
            </h2>
            {results.length === 0 ? (
              <p className="text-gray-500 mb-6 text-center">
                Tidak ada buku yang cocok dengan pencarian.
              </p>
            ) : (
              <div className="w-full flex flex-wrap justify-center gap-6 mb-4">
                {results.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white shadow-md rounded-xl border overflow-hidden hover:shadow-lg transition group cursor-pointer w-56"
                  >
                    <div className="h-44 w-full overflow-hidden bg-gray-100">
                      <img
                        src={b.image || "/default-book.jpg"}
                        alt={b.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                    </div>

                    <div className="p-4">
                      <h2 className="font-semibold text-sm text-blue-800 line-clamp-2 mb-1">
                        {b.title}
                      </h2>
                      <p className="text-xs text-gray-600 mb-3 line-clamp-1">
                        {b.author}
                      </p>

                      <Link
                        href={`/dashboard/user/book/${b.id}`}
                        className="inline-block w-full px-3 py-2 bg-blue-700 text-white text-xs rounded-lg hover:bg-blue-800 transition text-center"
                      >
                        📖 Lihat Buku
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 🔙 TOMBOL KEMBALI DI BAWAH */}
          <button
            onClick={() => router.back()}
            className="mt-2 px-5 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg shadow flex items-center gap-2 transition"
          >
            ← Kembali
          </button>
        </div>
      </div>
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Perpustakaan Digital Taruna Bhakti. All Rights Reserved.
      </footer>
    </div>
  );
}
