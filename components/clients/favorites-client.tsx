import { Separator } from "@/components/ui/separator";
import { SongArtwork } from "@/components/song-artwork";
import prismadb from "@/lib/prismadb";
import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client";
import { FavoritesEmptyPlaceholder } from "../favorites-empty-placeholder copy";
import { SongArtworkMobile } from "../song-artwork-mobile";




const FavoritesClient = async () => {

    const user = await getCurrentUser()

    const favorites = await prismadb.likedSong.findMany({
        where: {
            userId: user?.id
        },
        include: {
            song: {
                include: {
                    likedSongs: true
                }
            }
        }
    })

    const songs = await prismadb.song.findMany({
        include: {
            likedSongs: {
                where: {
                    userId: user?.id
                }
            }
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
            <div className="hidden md:flex space-x-4 pb-4 ">
                {favorites.map((favorite) => (
                    <SongArtwork
                        currentUser={user as User}
                        archive={songs}
                        key={favorite.songId}
                        song={favorite.song as any}
                        className="w-[150px]"
                        aspectRatio="square"
                        width={150}
                        height={150}
                    />
                ))}
            </div>
            <div className=" md:hidden grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-4">
                {favorites.map((favorite) => (
                    <SongArtworkMobile
                        currentUser={user as User}
                        key={favorite.songId}
                        song={favorite.song as any}
                        archive={songs}
                        className="w-[250px]"
                        aspectRatio="portrait"
                        width={250}
                        height={250}
                    />
                ))}
            </div>
        </div>
    );
}

export default FavoritesClient;