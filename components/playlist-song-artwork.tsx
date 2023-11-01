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
import usePlayer from "@/hooks/use-player"
import { useModal } from "@/hooks/use-modal-store"
import useOnPlay from "@/hooks/use-on-play"
import { Label } from "./ui/label"
import { Separator } from "./ui/separator"
import { Button } from "./ui/button"

interface PlaylistSongArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
    index: number
    archive: Song[]
    song: Song
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}

export function PlaylistSongArtwork({
    index,
    archive,
    song,
    aspectRatio = "portrait",
    width,
    height,
    className,
    ...props
}: PlaylistSongArtworkProps) {


    const player = usePlayer()
    const { onOpen } = useModal()
    const onPlay = useOnPlay(archive);



    const handlePlay = (id: string) => {
        onPlay(id)
        player.setId(id);
    }




    return (
        <div className={cn("space-y-3 overflow-hidden", className)} {...props}>
            <ContextMenu>
                <ContextMenuTrigger>
                    <div className="flex flex-row justify-between items-center w-full">
                        <div className="flex flex-row items-center space-x-2 cursor-pointer">
                            <Label className="">
                                {index}
                            </Label>
                            <div
                                className="overflow-hidden rounded-md "
                            >
                                <Image
                                    src={song.image}
                                    alt={song.title}
                                    width={width}
                                    height={height}
                                    className={cn(
                                        "h-auto w-auto object-cover transition-all",
                                        aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                                    )}
                                />
                            </div>
                            <div className="space-y-1 text-sm">
                                <h3 className="font-medium leading-none">{song.title}</h3>
                                <p className="text-xs text-muted-foreground">{song.author}</p>
                            </div>
                        </div>
                        <Button variant='ghost' size='icon' onClick={() => handlePlay(song.id)}>
                            <Icons.playCircle className={cn("", player.activeId === song.id) ? "hidden" : ""} />
                            <Icons.pause className={cn("", player.activeId === song.id) ? "" : "hidden"} />

                        </Button>
                    </div>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-40">
                    <ContextMenuItem>Add to Library</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Play Next</ContextMenuItem>
                    <ContextMenuItem>Play Later</ContextMenuItem>
                    <ContextMenuItem>Create Station</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem>Share</ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>

        </div>
    )
}