"use client"

import * as React from "react"

import useSound from "use-sound";
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Command as Logo } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { Icons } from "./icons"
import { Song } from "@prisma/client"
import usePlayer from "@/hooks/use-player"

interface PlayerProps extends React.HTMLAttributes<HTMLElement> {
    song: Song
}

export function Player({ song, className }: PlayerProps) {
    const player = usePlayer();

    const [isPlaying, setIsPlaying] = React.useState(false);
    const [volume, setVolume] = React.useState(1);

    const Icon = isPlaying ? Icons.pause : Icons.play;

    const VolumeIcon = volume === 0 ? Icons.volumeX : Icons.volume1;


    const [play, { pause, sound }] = useSound(
        song.song,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                // onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    return (
        <footer className={cn(className)}>
            <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="">

                </div>
                <div className="">
                    <Icon className="cursor-pointer" />
                </div>
                <div className="">
                    <VolumeIcon
                        className="cursor-pointer"
                    />

                </div>
            </div>
        </footer>
    )
}