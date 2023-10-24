"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";

import { FC, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ContextMenuItem } from "@/components/ui/context-menu";

interface RemoveFavoriteButtonProps {
    songId: string,
    likedSongId: string
}

const RemoveFavoriteButton: FC<RemoveFavoriteButtonProps> = ({ songId, likedSongId }) => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const unLike = async () => {

        try {
            setLoading(true)
            const url = qs.stringifyUrl({
                url: `/api/song/${songId}/likedSong/${likedSongId}`,
                query: {
                    songId: songId
                }
            });
            await axios.delete(url);
            router.refresh()

            toast({
                description: "Song removed from favorites"
            })
        } catch (error: any) {
            console.log(error);

            toast({
                description: "Oops, something went wrong."
            })
        } finally {
            setLoading(false)
        }

    }
    return (
        <ContextMenuItem disabled={loading} onClick={() => unLike()}>
            Unlike
        </ContextMenuItem>
    );
}

export default RemoveFavoriteButton;