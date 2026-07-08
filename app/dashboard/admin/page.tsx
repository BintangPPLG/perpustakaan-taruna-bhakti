"use client";

import { useEffect, useState } from "react";
import UserNavbar from "../../components/UserNavbar";

interface UserType {
  id?: number;
  nama?: string;
  email?: string;
  role?: string;
}

interface Teacher {
  id: string;
  name: string;
  email: string;
}

interface SimpleBook {
  id: string;
  title: string;
  author: string;
  category?: string;
}

function loadTeachers(): Teacher[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("teachers");
    if (!raw) return [];
    return JSON.parse(raw) as Teacher[];
  } catch {
    return [];
  }
}

function saveTeachers(teachers: Teacher[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("teachers", JSON.stringify(teachers));
}

function loadCustomBooks(): SimpleBook[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("customBooks");
    if (!raw) return [];
    return JSON.parse(raw) as SimpleBook[];
  } catch {
    return [];
  }
}

function saveCustomBooks(books: SimpleBook[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("customBooks", JSON.stringify(books));
}

export default function AdminDashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [books, setBooks] = useState<SimpleBook[]>([]);

  const [teacherName, setTeacherName] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");

  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [bookCategory, setBookCategory] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {}
    }

    setTeachers(loadTeachers());
    setBooks(loadCustomBooks());
  }, []);

  const handleAddTeacher = () => {
    if (!teacherName.trim() || !teacherEmail.trim()) return;
    const newTeacher: Teacher = {
      id: `${Date.now()}`,
      name: teacherName.trim(),
      email: teacherEmail.trim(),
    };
    const updated = [...teachers, newTeacher];
    setTeachers(updated);
    saveTeachers(updated);
    setTeacherName("");
    setTeacherEmail("");
  };

  const handleAddBook = () => {
    if (!bookTitle.trim() || !bookAuthor.trim()) return;
    const newBook: SimpleBook = {
      id: `${Date.now()}`,
      title: bookTitle.trim(),
      author: bookAuthor.trim(),
      category: bookCategory.trim() || undefined,
    };
    const updated = [...books, newBook];
    setBooks(updated);
    saveCustomBooks(updated);
    setBookTitle("");
    setBookAuthor("");
    setBookCategory("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar user={user} />

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard Admin</h1>
          <p className="text-blue-100 mt-1">
            Memantau transaksi dan mengelola guru serta data buku sederhana.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <section className="bg-white rounded-xl shadow border p-5">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Tambah Guru
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-sm">
            <input
              type="text"
              placeholder="Nama guru"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              className="border rounded-lg px-3 py-2 text-black"
            />
            <input
              type="email"
              placeholder="Email guru"
              value={teacherEmail}
              onChange={(e) => setTeacherEmail(e.target.value)}
              className="border rounded-lg px-3 py-2 text-black"
            />
            <button
              onClick={handleAddTeacher}
              className="px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
            >
              Simpan Guru
            </button>
          </div>
          <div className="text-xs text-gray-500 mb-2">
            Data ini hanya disimpan di browser (localStorage) sebagai simulasi.
          </div>
          <div className="space-y-1 text-sm">
            {teachers.length === 0 ? (
              <p className="text-gray-600">Belum ada data guru.</p>
            ) : (
              teachers.map((t) => (
                <div
                  key={t.id}
                  className="border rounded-lg px-3 py-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-gray-600">{t.email}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow border p-5">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Tambah Buku Sederhana
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 text-sm">
            <input
              type="text"
              placeholder="Judul buku"
              value={bookTitle}
              onChange={(e) => setBookTitle(e.target.value)}
              className="border rounded-lg px-3 py-2 text-black"
            />
            <input
              type="text"
              placeholder="Penulis"
              value={bookAuthor}
              onChange={(e) => setBookAuthor(e.target.value)}
              className="border rounded-lg px-3 py-2 text-black"
            />
            <input
              type="text"
              placeholder="Kategori (opsional)"
              value={bookCategory}
              onChange={(e) => setBookCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 text-black"
            />
          </div>
          <button
            onClick={handleAddBook}
            className="px-4 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Simpan Buku
          </button>

          <div className="mt-4 text-xs text-gray-500 mb-2">
            Buku-buku ini hanya contoh dan tidak langsung masuk ke daftar kategori.
          </div>
          <div className="space-y-1 text-sm max-h-64 overflow-y-auto">
            {books.length === 0 ? (
              <p className="text-gray-600">Belum ada buku tambahan.</p>
            ) : (
              books.map((b) => (
                <div
                  key={b.id}
                  className="border rounded-lg px-3 py-2 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{b.title}</p>
                    <p className="text-xs text-gray-600">
                      {b.author} {b.category ? `• ${b.category}` : ""}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="bg-blue-50 rounded-xl border border-blue-200 p-5 text-sm text-blue-900">
          <h2 className="font-semibold mb-2">Monitoring Transaksi</h2>
          <p className="mb-1">
            Data transaksi peminjaman bisa dilihat secara detail di dashboard guru
            dan halaman riwayat peminjaman user.
          </p>
          <p>
            Untuk implementasi penuh, data di halaman ini dapat dihubungkan ke
            database perpustakaan sesuai kebutuhan sekolah.
          </p>
        </section>
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Perpustakaan Digital Taruna Bhakti. All Rights Reserved.
      </footer>
    </div>
  );
}



