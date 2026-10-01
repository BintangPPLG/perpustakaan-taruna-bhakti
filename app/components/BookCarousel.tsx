"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, BookOpen, Bookmark, User, CheckCircle2 } from "lucide-react";

export interface BookItem {
  id?: number | string;
  title: string;
  author: string;
  category?: string;
  image?: string;
}

interface BookCarouselProps {
  books?: BookItem[];
}

export default function BookCarousel({ books = [] }: BookCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (!books || books.length === 0) {
    return (
      <div className="w-full py-12 text-center text-slate-500 text-sm">
        Tidak ada buku untuk ditampilkan saat ini.
      </div>
    );
  }

  const safeIndex = ((current % books.length) + books.length) % books.length;
  const currentBook = books[safeIndex];
  const bookId = currentBook.id ?? safeIndex + 1;

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % books.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + books.length) % books.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto py-4">
      {/* CARD CONTENT */}
      <div className="flex flex-col sm:flex-row items-center gap-6 p-4 sm:p-6 bg-slate-50 rounded-2xl border border-slate-200 shadow-2xs">
        
        {/* BOOK COVER GRAPHIC */}
        <div className="w-36 h-48 sm:w-44 sm:h-60 shrink-0 rounded-xl bg-gradient-to-br from-blue-800 via-indigo-900 to-slate-950 p-4 text-white flex flex-col justify-between shadow-md border border-blue-500/20">
          <div className="text-[10px] uppercase font-semibold text-blue-300 tracking-wider">
            SMK TB Depok
          </div>
          <div className="text-center my-auto">
            <BookOpen className="w-8 h-8 text-blue-200 mx-auto mb-2 opacity-80" />
            <span className="text-[10px] text-slate-300 line-clamp-2">
              Koleksi Terverifikasi
            </span>
          </div>
          <div className="text-[9px] text-slate-400 font-mono">
            ID: TB-{bookId}
          </div>
        </div>

        {/* BOOK DETAILS */}
        <div className="flex-1 flex flex-col justify-between text-left space-y-3">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-[11px] font-medium">
              {currentBook.category || "Modul Kejuruan"}
            </span>
            <h3 className="text-lg font-semibold text-slate-900 mt-2 leading-snug">
              {currentBook.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" />
              <span>Penulis: {currentBook.author}</span>
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Format Digital Tersedia</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Dapat dibaca secara langsung atau dipinjam melalui akun siswa/guru SMK Taruna Bhakti.
            </p>
          </div>

          <div className="pt-2 flex items-center gap-3">
            <Link
              href={`/dashboard/user/book/${bookId}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-medium shadow-xs transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Baca &amp; Detail Buku</span>
            </Link>
          </div>
        </div>

      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between mt-4 px-2">
        <button
          onClick={prevSlide}
          className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-2xs transition-colors"
          aria-label="Buku sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-xs text-slate-500 font-medium">
          {safeIndex + 1} dari {books.length}
        </span>

        <button
          onClick={nextSlide}
          className="p-2 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 shadow-2xs transition-colors"
          aria-label="Buku berikutnya"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
