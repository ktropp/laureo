import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import mime from "mime-types";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {

  try {
    // Go from src/apps/cdn/app → project root → uploads/
    const filePath = path.join(process.cwd(), "../../../uploads", ...params.path);
    const fileBuffer = await fs.readFile(filePath).catch(() => null);

    if (!fileBuffer) {
      console.warn("File not found:", filePath);
      return new NextResponse("Not found", { status: 404 });
    }

    const mimeType = mime.lookup(filePath) || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("CDN error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
