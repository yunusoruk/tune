import { Separator } from "@/components/ui/separator";
import { SongArtwork } from "@/components/song-artwork";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import prismadb from "@/lib/prismadb";
import { getSessionUser } from "@/lib/session";
import { useRouter } from "next/navigation";
import { Song, User } from "@prisma/client";
import { FavoriteArtwork } from "../favorite-artwork";
import { FavoritesEmptyPlaceholder } from "../favorites-empty-placeholder copy";

interface FavoritesClientProps {
    currentUser?: User
}


const FavoritesClient = async ({ currentUser }: FavoritesClientProps) => {

    const favorites = await prismadb.likedSong.findMany({
        where: {
            userId: currentUser?.id
        },
        include: {
            song: true
        }
    })

    return (
        <div className="relative">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Favorite Songs
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Your favorite songs. Choosen by you.
                    </p>
                </div>
            </div>
            <Separator className="my-4" />
            {
                favorites && favorites.length === 0 ?
                    (
                        <FavoritesEmptyPlaceholder />
                    )
                    :
                    (
                        <></>
                    )
            }
            <div className="flex space-x-4 pb-4">
                {/* {favorites.map((favorite) => (
                    <SongArtwork
                        key={favorite.songId}
                        song={favorite.song as any}
                        className="w-[150px]"
                        aspectRatio="square"
                        width={150}
                        height={150}
                    />
                ))} */}
                {favorites.map((favorite) => (
                    <FavoriteArtwork
                        key={favorite.songId}
                        song={favorite.song as any}
                        aspectRatio="square"
                        width={150}
                        height={150}
                    />
                ))}
            </div>
        </div>
    );
}

export default FavoritesClient;