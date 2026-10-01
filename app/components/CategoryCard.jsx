"use client";

import React from "react";
import { BookOpen } from "lucide-react";

export default function CategoryCard({ title, icon: Icon, color = "bg-blue-600" }) {
  const handleClick = () => {
    const loggedIn = typeof document !== "undefined" && document.cookie.includes("session=");
    if (!loggedIn) {
      window.location.href = "/login";
    } else {
      window.location.href = "/dashboard/user";
    }
  };

  return (
    <div
      onClick={handleClick}
      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
    >
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        {Icon ? <Icon className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
      </div>
      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
        {title}
      </h3>
    </div>
  );
}
