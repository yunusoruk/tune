"use client"

import usePlayer from "@/hooks/use-player";
import { PlayerContent } from "./player-content";
import prismadb from "@/lib/prismadb";
import PlayerSong from "./player-song";
import { useEffect, useState } from "react";
import { Song } from "@prisma/client";
import PlayerEmptyPlaceholder from "./player-empty-placeholder";
import { cn } from "@/lib/utils";

interface PlayerProps extends React.HTMLAttributes<HTMLDivElement> {

}

const Player = ({ className }: PlayerProps) => {
    const [song, setSong] = useState<Song | undefined>(undefined);

    const player = usePlayer();


    useEffect(() => {
        if (player.activeId) {
            fetch(`/api/song/${player.activeId}`)
                .then(response => response.json())
                .then(data => setSong(data))
                .catch(error => console.error('Error fetching song:', error));
        }
    }, [player.activeId])

    // const [archive, setArchive] = useState<Song[] | undefined>([]);

    // useEffect(() => {
    //     fetch(`/api/song`)
    //         .then(response => response.json())
    //         .then(data => setArchive(data))
    //         .catch(error => console.error('Error fetching song:', error));
    // }, [])


    if (!song || !player.activeId) {

        return (
            <PlayerEmptyPlaceholder className={cn("sticky bottom-0 z-40 border-t bg-background", className)} />
        );
    }

    return (
        <PlayerContent className={cn("fixed bottom-0 z-40 border-t bg-background", className)} song={song} />

    );
}

export default Player;