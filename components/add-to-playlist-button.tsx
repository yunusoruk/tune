"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";

import { FC, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ContextMenuItem } from "@/components/ui/context-menu";
import { Playlist } from "@prisma/client";

interface AddToPlaylistButtonProps {
    songId: string,
    playlist: Playlist
}

const AddToPlaylistButton: FC<AddToPlaylistButtonProps> = ({ songId, playlist }) => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const onLike = async () => {
        try {
            setLoading(true)

            const url = qs.stringifyUrl({
                url: `/api/playlist/${playlist.id}`,
                query: {
                    songId: songId,
                    playlistId: playlist.id
                }
            });
            await axios.patch(url);
            router.refresh()
            toast({
                description: "Song added to playlist"
            })
        } catch (error) {
            toast({
                description: "Oops, something went wrong."
            })
        } finally {
            setLoading(true)
        }
    }


    return (
        <ContextMenuItem disabled={loading} onClick={() => onLike()}>
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
            {playlist.title}
        </ContextMenuItem>
    );
}

export default AddToPlaylistButton;