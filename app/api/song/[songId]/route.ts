import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getCurrentUser } from '@/lib/session';


export async function GET(
    req: Request,
    { params }: { params: { songId: string } }
  ) {
    try {
  
        const currentUser = await getCurrentUser()


        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
      
        const song = await prismadb.song.findUnique({
            where: {
                id: params.songId
            }
          })
    
      return NextResponse.json(song);
    } catch (error) {
      console.log('[SONG_GET]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

export async function DELETE(
    req: Request,
    { params }: { params: { songId: string } }
  ) {
    try {
  
        const currentUser = await getCurrentUser()
        const { searchParams } = new URL(req.url);
    
        const songId = searchParams.get('songId')

        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
      
        if (!songId || params.songId !== songId) {
            return new NextResponse("Unauthorized", { status: 400 });
        }
      
        const song = await prismadb.song.delete({
            where: {
                id: params.songId
            }
          })
    
      return NextResponse.json(song);
    } catch (error) {
      console.log('[SONG_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };