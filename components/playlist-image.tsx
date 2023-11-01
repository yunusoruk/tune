import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Playlist, Song, User } from "@prisma/client";
import Image from "next/image";
import { toast } from "./ui/use-toast";


interface SongImageProps {
    playlist: Playlist & {
        songs: Song[]
    }
    width?: number
    height?: number
    aspectRatio?: "portrait" | "square"
    onChange: (id: string) => void;
    currentUser?: User

}

const PlaylistImage = ({ playlist, width, height, aspectRatio, onChange, currentUser }: SongImageProps) => {


    const { onOpen } = useModal()


    const handleClick = () => {
        if (!currentUser) {
            onOpen('loginModal')
            return
        }
        if (playlist.songs.length > 0) {
            onChange(playlist.songs[0].id)
        } else {
            toast({
                description: 'Please add song to the playlist.'
            })
        }
    }



    return (
        <div
            className="overflow-hidden rounded-md cursor-pointer"

            onClick={handleClick}
        >
            <Image
                src={playlist.image}
                alt={playlist.title}
                width={width}
                height={height}
                className={cn(
                    "h-auto w-auto object-cover transition-all hover:scale-105",
                    aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )}
            />
        </div>
    );
}

export default PlaylistImage;