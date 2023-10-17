
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
import { LikedSong, Song } from "@prisma/client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast";
import { getCurrentUser } from "@/lib/session";
import AddFavoriteButton from "./add-favorite-button";
import RemoveFavoriteButton from "./remove-favorite-button";


interface SongArtworkProps extends React.HTMLAttributes<HTMLDivElement> {
  song: Song & {
    likedSongs: LikedSong[]
  }
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export async function SongArtwork({
  song,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: SongArtworkProps) {

  // const router = useRouter()

  const isFavorite = song.likedSongs.length === 0;

  // console.log(song.likedSongs);



  // const onLike = async () => {
  //   try {
  //     const url = qs.stringifyUrl({
  //       url: `/api/song/${song.id}/likedSong`,
  //       query: {
  //         songId: song.id
  //       }
  //     });
  //     await axios.post(url);
  //     router.refresh()
  //     toast({
  //       description: "Song added to favorites"
  //     })
  //   } catch (error) {
  //     toast({
  //       description: "Oops, something went wrong."
  //     })
  //   }
  // }


  // const unLike = async () => {
  //   console.log(song.likedSongs[0].id);

  //   try {
  //     const url = qs.stringifyUrl({
  //       url: `/api/song/${song.id}/likedSong/${song.likedSongs[0].id}`,
  //       query: {
  //         songId: song.id
  //       }
  //     });
  //     await axios.delete(url);
  //     router.refresh()

  //     toast({
  //       description: "Song removed from favorites"
  //     })
  //   } catch (error) {
  //     toast({
  //       description: "Oops, something went wrong."
  //     })
  //   }

  // }

  return (
    <div className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="overflow-hidden rounded-md">
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
                likedSongId={song.likedSongs[0].id}
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