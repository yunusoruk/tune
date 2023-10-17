"use client"

import * as React from "react"
// @ts-ignore
import useSound from "use-sound";
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Command as Logo } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Icons } from "./icons"
import { Song } from "@prisma/client"
import usePlayer from "@/hooks/use-player"

interface PlayerContentProps extends React.HTMLAttributes<HTMLElement> {
    song: Song
}

export function PlayerContent({ song, className }: PlayerContentProps) {
    const player = usePlayer();

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [volume, setVolume] = React.useState(1);

    const Icon = isPlaying ? Icons.pause : Icons.play;

    const VolumeIcon = volume === 0 ? Icons.volumeX : Icons.volume1;

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    }


    const [play, { pause, sound }] = useSound(
        song.song,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );


    React.useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    }

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    return (
        <footer className={cn(className)}>
            <div className="container  flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="">
                </div>
                <div className="">
                    <Icon className="cursor-pointer" onClick={handlePlay} />
                </div>
                <div className="">
                    <VolumeIcon
                        className="cursor-pointer"
                        onClick={toggleMute}
                    />

                </div>
            </div>
        </footer>
    )
}