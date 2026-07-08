"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import UserNavbar from "../../../../components/UserNavbar";

interface UserType {
  id?: number;
  nama?: string;
  email?: string;
  role?: string;
}

interface BookDetail {
  id: number;
  title: string;
  author: string;
  image: string;
  synopsis: string;
  rating: number;
  year: number;
}

type LoanStatus =
  | "pending_approval"
  | "waiting_pickup"
  | "waiting_schedule"
  | "active"
  | "completed"
  | "late"
  | "cancelled";

interface Loan {
  id: string;
  userId: number | undefined;
  userName: string | undefined;
  bookId: number;
  bookTitle: string;
  createdAt: string;
  approvedAt?: string;
  pickupConfirmedAt?: string;
  startAt?: string;
  dueAt?: string;
  returnedAt?: string;
  status: LoanStatus;
}

function loadLoans(): Loan[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("loans");
    if (!raw) return [];
    return JSON.parse(raw) as Loan[];
  } catch {
    return [];
  }
}

function saveLoans(loans: Loan[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem("loans", JSON.stringify(loans));
}

function getStatusColor(status: LoanStatus) {
  if (status === "late" || status === "cancelled") return "bg-red-500";
  if (status === "active" || status === "waiting_pickup" || status === "waiting_schedule")
    return "bg-yellow-400";
  if (status === "completed") return "bg-green-500";
  return "bg-gray-400";
}

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [book, setBook] = useState<BookDetail | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const bookId = useMemo(() => {
    const rawId = Array.isArray(params?.id) ? params.id[0] : params?.id;
    return Number(rawId) || 1;
  }, [params]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {}
    }
    setLoans(loadLoans());

    const detail: BookDetail = {
      id: bookId,
      title: `Buku #${bookId}`,
      author: "Penulis",
      image: `https://picsum.photos/seed/book${bookId}/400/600`,
      synopsis:
        "Ini adalah sinopsis singkat buku sebagai contoh tampilan. Konten lengkap akan ditambahkan ketika data tersedia.",
      rating: 4.5,
      year: 2024,
    };
    setBook(detail);
  }, [bookId]);

  const activeLoanForUser = useMemo(() => {
    if (!user) return undefined;
    const now = new Date();
    return loans
      .filter((l) => l.userId === user.id && l.bookId === bookId)
      .map((l) => {
        if (l.dueAt && !l.returnedAt && (l.status === "active" || l.status === "waiting_schedule")) {
          const due = new Date(l.dueAt);
          if (now > due && l.status !== "late") {
            l.status = "late";
          }
        }
        return l;
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];
  }, [loans, user, bookId]);

  const handleRequestLoan = () => {
    if (!user || !book) return;

    const newLoan: Loan = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      userId: user.id,
      userName: user.nama,
      bookId: book.id,
      bookTitle: book.title,
      createdAt: new Date().toISOString(),
      status: "pending_approval",
    };

    const updated = [newLoan, ...loans];
    setLoans(updated);
    saveLoans(updated);
    alert("Berhasil mengajukan peminjaman. Menunggu approval guru.");
  };

  const handleConfirmPickup = () => {
    if (!activeLoanForUser) return;
    const updated = loans.map((l) =>
      l.id === activeLoanForUser.id
        ? { ...l, status: "waiting_schedule", pickupConfirmedAt: new Date().toISOString() }
        : l
    );
    setLoans(updated);
    saveLoans(updated);
  };

  const handleSetSchedule = () => {
    if (!activeLoanForUser || !startDate || !endDate) return;
    const updated = loans.map((l) =>
      l.id === activeLoanForUser.id
        ? { ...l, status: "active", startAt: startDate, dueAt: endDate }
        : l
    );
    setLoans(updated);
    saveLoans(updated);
  };

  const handleFinishLoan = () => {
    if (!activeLoanForUser) return;
    const updated = loans.map((l) => {
      if (l.id !== activeLoanForUser.id) return l;
      const now = new Date();
      let status: LoanStatus = "completed";
      if (l.dueAt && now > new Date(l.dueAt)) status = "late";
      return { ...l, status, returnedAt: now.toISOString() };
    });
    setLoans(updated);
    saveLoans(updated);
  };

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-blue-700 text-xl font-semibold">Memuat...</div>
      </div>
    );
  }

  const statusLabelMap: Record<LoanStatus, string> = {
    pending_approval: "Menunggu persetujuan guru",
    waiting_pickup: "Disetujui, menunggu diambil",
    waiting_schedule: "Sudah diambil, atur jadwal peminjaman",
    active: "Sedang dipinjam",
    completed: "Selesai tepat waktu",
    late: "Terlambat, terkena denda",
    cancelled: "Dibatalkan",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar user={user} />

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-10 shadow-lg">
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
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            {book.title}
            <span className="text-sm bg-yellow-400 text-blue-900 px-3 py-1 rounded-full font-semibold">
              Rating {book.rating.toFixed(1)}
            </span>
          </h1>
          <p className="text-blue-100 mt-1">
            Detail buku, sinopsis, dan informasi peminjaman.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="mt-4 bg-white rounded-xl shadow border p-4 text-sm text-gray-700">
              <p className="mb-1">
                <span className="font-semibold">Pembuat:</span> {book.author}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Tahun Terbit:</span> {book.year}
              </p>
              <p className="mb-1">
                <span className="font-semibold">Kategori:</span> Umum
              </p>
              <p className="mb-1">
                <span className="font-semibold">Bahasa:</span> Indonesia
              </p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow p-5 border">
              <h3 className="font-semibold text-blue-800 mb-2">Sinopsis</h3>
              <p className="text-gray-700 leading-relaxed">{book.synopsis}</p>
            </div>

            <div className="bg-white rounded-xl shadow p-5 border space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-blue-800">
                  Peminjaman Buku
                </h3>
                {activeLoanForUser && (
                  <span className="flex items-center gap-2 text-xs text-gray-600">
                    <span
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        activeLoanForUser.status
                      )}`}
                    />
                    {statusLabelMap[activeLoanForUser.status]}
                  </span>
                )}
              </div>

              {!activeLoanForUser && (
                <button
                  onClick={handleRequestLoan}
                  className="px-5 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition w-full md:w-auto"
                >
                  Ajukan Peminjaman Buku
                </button>
              )}

              {activeLoanForUser && activeLoanForUser.status === "pending_approval" && (
                <p className="text-sm text-gray-700">
                  Permintaan peminjaman Anda sudah tercatat dan{" "}
                  <span className="font-semibold text-blue-700">
                    menunggu persetujuan guru
                  </span>
                  .
                </p>
              )}

              {activeLoanForUser && activeLoanForUser.status === "waiting_pickup" && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    Guru sudah menyetujui peminjaman. Silakan ambil buku di perpustakaan.
                  </p>
                  <button
                    onClick={handleConfirmPickup}
                    className="px-5 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition w-full md:w-auto"
                  >
                    Saya sudah mengambil buku
                  </button>
                </div>
              )}

              {activeLoanForUser && activeLoanForUser.status === "waiting_schedule" && (
                <div className="space-y-3">
                  <p className="text-sm text-gray-700">
                    Atur tanggal mulai dan selesai peminjaman buku.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex flex-col items-start">
                      <label className="font-medium mb-1 text-gray-700">
                        Tanggal & waktu mulai
                      </label>
                      <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm text-black"
                      />
                    </div>
                    <div className="flex flex-col items-start">
                      <label className="font-medium mb-1 text-gray-700">
                        Tanggal & waktu selesai
                      </label>
                      <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2 text-sm text-black"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSetSchedule}
                    className="px-5 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition w-full md:w-auto"
                  >
                    Simpan Jadwal Peminjaman
                  </button>
                </div>
              )}

              {activeLoanForUser && (activeLoanForUser.status === "active" || activeLoanForUser.status === "late") && (
                <div className="space-y-3 text-sm text-gray-700">
                  {activeLoanForUser.startAt && (
                    <p>
                      Mulai dipinjam:{" "}
                      <span className="font-semibold">
                        {new Date(activeLoanForUser.startAt).toLocaleString()}
                      </span>
                    </p>
                  )}
                  {activeLoanForUser.dueAt && (
                    <p>
                      Batas waktu pengembalian:{" "}
                      <span className="font-semibold">
                        {new Date(activeLoanForUser.dueAt).toLocaleString()}
                      </span>
                    </p>
                  )}
                  {activeLoanForUser.dueAt && (
                    <p>
                      Sisa waktu:{" "}
                      <span className="font-semibold">
                        {(() => {
                          const now = new Date();
                          const due = new Date(activeLoanForUser.dueAt!);
                          const diffMs = due.getTime() - now.getTime();
                          const diffHours = Math.round(diffMs / (1000 * 60 * 60));
                          if (diffMs <= 0) {
                            return "Lewat dari batas waktu";
                          }
                          if (diffHours < 24) {
                            return `${diffHours} jam lagi`;
                          }
                          const diffDays = Math.round(diffHours / 24);
                          return `${diffDays} hari lagi`;
                        })()}
                      </span>
                    </p>
                  )}
                  <button
                    onClick={handleFinishLoan}
                    className="px-5 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition w-full md:w-auto"
                  >
                    Selesai & Kembalikan Buku
                  </button>
                </div>
              )}

              {activeLoanForUser && activeLoanForUser.status === "completed" && (
                <p className="text-sm text-green-700">
                  Terima kasih, Anda telah mengembalikan buku tepat waktu.
                </p>
              )}

              {activeLoanForUser && activeLoanForUser.status === "late" && activeLoanForUser.returnedAt && (
                <p className="text-sm text-red-600">
                  Peminjaman selesai namun melewati batas waktu,{" "}
                  <span className="font-semibold">berpotensi terkena denda</span>.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => router.back()}
                className="px-5 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Perpustakaan Digital Taruna Bhakti. All Rights Reserved.
      </footer>
    </div>
  );
}
