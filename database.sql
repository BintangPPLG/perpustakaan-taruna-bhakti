-- =========================================
-- 1. MENENTUKAN ENTITAS DAN RELASI
-- =========================================
-- Entitas:
--   - users (murid, admin, petugas/guru)
--   - books (buku perpustakaan)
--   - book_loans (peminjaman buku)
--
-- Relasi:
--   - users (1) -> (N) book_loans (Foreign Key: user_id)
--   - books (1) -> (N) book_loans (Foreign Key: book_id)
-- =========================================

CREATE DATABASE IF NOT EXISTS perpustakaan_tb;

USE perpustakaan_tb;

-- =========================================
-- 2. MEMBUAT STRUKTUR SCHEMA (DATABASE & TABLE)
-- =========================================

-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('murid', 'admin', 'petugas') DEFAULT 'murid',
  avatar VARCHAR(255) DEFAULT '/img/default-avatar.png',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel books
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  judul VARCHAR(255) NOT NULL,
  penulis VARCHAR(255),
  kategori VARCHAR(100),
  deskripsi TEXT,
  image VARCHAR(255),
  tahun_terbit INT,
  rating DECIMAL(3,2) DEFAULT 0.00,
  favorit_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel book_loans
CREATE TABLE IF NOT EXISTS book_loans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  book_id INT NOT NULL,
  borrow_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  approved_at DATETIME NULL,
  pickup_confirmed_at DATETIME NULL,
  start_at DATETIME NULL,
  return_deadline DATETIME NULL,
  return_date DATETIME NULL,
  status ENUM('pending_approval', 'waiting_pickup', 'waiting_schedule', 'ongoing', 'completed', 'late', 'cancelled') DEFAULT 'pending_approval',
  denda DECIMAL(10,2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Index untuk performa query
CREATE INDEX IF NOT EXISTS idx_user_id ON book_loans(user_id);
CREATE INDEX IF NOT EXISTS idx_book_id ON book_loans(book_id);
CREATE INDEX IF NOT EXISTS idx_status ON book_loans(status);

-- =========================================
-- 3. MEMASUKKAN DATA KE DALAM DATABASE
-- =========================================

-- Data Admin (password: admin123 - plain text untuk testing, bisa di-hash nanti)
INSERT INTO users (nama, email, password, role) 
VALUES ('Admin Perpustakaan', 'admin@tarunabhakti.sch.id', 'admin123', 'admin')
ON DUPLICATE KEY UPDATE nama=nama;

-- Data Guru/Petugas (password: guru123 - plain text untuk testing)
INSERT INTO users (nama, email, password, role) 
VALUES ('Guru Perpustakaan', 'guru@tarunabhakti.sch.id', 'guru123', 'petugas')
ON DUPLICATE KEY UPDATE nama=nama;

-- Data Murid contoh
INSERT INTO users (nama, email, password, role) 
VALUES ('Siswa Contoh', 'siswa@tarunabhakti.sch.id', 'siswa123', 'murid')
ON DUPLICATE KEY UPDATE nama=nama;

-- Data Buku contoh
INSERT INTO books (judul, penulis, kategori, deskripsi, image, tahun_terbit, rating) VALUES
('Rahasia Hujan', 'Ayu Lestari', 'Fiksi', 'Novel tentang perjalanan hidup seorang remaja', '/img/buku1.jpg', 2023, 4.5),
('Dunia Kecilku', 'Raihan Putra', 'Fiksi', 'Kisah inspiratif tentang persahabatan', '/img/buku2.jpg', 2022, 4.3),
('Si Penjelajah', 'Dimas Ardi', 'Petualangan', 'Petualangan seru di hutan belantara', '/img/buku3.jpg', 2024, 4.7),
('Ilmu Sains Mudah', 'Rani', 'Pendidikan', 'Buku pembelajaran sains untuk siswa', '/img/buku4.jpg', 2023, 4.2)
ON DUPLICATE KEY UPDATE judul=judul;

-- =========================================
-- 4. QUERY JOIN TABLE (UNTUK TABLE YANG MEMILIKI RELASI)
-- =========================================

-- Query: Tampilkan semua peminjaman dengan detail user dan buku
-- SELECT 
--   bl.id AS loan_id,
--   u.nama AS nama_peminjam,
--   u.email AS email_peminjam,
--   b.judul AS judul_buku,
--   b.penulis AS penulis_buku,
--   bl.borrow_date AS tanggal_pinjam,
--   bl.return_deadline AS batas_kembali,
--   bl.status AS status_peminjaman
-- FROM book_loans bl
-- INNER JOIN users u ON bl.user_id = u.id
-- INNER JOIN books b ON bl.book_id = b.id
-- ORDER BY bl.created_at DESC;

-- Query: Tampilkan peminjaman yang sedang aktif dengan detail lengkap
-- SELECT 
--   bl.id,
--   u.nama AS peminjam,
--   b.judul AS buku,
--   bl.start_at AS mulai_pinjam,
--   bl.return_deadline AS batas_kembali,
--   bl.status
-- FROM book_loans bl
-- JOIN users u ON bl.user_id = u.id
-- JOIN books b ON bl.book_id = b.id
-- WHERE bl.status IN ('ongoing', 'waiting_pickup', 'waiting_schedule')
-- ORDER BY bl.return_deadline ASC;

-- Query: Tampilkan history peminjaman user tertentu
-- SELECT 
--   bl.id,
--   b.judul,
--   b.penulis,
--   bl.borrow_date,
--   bl.return_date,
--   bl.status,
--   DATEDIFF(bl.return_date, bl.start_at) AS durasi_hari
-- FROM book_loans bl
-- JOIN books b ON bl.book_id = b.id
-- WHERE bl.user_id = 1
-- ORDER BY bl.created_at DESC;

-- =========================================
-- 5. MEMBUAT VIEW (UNTUK JOIN TABLE)
-- =========================================

-- View: Detail Peminjaman Lengkap
CREATE OR REPLACE VIEW vw_loan_details AS
SELECT 
  bl.id AS loan_id,
  u.id AS user_id,
  u.nama AS nama_peminjam,
  u.email AS email_peminjam,
  u.role AS role_peminjam,
  b.id AS book_id,
  b.judul AS judul_buku,
  b.penulis AS penulis_buku,
  b.kategori AS kategori_buku,
  bl.borrow_date AS tanggal_pinjam,
  bl.approved_at AS tanggal_disetujui,
  bl.pickup_confirmed_at AS tanggal_diambil,
  bl.start_at AS mulai_pinjam,
  bl.return_deadline AS batas_kembali,
  bl.return_date AS tanggal_kembali,
  bl.status AS status_peminjaman,
  bl.denda AS denda,
  bl.created_at AS created_at,
  bl.updated_at AS updated_at
FROM book_loans bl
INNER JOIN users u ON bl.user_id = u.id
INNER JOIN books b ON bl.book_id = b.id;

-- View: Peminjaman Aktif
CREATE OR REPLACE VIEW vw_active_loans AS
SELECT 
  loan_id,
  nama_peminjam,
  email_peminjam,
  judul_buku,
  penulis_buku,
  mulai_pinjam,
  batas_kembali,
  status_peminjaman,
  DATEDIFF(batas_kembali, NOW()) AS sisa_hari
FROM vw_loan_details
WHERE status_peminjaman IN ('ongoing', 'waiting_pickup', 'waiting_schedule')
ORDER BY batas_kembali ASC;

-- View: History Peminjaman Selesai
CREATE OR REPLACE VIEW vw_completed_loans AS
SELECT 
  loan_id,
  nama_peminjam,
  judul_buku,
  tanggal_pinjam,
  tanggal_kembali,
  status_peminjaman,
  denda,
  DATEDIFF(tanggal_kembali, mulai_pinjam) AS durasi_hari
FROM vw_loan_details
WHERE status_peminjaman IN ('completed', 'late')
ORDER BY tanggal_kembali DESC;

-- =========================================
-- VERIFIKASI
-- =========================================

SHOW TABLES;

-- Cek data users
SELECT id, nama, email, role FROM users;

-- Cek data books
SELECT id, judul, penulis, kategori FROM books;

-- Cek view
SHOW FULL TABLES WHERE Table_type = 'VIEW';
