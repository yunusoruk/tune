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
import { getCurrentUser, getSessionUser } from "@/lib/session";
import AddFavoriteButton from "./add-favorite-button";
import RemoveFavoriteButton from "./remove-favorite-button";
import usePlayer from "@/hooks/use-player";
import useOnPlay from "@/hooks/use-on-play";
import { useModal } from "@/hooks/use-modal-store";
import AddToPlaylistButton from "./add-to-playlist-button";
import { on } from "events";
import { useState } from "react";
import SongImage from "./song-image";
import PlaylistImage from "./playlist-image";


interface PlaylistArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
    playlist: Playlist & {
        songs: Song[]
    }
    currentUser?: User
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}

export function PlaylistArtwork({
    playlist,
    currentUser,
    aspectRatio = "portrait",
    width,
    height,
    className,
    ...props
}: PlaylistArtworkProps) {

    const player = usePlayer()
    const { onOpen } = useModal()
    const onPlay = useOnPlay(playlist.songs);





    const handlePlay = (id: string) => {
        onPlay(id)
        player.setId(id);
    }

    return (
        <div className={cn("space-y-3", className)} {...props}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <PlaylistImage
                        currentUser={currentUser}
                        onChange={(id) => handlePlay(id)}
                        playlist={playlist}
                        width={width}
                        height={height}
                    />
                </ContextMenuTrigger>
                <ContextMenuContent className="w-40">
                    <ContextMenuItem disabled >Add to Library</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem disabled >Play Next</ContextMenuItem>
                    <ContextMenuItem disabled >Add the queue</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem disabled>Like</ContextMenuItem>

                    <ContextMenuItem disabled>Share</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
            <div className="space-y-1 text-sm">
                <h3 className="font-medium leading-none">{playlist.title}</h3>
            </div>
        </div>
    )
}