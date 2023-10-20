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

export function SongArtwork({
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

  console.log(currentUser);



  let isFavorite;

  if (song.likedSongs) {
    isFavorite = song.likedSongs.length === 0;

  }

  const handlePlay = (id: string) => {
    // onPlay(song.id)
    // player.setId(song.id);
    onPlay(id)
    player.setId(id);
  }

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          {/* <div
            className="overflow-hidden rounded-md cursor-pointer"

            onClick={handlePlay}
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
          </div> */}
          <SongImage
            currentUser={currentUser}
            onChange={(id) => handlePlay(id)}
            song={song}
            width={width}
            height={height}
          />
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
      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{song.title}</h3>
        <p className="text-xs text-muted-foreground">{song.author}</p>
      </div>
    </div>
  )
}