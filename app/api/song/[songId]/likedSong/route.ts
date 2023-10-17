import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getCurrentUser } from '@/lib/session';

 
export async function POST(
  req: Request,
  { params }: { params: { songId: string } }
) {
  try {
    const currentUser = await getCurrentUser()
    const { searchParams } = new URL(req.url);

    const songId = searchParams.get('songId')

    // const userId = searchParams.get('songId')


    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!songId || params.songId !== songId) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const likedSong = await prismadb.likedSong.create({
        data: {
            songId: songId,
            userId: currentUser.id
        }
    })
    
  
    return NextResponse.json(likedSong);
  } catch (error) {
    console.log('[LIKEDSONG_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};