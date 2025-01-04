import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: Promise<{ shortUrl: string }> }) {
  const { shortUrl } = await params;

  try {
    const urlRecord = await prisma.url.findUnique({
      where: { shortUrl }
    });

    if (!urlRecord) {
      console.error(`Short URL not found: ${shortUrl}`);
      return NextResponse.redirect("/", { status: 404 });
    }

    return NextResponse.redirect(urlRecord.originalUrl, { status: 301 });
  } catch (error) {
    console.error("Error fetching short URL:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
