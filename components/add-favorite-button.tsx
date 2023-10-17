"use client"

import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";

import { FC, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ContextMenuItem } from "@/components/ui/context-menu";

interface AddFavoriteButtonProps {
    songId: string
}

const AddFavoriteButton: FC<AddFavoriteButtonProps> = ({ songId }) => {

    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const onLike = async () => {
        try {
            setLoading(true)

            const url = qs.stringifyUrl({
                url: `/api/song/${songId}/likedSong`,
                query: {
                    songId: songId
                }
            });
            await axios.post(url);
            router.refresh()
            toast({
                description: "Song added to favorites"
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
            Like
        </ContextMenuItem>
    );
}

export default AddFavoriteButton;