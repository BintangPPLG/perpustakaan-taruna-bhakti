import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perpustakaan Digital SMK Taruna Bhakti Depok | Yayasan Setya Bhakti",
  description:
    "Portal resmi perpustakaan dan literasi digital SMK Taruna Bhakti Depok. Akses koleksi modul kejuruan RPL, TKJ, DKV, BC, TEI, dan buku kurikulum.",
  icons: {
    icon: "/logo-taruna.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${plusJakartaSans.variable} font-sans antialiased bg-slate-50 text-slate-800 selection:bg-blue-600 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
