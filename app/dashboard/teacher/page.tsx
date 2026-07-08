"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserNavbar from "../../components/UserNavbar";

interface UserType {
  id?: number;
  nama?: string;
  email?: string;
  role?: string;
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

const statusLabelMap: Record<LoanStatus, string> = {
  pending_approval: "Menunggu persetujuan guru",
  waiting_pickup: "Disetujui, menunggu diambil",
  waiting_schedule: "Sudah diambil, atur jadwal peminjaman",
  active: "Sedang dipinjam",
  completed: "Selesai tepat waktu",
  late: "Terlambat, terkena denda",
  cancelled: "Dibatalkan",
};

export default function TeacherDashboardPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {}
    }
    setLoans(loadLoans());
  }, []);

  const pendingLoans = loans.filter((l) => l.status === "pending_approval");
  const waitingPickup = loans.filter((l) => l.status === "waiting_pickup");

  const handleApprove = (id: string) => {
    const updated: Loan[] = loans.map((l) =>
      l.id === id ? { ...l, status: "waiting_pickup", approvedAt: new Date().toISOString() } : l
    );
    setLoans(updated);
    saveLoans(updated);
  };

  const handleReject = (id: string) => {
    const updated: Loan[] = loans.map((l) =>
      l.id === id ? { ...l, status: "cancelled" } : l
    );
    setLoans(updated);
    saveLoans(updated);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar user={user} />

      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold">Dashboard Guru</h1>
          <p className="text-blue-100 mt-1">
            Mengelola persetujuan peminjaman buku siswa.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        <section className="bg-white rounded-xl shadow border p-5">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Permintaan Peminjaman (Menunggu Persetujuan)
          </h2>
          {pendingLoans.length === 0 ? (
            <p className="text-gray-600 text-sm">
              Belum ada permintaan peminjaman baru.
            </p>
          ) : (
            <div className="space-y-3">
              {pendingLoans.map((loan) => (
                <div
                  key={loan.id}
                  className="border rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {loan.bookTitle}
                    </p>
                    <p className="text-gray-600">
                      Diminta oleh{" "}
                      <span className="font-medium">
                        {loan.userName || "Siswa"}
                      </span>{" "}
                      pada{" "}
                      {new Date(loan.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(loan.id)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(loan.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg text-xs font-semibold hover:bg-red-600 transition"
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-xl shadow border p-5">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Peminjaman Disetujui (Menunggu Diambil)
          </h2>
          {waitingPickup.length === 0 ? (
            <p className="text-gray-600 text-sm">
              Tidak ada peminjaman yang menunggu diambil.
            </p>
          ) : (
            <div className="space-y-3">
              {waitingPickup.map((loan) => (
                <div
                  key={loan.id}
                  className="border rounded-lg p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2 text-sm"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {loan.bookTitle}
                    </p>
                    <p className="text-gray-600">
                      Siswa:{" "}
                      <span className="font-medium">
                        {loan.userName || "Siswa"}
                      </span>
                    </p>
                    <p className="text-gray-500 text-xs">
                      Disetujui pada{" "}
                      {loan.approvedAt
                        ? new Date(loan.approvedAt).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span
                      className={`w-3 h-3 rounded-full ${getStatusColor(
                        loan.status
                      )}`}
                    />
                    {statusLabelMap[loan.status]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-blue-50 rounded-xl border border-blue-200 p-5 text-sm text-blue-900">
          <h2 className="font-semibold mb-2">Catatan</h2>
          <p>
            Ini adalah simulasi alur persetujuan menggunakan{" "}
            <span className="font-semibold">localStorage</span> pada browser
            yang sama. Untuk produksi, alur ini bisa dihubungkan ke database
            sesuai kebutuhan sekolah.
          </p>
        </section>
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Perpustakaan Digital Taruna Bhakti. All Rights Reserved.
      </footer>
    </div>
  );
}




