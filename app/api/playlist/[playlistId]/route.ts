import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getCurrentUser } from '@/lib/session';


export async function PATCH(
    req: Request,
    { params }: { params: { playlistId: string } }
  ) {
    try {
  
        const currentUser = await getCurrentUser()
        const { searchParams } = new URL(req.url);
    
        const playlistId = searchParams.get('playlistId')

        const songId = searchParams.get('songId')


        if (!currentUser) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
      
        if (!playlistId || params.playlistId !== playlistId) {
            return new NextResponse("Unauthorized", { status: 400 });
        }
      
        // // TODO: CONNECT TO THE SONGS ARRAY
        const playlist = await prismadb.playlist.updateMany({
            where: {
                id: params.playlistId
            },
            data: {
                // songs: {
                //     connect: 
                // }
            }
          })
    
      return NextResponse.json(playlist);
    } catch (error) {
      console.log('[PLAYLIST_PATCH]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };

export async function DELETE(
    req: Request,
    { params }: { params: { playlistId: string } }
  ) {
    try {
  
        const currentUser = await getCurrentUser()
        const { searchParams } = new URL(req.url);
    
        const playlistId = searchParams.get('playlistId')

        if (!currentUser  ) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
      
        if (!playlistId || params.playlistId !== playlistId) {
            return new NextResponse("Unauthorized", { status: 400 });
        }


      
        const playlist = await prismadb.playlist.delete({
            where: {
                id: params.playlistId
            }
          })
    
      return NextResponse.json(playlist);
    } catch (error) {
      console.log('[PLAYLIST_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };