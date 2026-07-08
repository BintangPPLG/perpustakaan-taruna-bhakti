import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as File;

  if (!file) {
    return NextResponse.json({ success: false, message: "File not found" });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(process.cwd(), "public/uploads", fileName);

  fs.writeFileSync(filePath, buffer);

  return NextResponse.json({
    success: true,
    file: `/uploads/${fileName}`,
  });
}
