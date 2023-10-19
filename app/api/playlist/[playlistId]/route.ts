import { NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';
import { getCurrentUser } from '@/lib/session';
import { Song } from '@prisma/client';


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

        if (!songId) {
            return new NextResponse("songId needed.", { status: 400 });
        }

        const playlist = await prismadb.playlist.findUnique({
            where: {
                id: params.playlistId
            },
            include: {
                songs: true
            }
        })

        if (!playlist) {
            return new NextResponse("Unauthorized", { status: 400 });
        }
      
        // // TODO: CONNECT TO THE SONGS ARRAY
        const updatedPlaylist = await prismadb.playlist.update({
            where: {
                id: params.playlistId
            },
            data: {
                songs: {
                    connect: {
                        id: songId
                    }
                }
            }
          })
    
      return NextResponse.json(updatedPlaylist);
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