import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, imageUrl } = body;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    console.log(`https://${process.env.BUCKET_NAME}.${imageUrl}`);

    const playlist = await prismadb.playlist.create({
      data: {
        userId: currentUser.id,
        title,
        image: `https://${process.env.BUCKET_NAME}.${imageUrl}`,
      },
    });

    return NextResponse.json(playlist);
  } catch (error) {
    console.log("[PLAYLIST_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const playlists = await prismadb.playlist.findMany({
      where: {
        userId: currentUser.id,
      },
      include: {
        songs: true,
        user: true,
      },
    });

    return NextResponse.json(playlists);
  } catch (error) {
    console.log("[PLAYLIST_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
