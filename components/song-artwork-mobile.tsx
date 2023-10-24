"use client"

import Image from "next/image"
import qs from "query-string";
import { cn } from "@/lib/utils"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { Icons } from "@/components/icons"
import { LikedSong, Playlist, Song, User } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast";
import { getCurrentUser } from "@/lib/session";
import AddFavoriteButton from "./add-favorite-button";
import RemoveFavoriteButton from "./remove-favorite-button";
import usePlayer from "@/hooks/use-player";
import useOnPlay from "@/hooks/use-on-play";
import { useModal } from "@/hooks/use-modal-store";
import AddToPlaylistButton from "./add-to-playlist-button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import SongImageMobile from "./song-image-mobile";


interface SongArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
    song: Song & {
        likedSongs: LikedSong[]
    }
    archive: Song[]
    playlists?: Playlist[]
    currentUser?: User
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}

export function SongArtworkMobile({
    song,
    archive,
    playlists,
    currentUser,
    aspectRatio = "portrait",
    width,
    height,
    className,
    ...props
}: SongArtworkProps) {

    const player = usePlayer()
    const { onOpen } = useModal()
    const onPlay = useOnPlay(archive);
    let isFavorite;

    if (song.likedSongs) {
        isFavorite = song.likedSongs.length === 0;

    }

    const handlePlay = (id: string) => {
        onPlay(id)
        player.setId(id);
    }

    return (
        <ContextMenu>
            <ContextMenuTrigger className="">
                <Card className="border-none shadow-none ">
                    <div className="relative rounded-md overflow-hidden cursor-pointer aspect-square w-full">
                        <SongImageMobile
                            currentUser={currentUser}
                            onChange={(id) => handlePlay(id)}
                            song={song}
                        />
                    </div>
                    <div className="space-y-1 text-sm mt-2">
                        <h3 className="font-medium leading-none">{song.title}</h3>
                        <p className="text-xs text-muted-foreground">{song.author}</p>
                    </div>

                </Card>

            </ContextMenuTrigger>
            <ContextMenuContent className="w-40">
                <ContextMenuItem disabled >Add to Library</ContextMenuItem>
                <ContextMenuSub >
                    <ContextMenuSubTrigger >Add to Playlist</ContextMenuSubTrigger>
                    <ContextMenuSubContent className="w-48">
                        <ContextMenuItem onClick={() => onOpen('addPlaylistModal')}>
                            <Icons.plusCircle className="mr-2 h-4 w-4" />
                            New Playlist
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        {playlists && playlists.map((playlist) => (
                            <AddToPlaylistButton
                                key={playlist.id}
                                songId={song.id}
                                playlist={playlist}
                            />
                        ))}
                    </ContextMenuSubContent>
                </ContextMenuSub>
                <ContextMenuSeparator />
                <ContextMenuItem onClick={() => player.playNext(song.id)}>Play Next</ContextMenuItem>
                <ContextMenuItem onClick={() => player.addToQueue(song.id)} >Add the queue</ContextMenuItem>
                <ContextMenuItem disabled >Create Station</ContextMenuItem>
                <ContextMenuSeparator />
                {(isFavorite) ?
                    (
                        <AddFavoriteButton
                            songId={song.id}
                        />
                    )
                    :
                    (
                        <RemoveFavoriteButton
                            songId={song.id}
                            likedSongId={(song.likedSongs) ? song.likedSongs[0].id : ""}
                        />
                    )
                }

                <ContextMenuItem disabled>Share</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>

    )
}