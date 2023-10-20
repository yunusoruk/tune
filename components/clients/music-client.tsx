import { Separator } from "@/components/ui/separator";
import { SongArtwork } from "@/components/song-artwork";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { SongArtworkMobile } from "../song-artwork-mobile";
import { User } from "@prisma/client";

const MusicClient = async () => {

    const currentUser = await getCurrentUser()

    const songs = await prismadb.song.findMany({
        where: {
            approved: true
        },
        include: {
            likedSongs: {
                where: {
                    userId: currentUser?.id
                }
            }
        }
    })

    const playlists = await prismadb.playlist.findMany({
        where: {
            userId: currentUser?.id
        }
    })

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Listen Now
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Top picks for you. Updated daily.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            <div className="relative hidden lg:block">
                <ScrollArea className="">
                    <div className="flex space-x-4 pb-4">
                        {songs.map((song) => (
                            <SongArtwork
                                currentUser={currentUser as User}
                                playlists={playlists}
                                key={song.id}
                                song={song}
                                archive={songs}
                                className="w-[250px]"
                                aspectRatio="portrait"
                                width={250}
                                height={330}
                            />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            <div className=" lg:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
                {songs.map((song) => (
                    <SongArtworkMobile
                        currentUser={currentUser as User}
                        playlists={playlists}
                        key={song.id}
                        song={song}
                        archive={songs}
                        className="w-[250px]"
                        aspectRatio="portrait"
                        width={250}
                        height={330}
                    />
                ))}
            </div>
            <div className="mt-6 space-y-1 hidden lg:block">
                <h2 className="text-2xl font-semibold tracking-tight">
                    Made for You
                </h2>
                <p className="text-sm text-muted-foreground">
                    Your personal playlists. Updated daily.
                </p>
            </div>
            <Separator className="my-4" />
            <div className="relative hidden lg:block">
                <ScrollArea>
                    <div className="flex space-x-4 pb-4">
                        {songs.map((song) => (
                            <SongArtwork
                                key={song.id}
                                song={song}
                                archive={songs}
                                className="w-[150px]"
                                aspectRatio="square"
                                width={150}
                                height={150}
                            />
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
        </>
    );
}

export default MusicClient;