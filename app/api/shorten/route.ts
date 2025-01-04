import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { originalUrl } = body;

    if (!originalUrl || typeof originalUrl !== "string") {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    const shortUrl = nanoid(8);

    const newUrl = await prisma.url.create({
      data: { originalUrl, shortUrl }
    });

    return NextResponse.json({
      shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${newUrl.shortUrl}`
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Failed to shorten URL", error: error.message },
        { status: 500 }
      );
    }
  }
}

export async function GET() {
  try {
    const shortUrl = await prisma.url.findMany();
    return NextResponse.json(shortUrl, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: "Failed to fetch data", message: error.message },
        { status: 500 }
      );
    }
  }
}
