"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UserNavbar from "../../../components/UserNavbar";

interface User {
  id: number;
  nama: string;
  email: string;
  role: string;
  avatar?: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        // Cek localStorage dulu
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setNewName(userData.nama);
          setLoading(false);
        }

        // Verify dengan API
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();

        if (data.success && data.user) {
          setUser(data.user);
          setNewName(data.user.nama);
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      } catch (error) {
        console.error("Error loading user:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function uploadAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Tampilkan preview langsung
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setNewAvatar(previewUrl);
    setSelectedFile(file);
    setHasChanges(true);
  }

  async function saveAllChanges() {
    if (!hasChanges && newName.trim() === user?.nama) {
      alert("Tidak ada perubahan untuk disimpan");
      return;
    }

    setSaving(true);
    let updatedUser = { ...user! };
    let updateSuccess = true;

    try {
      // 1. Upload avatar jika ada perubahan
      if (selectedFile) {
        setUploading(true);
        try {
          const form = new FormData();
          form.append("file", selectedFile);

          const uploadRes = await fetch("/api/user/profile/upload-photo", {
            method: "POST",
            credentials: "include",
            body: form,
          });

          if (uploadRes.ok) {
            const uploadResult = await uploadRes.json();
            if (uploadResult.success && uploadResult.file) {
              updatedUser.avatar = uploadResult.file;
              console.log("✅ Avatar uploaded:", uploadResult.file);
            } else {
              alert(uploadResult.message || "Gagal mengunggah foto profil");
              updateSuccess = false;
            }
          } else {
            alert("Gagal mengunggah foto profil");
            updateSuccess = false;
          }
        } catch (error) {
          console.error("Error uploading avatar:", error);
          alert("Gagal mengunggah foto profil");
          updateSuccess = false;
        } finally {
          setUploading(false);
        }
      }

      // 2. Update nama jika berubah
      if (newName.trim() && newName.trim() !== user?.nama) {
        try {
          const nameRes = await fetch("/api/user/update-name", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ nama: newName.trim() }),
          });

          const contentType = nameRes.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const nameData = await nameRes.json();
            if (nameData.success) {
              updatedUser.nama = newName.trim();
              console.log("✅ Name updated:", newName.trim());
            } else {
              alert(nameData.message || "Gagal memperbarui nama");
              updateSuccess = false;
            }
          }
        } catch (error) {
          console.error("Error updating name:", error);
          alert("Gagal memperbarui nama");
          updateSuccess = false;
        }
      }

      // 3. Update semua perubahan jika berhasil
      if (updateSuccess) {
        setUser(updatedUser);
        setEditing(false);
        setHasChanges(false);
        setPreviewImage(null);
        setNewAvatar(null);
        setSelectedFile(null);

        // Update localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Trigger custom event untuk update di halaman lain
        window.dispatchEvent(new CustomEvent("userUpdated", { detail: updatedUser }));

        alert("Semua perubahan berhasil disimpan! Halaman akan dimuat ulang...");
        
        // Reload setelah 1 detik untuk memastikan semua halaman ter-update
        setTimeout(() => {
          window.location.href = "/dashboard/user";
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Error saving changes:", error);
      alert("Terjadi kesalahan saat menyimpan perubahan");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  }

  // Track changes ketika nama diubah
  useEffect(() => {
    if (editing && newName.trim() !== user?.nama) {
      setHasChanges(true);
    } else if (!editing || newName.trim() === user?.nama) {
      if (!selectedFile) {
        setHasChanges(false);
      }
    }
  }, [newName, editing, user?.nama, selectedFile]);

  const getInitials = (nama?: string) => {
    if (!nama) return "U";
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserNavbar user={user} />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
            <p className="text-gray-600">Memuat profil...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <UserNavbar user={null} />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Tidak dapat memuat data pengguna</p>
            <Link
              href="/dashboard/user"
              className="text-blue-600 hover:underline"
            >
              Kembali ke Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar user={user} />

      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 py-12 shadow-lg">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Profil Saya
          </h1>
          <p className="text-blue-100">Kelola informasi akun Anda</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        
        {/* PROFILE CARD */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-6">
          
          {/* AVATAR SECTION */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-8 py-10 text-center border-b border-gray-200">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                {previewImage || user.avatar ? (
                  <img
                    src={previewImage || user.avatar || ""}
                    alt={user.nama}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getInitials(user.nama)
                )}
              </div>
              
              {uploading && (
                <div className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                </div>
              )}

              <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 1 1 0 001-1h6a1 1 0 001 1 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={uploadAvatar}
                  disabled={uploading}
                />
              </label>
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-800">{user.nama}</h2>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>

          {/* PROFILE INFO */}
          <div className="p-8">
            
            {/* NAMA */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nama Lengkap
              </label>
              {editing ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  placeholder="Masukkan nama lengkap"
                />
              ) : (
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-gray-800">{user.nama}</span>
                  <button
                    onClick={() => {
                      setEditing(true);
                      setNewName(user.nama);
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit
                  </button>
                </div>
              )}
            </div>

            {/* EMAIL */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <span className="text-gray-800">{user.email}</span>
              </div>
            </div>

            {/* ROLE */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Role / Peran
              </label>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <span className="inline-block px-4 py-1 bg-blue-600 text-white rounded-full text-sm font-semibold capitalize">
                  {user.role || "murid"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STATISTIK CARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">0</div>
            <div className="text-sm text-gray-600">Buku Dipinjam</div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">0</div>
            <div className="text-sm text-gray-600">Buku Favorit</div>
          </div>
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">0</div>
            <div className="text-sm text-gray-600">Riwayat Baca</div>
          </div>
        </div>

        {/* SAVE BUTTON */}
        {hasChanges && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-blue-900">Anda memiliki perubahan yang belum disimpan</p>
                <p className="text-sm text-blue-700">Klik "Simpan Perubahan" untuk menyimpan nama dan foto profil</p>
              </div>
              <button
                onClick={saveAllChanges}
                disabled={saving || uploading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {(saving || uploading) ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Menyimpan...
                  </>
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Simpan Perubahan
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/dashboard/user"
            className="flex-1 text-center px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            ← Kembali ke Dashboard
          </Link>
          <button
            onClick={() => {
              localStorage.removeItem("user");
              document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
              window.location.href = "/";
            }}
            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
          >
            🚪 Keluar
          </button>
        </div>

      </div>
    </div>
  );
}
