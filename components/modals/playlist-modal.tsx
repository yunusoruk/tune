"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useModal } from '@/hooks/use-modal-store';
import { useParams, useRouter } from 'next/navigation';
import { Icons } from '../icons';
import { UserLoginForm } from '@/app/(auth)/components/user-login-form';
import { PlaylistArtwork } from "../playlist-artwork";
import PlaylistImage from "../playlist-image";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { SongArtwork } from "../song-artwork";
import { Song } from "@prisma/client";
import { PlaylistSongArtwork } from "../playlist-song-artwork";

const PlaylistModal = () => {

    const { isOpen, onClose, type, onOpen, data } = useModal();


    const router = useRouter()
    const params = useParams()

    const isModalOpen = isOpen && type === "playlistModal";

    const { playlist } = data


    const handleClose = () => {
        onClose();
    }


    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[640px] ">

                <DialogHeader>
                    <DialogTitle>
                        <div className="flex flex-row items-center gap-4">
                            <Image
                                src={playlist?.image || ""}
                                alt={playlist?.title || "playlist"}
                                width={80}
                                height={80}
                                className={cn(
                                    "h-auto w-auto object-cover transition-all  aspect-square shadow-md rounded-md",

                                )}
                            />
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col space-y-1">
                                    <Label className="text-muted-foreground">
                                        Public playlist
                                    </Label>
                                    <Label className="text-3xl">
                                        {playlist?.title}
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Avatar className="w-6 h-6">
                                        <AvatarImage src={playlist?.user.image || ""} />
                                        <AvatarFallback>
                                            <Icons.user className="h-4 w-4" />
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-row items-center">
                                        <p className="text-sm font-medium leading-none">{playlist?.user.name || ""}</p>
                                        <Icons.dot />
                                        <p className="text-sm font-medium leading-none">{playlist?.songs.length} songs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-4" />

                    </DialogTitle>
                    {/* <DialogDescription>
                        Enter a name and upload a image for your playlist.
                    </DialogDescription> */}
                    <div className="flex flex-col">
                        {playlist?.songs.map((song, i) => (
                            <>
                                <PlaylistSongArtwork
                                    index={i + 1}
                                    song={song}
                                    key={song.id}
                                    archive={playlist.songs}
                                    aspectRatio="portrait"
                                    className="w-full"
                                    width={40}
                                    height={40}
                                />
                                <Separator className="my-4" />
                            </>
                        ))}
                    </div>
                </DialogHeader>

            </DialogContent>

        </Dialog>
    );
}

export default PlaylistModal;