"use client"

import usePlayer from "@/hooks/use-player";
import { PlayerContent } from "./player-content";
import prismadb from "@/lib/prismadb";
import PlayerSong from "./player-song";
import { useEffect, useState } from "react";
import { Song } from "@prisma/client";
import PlayerEmptyPlaceholder from "./player-empty-placeholder";


const Player = () => {
    const [song, setSong] = useState<Song | undefined>(undefined);
    // const [archive, setArchive] = useState<Song[] | undefined>([]);

    const player = usePlayer();


    useEffect(() => {
        if (player.activeId) {
            fetch(`/api/song/${player.activeId}`)
                .then(response => response.json())
                .then(data => setSong(data))
                .catch(error => console.error('Error fetching song:', error));
        }
    }, [player.activeId])

    // useEffect(() => {
    //     fetch(`/api/song`)
    //         .then(response => response.json())
    //         .then(data => setArchive(data))
    //         .catch(error => console.error('Error fetching song:', error));
    // }, [])


    if (!song || !player.activeId) {
        console.log('gere');

        return (
            <PlayerEmptyPlaceholder className="sticky bottom-0 z-40 border-t bg-background" />
        );
    }

    return (
        <PlayerContent className="sticky bottom-0 z-40 border-t bg-background" song={song} />

    );
}

export default Player;