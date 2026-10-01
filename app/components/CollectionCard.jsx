"use client";

import React from "react";
import { ChevronRight } from "lucide-react";

export default function CollectionCard({ title, desc }) {
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
      className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex items-center justify-between group"
    >
      <div className="space-y-1">
        <h3 className="text-sm font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      </div>
      <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-700 flex items-center justify-center shrink-0 ml-3 transition-colors">
        <ChevronRight className="w-4 h-4" />
      </div>
    </div>
  );
}
