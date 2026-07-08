import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full p-4 bg-blue-800 text-white flex justify-between items-center gap-4">
      {/* Logo / Judul */}
      <h1 className="text-xl font-bold">Perpustakaan TB</h1>

      {/* Search Bar */}
      <div className="flex-1 flex justify-center">
        <input
          type="text"
          placeholder="Cari buku..."
          className="w-1/2 px-3 py-2 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Login Button */}
      <Link
        href="/login"
        className="px-4 py-2 bg-white text-blue-800 rounded-lg font-semibold hover:bg-gray-100"
      >
        Login
      </Link>
    </nav>
  );
}
