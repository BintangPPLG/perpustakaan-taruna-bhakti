"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BookCarousel({ books = [] }) {
  const [current, setCurrent] = useState(0);

  if (!books || books.length === 0) {
    return (
      <div className="w-full py-8 text-center text-gray-500">
        Tidak ada buku untuk ditampilkan.
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
    <div className="relative w-full">
      {/* BUKU */}
      <div className="flex justify-center items-center">
        <div className="text-center">
          <img
            src={currentBook.image}
            alt={currentBook.title}
            className="w-48 h-64 object-cover rounded-xl shadow-md mx-auto"
          />
          <h3 className="font-bold text-lg mt-3 text-blue-900">
            {currentBook.title}
          </h3>
          <p className="text-gray-600 text-sm">{currentBook.author}</p>

          <Link
            href={`/dashboard/user/book/${bookId}`}
            className="inline-block mt-3 px-4 py-2 bg-blue-700 text-white rounded-lg shadow hover:bg-blue-800"
          >
            Lihat Buku
          </Link>
        </div>
      </div>

      {/* TOMBOL NEXT & PREV */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 -translate-y-1/2 px-3 py-2 bg-blue-600 text-white rounded-r-lg shadow"
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 -translate-y-1/2 px-3 py-2 bg-blue-600 text-white rounded-l-lg shadow"
      >
        ›
      </button>
    </div>
  );
}
