import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getCurrentUser } from '@/lib/session';


export async function DELETE(
    req: Request,
    { params }: { params: { likedSongId: string, songId: string } }
  ) {
    try {
  
        const currentUser = await getCurrentUser()
        const { searchParams } = new URL(req.url);
    
        const songId = searchParams.get('songId')

        if (!params.likedSongId) {
            return new NextResponse("Invalid Liked Song ID", { status: 400 });
        }
  
        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
      
        if (!songId || params.songId !== songId) {
            return new NextResponse("Unauthorized", { status: 400 });
        }
      
        const likedSong = await prismadb.likedSong.delete({
            where: {
                id: params.likedSongId
            }
          })
    
      return NextResponse.json(likedSong);
    } catch (error) {
      console.log('[LIKED_SONG_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };