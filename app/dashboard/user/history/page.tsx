"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import UserNavbar from "../../../components/UserNavbar";

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

export default function LoanHistoryPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [loans, setLoans] = useState<Loan[]>([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {}
    }

    const allLoans = loadLoans();
    setLoans(allLoans);
  }, []);

  const userLoans = loans
    .filter((l) => (user?.id ? l.userId === user.id : true))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalLoans = userLoans.length;

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
          <h1 className="text-3xl md:text-4xl font-bold">Riwayat Peminjaman</h1>
          <p className="text-blue-100 mt-1">
            Anda sudah meminjam sebanyak{" "}
            <span className="font-bold">{totalLoans}</span> buku.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {userLoans.length === 0 ? (
          <div className="bg-white rounded-xl shadow border p-8 text-center text-gray-600">
            Belum ada riwayat peminjaman.
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow border p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b">
                    <th className="py-3 pr-4">Buku</th>
                    <th className="py-3 pr-4">Tanggal Ajukan</th>
                    <th className="py-3 pr-4">Durasi</th>
                    <th className="py-3 pr-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {userLoans.map((loan) => {
                    const start = loan.startAt ? new Date(loan.startAt) : null;
                    const end = loan.dueAt ? new Date(loan.dueAt) : null;
                    let duration = "-";
                    if (start && end) {
                      const diffMs = end.getTime() - start.getTime();
                      const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));
                      if (diffDays <= 0) {
                        const diffHours = Math.round(diffMs / (1000 * 60 * 60));
                        duration = `${diffHours} jam`;
                      } else if (diffDays < 30) {
                        duration = `${diffDays} hari`;
                      } else {
                        const diffMonths = Math.round(diffDays / 30);
                        duration = `${diffMonths} bulan`;
                      }
                    }

                    return (
                      <tr key={loan.id} className="border-b last:border-0">
                        <td className="py-3 pr-4">
                          <div className="font-semibold text-gray-800">
                            {loan.bookTitle}
                          </div>
                          <div className="text-xs text-gray-500">
                            ID Buku: {loan.bookId}
                          </div>
                        </td>
                        <td className="py-3 pr-4 text-xs text-gray-700">
                          {new Date(loan.createdAt).toLocaleString()}
                        </td>
                        <td className="py-3 pr-4 text-xs text-gray-700">
                          {duration}
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-center gap-2 text-xs">
                            <span
                              className={`w-3 h-3 rounded-full ${getStatusColor(
                                loan.status
                              )}`}
                            />
                            <span className="text-gray-700">
                              {statusLabelMap[loan.status]}
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <footer className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Perpustakaan Digital Taruna Bhakti. All Rights Reserved.
      </footer>
    </div>
  );
}






