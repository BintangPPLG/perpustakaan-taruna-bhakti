"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import UserNavbar from "../../../components/UserNavbar";

interface UserType {
  id?: number;
  nama?: string;
  email?: string;
  role?: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  category?: string;
  collection?: string;
}

function BooksContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  
  const category = searchParams.get("category");
  const collection = searchParams.get("collection");

  // Helper function untuk generate 30 buku dengan variasi nama
  const generateBooks = (
    baseId: number,
    categoryName: string,
    titleList: string[],
    authorList: string[],
    imageArray: string[] = ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
  ): Book[] => {
    const books: Book[] = [];
    for (let i = 0; i < 30; i++) {
      books.push({
        id: baseId + i + 1,
        title: titleList[i % titleList.length] + (i >= titleList.length ? ` ${Math.floor(i / titleList.length) + 1}` : ""),
        author: authorList[i % authorList.length],
        image: imageArray[i % imageArray.length],
        category: categoryName.includes("/") ? undefined : categoryName,
        collection: categoryName.includes("/") ? categoryName : undefined,
      });
    }
    return books;
  };

  // Data dummy buku untuk setiap kategori (30 buku per kategori)
  const booksByCategory: { [key: string]: Book[] } = {
    "Pra Nikah": generateBooks(
      100,
      "Pra Nikah",
      [
        "Persiapan Menuju Pernikahan",
        "Cinta Sejati Sebelum Menikah",
        "Panduan Pra Nikah Islami",
        "Menyiapkan Diri untuk Pernikahan",
        "Pola Pikir yang Benar dalam Pra Nikah",
        "Kisah Inspiratif Pra Nikah",
        "Doa-doa Pra Nikah",
        "Fiqh Pra Nikah",
        "Psikologi Pra Nikah",
        "Kisah Nyata Pra Nikah",
      ],
      ["Ust. Ahmad", "Ust. Salim", "Ust. Rahman", "Ust. Ihsan", "Ust. Fahmi"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
    "Menikah": generateBooks(
      200,
      "Menikah",
      [
        "Bahagia dalam Rumah Tangga",
        "Seni Berumah Tangga",
        "Panduan Pernikahan Islami",
        "Keluarga Sakinah",
        "Harmoni Rumah Tangga",
        "Komunikasi dalam Pernikahan",
        "Mengelola Keuangan Keluarga",
        "Pendidikan Anak dalam Islam",
        "Kisah Keluarga Bahagia",
        "Tips Rumah Tangga Harmonis",
      ],
      ["Ust. Ali", "Ust. Hasan", "Ust. Fadil", "Ust. Rizki", "Ust. Dani"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
    "Golden Age": generateBooks(
      300,
      "Golden Age",
      [
        "Hidup Sehat di Usia Emas",
        "Aktif di Usia Tua",
        "Pola Makan Sehat Lansia",
        "Olahraga untuk Lansia",
        "Kesehatan Mental Lansia",
        "Kisah Inspiratif Lansia",
        "Tetap Produktif di Usia Tua",
        "Perawatan Kesehatan Lansia",
        "Hidup Bahagia di Usia Emas",
        "Mengisi Waktu Luang Lansia",
      ],
      ["Dr. Sarah", "Dr. Budi", "Dr. Lina", "Dr. Rudi", "Dr. Siti"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
    "Press": generateBooks(
      400,
      "Press",
      [
        "Buku Press Terbaru",
        "Edisi Khusus Press",
        "Koleksi Press 2024",
        "Buku Press Populer",
        "Seri Press Unggulan",
        "Press Edisi Terbatas",
        "Best Seller Press",
        "Press Collection",
        "Press Special Edition",
        "Press Bestseller",
      ],
      ["Penulis A", "Penulis B", "Penulis C", "Penulis D", "Penulis E"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
    "Buku Anak": generateBooks(
      500,
      "Buku Anak",
      [
        "Petualangan Si Kecil",
        "Cerita Binatang",
        "Kisah Pahlawan Kecil",
        "Dunia Imajinasi",
        "Belajar Sambil Bermain",
        "Cerita Edukatif",
        "Kisah Inspiratif Anak",
        "Petualangan Seru",
        "Cerita Teladan",
        "Kisah Menarik",
      ],
      ["Penulis Anak A", "Penulis Anak B", "Penulis Anak C", "Penulis Anak D", "Penulis Anak E"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
    "Bacaan Bermutu": generateBooks(
      600,
      "Bacaan Bermutu",
      [
        "Bacaan Bermutu Terpilih",
        "Koleksi Bacaan Berkualitas",
        "Bacaan Inspiratif",
        "Buku Bermutu Terbaik",
        "Koleksi Premium",
        "Bacaan Pilihan Editor",
        "Seri Bacaan Bermutu",
        "Koleksi Klasik",
        "Bacaan Rekomendasi",
        "Buku Berkualitas",
      ],
      ["Penulis Terpilih A", "Penulis Terpilih B", "Penulis Terpilih C", "Penulis Terpilih D", "Penulis Terpilih E"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
  };

  // Data dummy buku untuk setiap koleksi (30 buku per koleksi)
  const booksByCollection: { [key: string]: Book[] } = {
    "SD / MI": generateBooks(
      700,
      "SD / MI",
      [
        "Matematika SD Kelas 1",
        "Bahasa Indonesia SD",
        "IPA SD Kelas 3",
        "IPS SD",
        "Pendidikan Agama Islam SD",
        "Bahasa Inggris SD",
        "PKN SD",
        "SBdP SD",
        "PJOK SD",
        "Tematik SD",
      ],
      ["Guru SD A", "Guru SD B", "Guru SD C", "Guru SD D", "Guru SD E"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
    "SMP / MTs": generateBooks(
      800,
      "SMP / MTs",
      [
        "Matematika SMP Kelas 7",
        "IPA SMP",
        "Bahasa Indonesia SMP",
        "Bahasa Inggris SMP",
        "IPS SMP",
        "Pendidikan Agama Islam SMP",
        "PKN SMP",
        "Seni Budaya SMP",
        "PJOK SMP",
        "Prakarya SMP",
      ],
      ["Guru SMP A", "Guru SMP B", "Guru SMP C", "Guru SMP D", "Guru SMP E"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
    "SMA / SMK / MA": generateBooks(
      900,
      "SMA / SMK / MA",
      [
        "Fisika SMA Kelas 10",
        "Kimia SMA",
        "Biologi SMA",
        "Matematika SMA",
        "Bahasa Indonesia SMA",
        "Bahasa Inggris SMA",
        "Sejarah SMA",
        "Ekonomi SMA",
        "Geografi SMA",
        "Sosiologi SMA",
      ],
      ["Guru SMA A", "Guru SMA B", "Guru SMA C", "Guru SMA D", "Guru SMA E"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
    "SLB": generateBooks(
      1000,
      "SLB",
      [
        "Buku Pembelajaran SLB",
        "Pendidikan Khusus SLB",
        "Terapi untuk SLB",
        "Metode Pembelajaran SLB",
        "Pendidikan Inklusif",
        "Buku Khusus Anak Berkebutuhan",
        "Panduan Guru SLB",
        "Buku Aktivitas SLB",
        "Pendidikan Karakter SLB",
        "Buku Edukatif SLB",
      ],
      ["Guru SLB A", "Guru SLB B", "Guru SLB C", "Guru SLB D", "Guru SLB E"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
    "PAUD": generateBooks(
      1100,
      "PAUD",
      [
        "Belajar ABC",
        "Mengenal Warna",
        "Mengenal Angka",
        "Belajar Membaca",
        "Belajar Menulis",
        "Cerita untuk PAUD",
        "Pendidikan Karakter PAUD",
        "Buku Aktivitas PAUD",
        "Mengenal Binatang",
        "Mengenal Benda",
      ],
      ["Guru PAUD A", "Guru PAUD B", "Guru PAUD C", "Guru PAUD D", "Guru PAUD E"],
      ["/img/buku1.jpg", "/img/buku2.jpg", "/img/buku3.jpg", "/img/buku4.jpg"]
    ),
  };

  useEffect(() => {
    // Load user from localStorage
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
    setLoading(false);

    // Load books based on category or collection
    if (category && booksByCategory[category]) {
      setBooks(booksByCategory[category]);
    } else if (collection && booksByCollection[collection]) {
      setBooks(booksByCollection[collection]);
    } else {
      setBooks([]);
    }
  }, [category, collection]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-blue-700 text-xl font-semibold">Memuat...</div>
      </div>
    );
  }

  const pageTitle = category || collection || "Buku";
  const pageDescription = category 
    ? `Koleksi buku dalam kategori ${category}`
    : collection
    ? `Koleksi buku untuk ${collection}`
    : "Daftar buku";

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar user={user} />

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-12 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 text-white">
          <Link 
            href="/dashboard/user"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-white mb-4 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Kembali ke Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{pageTitle}</h1>
          <p className="text-blue-100">{pageDescription}</p>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* BOOKS GRID */}
        {books.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition cursor-pointer border border-gray-200 overflow-hidden group"
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs text-gray-600 mb-3">{book.author}</p>
                  <button
                    onClick={() => router.push(`/dashboard/user/book/${book.id}`)}
                    className="w-full px-3 py-2 bg-blue-600 text-white text-sm rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Lihat Buku
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-12 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Belum ada buku tersedia
            </h3>
            <p className="text-gray-600 mb-6">
              Buku untuk kategori/koleksi ini sedang dalam proses pengumpulan.
            </p>
            <Link
              href="/dashboard/user"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        )}

        {/* INFO SECTION */}
        <div className="mt-12 bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="font-bold text-blue-900 mb-2">
            💡 Tips Membaca
          </h3>
          <p className="text-blue-800 text-sm">
            Gunakan fitur pencarian untuk menemukan buku yang Anda cari dengan lebih cepat. 
            Buku digital dapat dibaca kapan saja dan di mana saja.
          </p>
        </div>

      </div>
      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Perpustakaan Digital Taruna Bhakti. All Rights Reserved.
      </footer>
    </div>
  );
}

export default function BooksPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-blue-700 text-xl font-semibold">Memuat...</div>
      </div>
    }>
      <BooksContent />
    </Suspense>
  );
}
