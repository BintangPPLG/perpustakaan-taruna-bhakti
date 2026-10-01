"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu, X, BookOpen, UserPlus } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO & BRAND */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-xs border border-slate-200/80 bg-white p-1 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo-taruna.jpg"
                alt="Logo SMK Taruna Bhakti Depok"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                SMK Taruna Bhakti
              </span>
              <span className="text-xs font-medium text-blue-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                Perpustakaan Digital
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 rounded-lg transition-colors"
            >
              Beranda
            </Link>
            <Link
              href="#kategori"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 rounded-lg transition-colors"
            >
              Kategori Kejuruan
            </Link>
            <Link
              href="#buku"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 rounded-lg transition-colors"
            >
              Koleksi Populer
            </Link>
            <Link
              href="#berita"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 rounded-lg transition-colors"
            >
              Berita & Agenda
            </Link>
            <Link
              href="#fasilitas"
              className="px-3.5 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-100/70 rounded-lg transition-colors"
            >
              Layanan & Jam Buka
            </Link>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition-all"
            >
              <LogIn className="w-4 h-4 text-slate-500" />
              <span>Masuk</span>
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 active:scale-98 rounded-lg shadow-xs hover:shadow-sm transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar Akun</span>
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="flex md:hidden items-center gap-2">
            <Link
              href="/login"
              className="px-3 py-1.5 text-xs font-medium text-blue-700 border border-blue-200 rounded-lg"
            >
              Masuk
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Buka menu navigasi"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-2 animate-fade-in">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 hover:text-blue-700"
          >
            Beranda
          </Link>
          <Link
            href="#kategori"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 hover:text-blue-700"
          >
            Kategori Kejuruan
          </Link>
          <Link
            href="#buku"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 hover:text-blue-700"
          >
            Koleksi Populer
          </Link>
          <Link
            href="#berita"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 hover:text-blue-700"
          >
            Berita & Agenda
          </Link>
          <Link
            href="#fasilitas"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-800 hover:bg-slate-50 hover:text-blue-700"
          >
            Layanan & Jam Buka
          </Link>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-slate-800 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              <LogIn className="w-4 h-4" />
              <span>Masuk Siswa / Guru</span>
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
            >
              <UserPlus className="w-4 h-4" />
              <span>Daftar Akun Baru</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
