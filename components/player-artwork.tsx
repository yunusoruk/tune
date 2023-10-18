"use client"

import Image from "next/image"
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
import { LikedSong, Song } from "@prisma/client"
import AddFavoriteButton from "./add-favorite-button";
import RemoveFavoriteButton from "./remove-favorite-button";


interface PlayerArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
    song: Song & {
        likedSongs: LikedSong[]
    }
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}

export function PlayerArtwork({
    song,
    aspectRatio = "portrait",
    width,
    height,
    className,
    ...props
}: PlayerArtworkProps) {


    let isFavorite;

    if (song.likedSongs) {
        isFavorite = song.likedSongs.length === 0;

    }




    return (
        <div className={cn("space-y-3", className)} {...props}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        className="overflow-hidden rounded-md cursor-pointer"
                    >
                        <Image
                            src={song.image}
                            alt={song.title}
                            width={width}
                            height={height}
                            className={cn(
                                "h-auto w-auto object-cover transition-all hover:scale-105",
                                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                            )}
                        />
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-40">
                    <ContextMenuItem>Add to Library</ContextMenuItem>
                    <ContextMenuSub>
                        <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
                        <ContextMenuSubContent className="w-48">
                            <ContextMenuItem>
                                <Icons.plusCircle className="mr-2 h-4 w-4" />
                                New Playlist
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            {/* {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="mr-2 h-4 w-4"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 15V6M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM12 12H3M16 6H3M12 18H3" />
                  </svg>
                  {playlist}
                </ContextMenuItem>
              ))} */}
                        </ContextMenuSubContent>
                    </ContextMenuSub>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Play Next</ContextMenuItem>
                    <ContextMenuItem>Play Later</ContextMenuItem>
                    <ContextMenuItem>Create Station</ContextMenuItem>
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

                    <ContextMenuItem>Share</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">{song.title}</h3>
                <p className="text-xs text-muted-foreground">{song.author}</p>
            </div>
        </div>
    )
}