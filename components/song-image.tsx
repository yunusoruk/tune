import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Song, User } from "@prisma/client";
import Image from "next/image";


interface SongImageProps {
    song: Song
    width?: number
    height?: number
    aspectRatio?: "portrait" | "square"
    onChange: (id: string) => void;
    currentUser?: User

}

const SongImage = ({ song, width, height, aspectRatio, onChange, currentUser }: SongImageProps) => {


    const { onOpen } = useModal()


    const handleClick = () => {
        if (!currentUser) {
            onOpen('loginModal')
            return
        }
        onChange(song.id)
    }



    return (
        <div
            className="overflow-hidden rounded-md cursor-pointer"

            onClick={handleClick}
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
    );
}

export default SongImage;