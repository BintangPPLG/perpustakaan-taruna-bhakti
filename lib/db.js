import mysql from "mysql2/promise";

export const db = mysql.createPool({
  host: "localhost",
  user: "root",         // ganti kalau pakai user lain
  password: "",         // isi password MySQL kamu
  database: "perpustakaan_tb",
});
