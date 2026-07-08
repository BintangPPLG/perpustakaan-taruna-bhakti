import { jwtVerify } from "jose";

// Secret key yang sama untuk semua
const SECRET = process.env.JWT_SECRET || "perpustakaan-taruna-bhakti-secret-key-2024";

export const JWT_CONFIG = {
  cookieName: "session",
  key: new TextEncoder().encode(SECRET),
  expiresIn: "7d",
  isProduction: process.env.NODE_ENV === "production",
};

export async function verifyToken(token: string) {
  try {
    if (!token) return null;
    const { payload } = await jwtVerify(token, JWT_CONFIG.key);
    return payload as {
      id: number;
      nama: string;
      email: string;
      role: string;
      iat?: number;
      exp?: number;
    };
  } catch (err) {
    console.error("Token verification error:", err);
    return null;
  }
}
