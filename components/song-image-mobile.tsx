import { useModal } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { Song, User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";


interface SongImageProps {
    song: Song
    width?: number
    height?: number
    aspectRatio?: "portrait" | "square"
    onChange: (id: string) => void;
    currentUser?: User

}

const SongImageMobile = ({ song, width, height, aspectRatio, onChange, currentUser }: SongImageProps) => {

    const router = useRouter()

    const handleClick = () => {
        if (!currentUser) {
            router.push('/login')
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
                fill
                className={cn(
                    " w-full h-full object-cover transition-all hover:scale-105",
                )}
            />
        </div>
    );
}

export default SongImageMobile;