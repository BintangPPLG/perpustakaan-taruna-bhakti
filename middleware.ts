import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Skip semua middleware untuk sementara - hanya allow semua request
  // Ini akan memungkinkan kita debug masalah cookie/auth tanpa gangguan middleware
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
