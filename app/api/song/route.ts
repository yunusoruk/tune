import { NextResponse } from 'next/server';
import {prismadb} from '@/lib/prismadb';
import { getCurrentUser } from '@/lib/session';

 
export async function POST(
  req: Request
) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const { title, author, songUrl, imageUrl } = body;

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!author) {
      return new NextResponse("Author is required", { status: 400 });
    }

    if (!songUrl) {
      return new NextResponse("Song is required", { status: 400 });
    }

    if (!imageUrl) {
        return new NextResponse("Image is required", { status: 400 });
      }


    console.log(`https://${process.env.BUCKET_NAME}.${imageUrl}`);

    const song = await prismadb.song.create({
        data: {
            userId: currentUser.id,
            title,
            author,
            song: `https://${process.env.BUCKET_NAME}.${songUrl}`,
            image: `https://${process.env.BUCKET_NAME}.${imageUrl}`
        }
    })
    
  
    return NextResponse.json(song);
  } catch (error) {
    console.log('[SONG_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};