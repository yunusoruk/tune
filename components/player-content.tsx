"use client"

import * as React from "react"
// @ts-ignore
import useSound from "use-sound";
import { cn } from "@/lib/utils"
import { Icons } from "./icons"
import { Song } from "@prisma/client"
import usePlayer from "@/hooks/use-player"
import SlideBar from "./slideBar";
import { PlayerArtwork } from "./player-artwork";
import useOnPlay from "@/hooks/use-on-play";
import { Label } from "./ui/label";

interface PlayerContentProps extends React.HTMLAttributes<HTMLElement> {
    song: Song
}

function formatTime(seconds: any) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function PlayerContent({ song, className }: PlayerContentProps) {



    const [isPlaying, setIsPlaying] = React.useState(false);
    const [volume, setVolume] = React.useState(1);

    const [currentTime, setCurrentTime] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [soundLoaded, setSoundLoaded] = React.useState(false);

    const Icon = isPlaying ? Icons.pause : Icons.play;

    const VolumeIcon = volume === 0 ? Icons.volumeX : volume <= 0.5 ? Icons.volume1 : Icons.volume2;


    const player = usePlayer();



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
            onplay: () => {
                setIsPlaying(true)
                setSoundLoaded(true)
            },
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    React.useEffect(() => {
        if (soundLoaded) {
            setDuration(sound?.duration() || 0);
            setSoundLoaded(false);  // Reset for the next song
        }
    }, [soundLoaded, sound]);

    // Reset currentTime and duration when the active song changes
    React.useEffect(() => {
        console.log('song change');
        console.log(currentTime);

        setCurrentTime(sound?.seek() || 0);
    }, [player.activeId, sound]);

    // Update the current time every second
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(sound?.seek() || 0);

        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [sound, currentTime, duration]);


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

            <div className="container flex flex-row items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0 ">
                <div className="w-[240px]">
                    <PlayerArtwork
                        className="flex flex-row items-center space-x-4"
                        key={song.id}
                        song={song as any}
                        aspectRatio="portrait"
                        width={50}
                        height={50}
                    />
                </div>
                <div className="flex flex-col w-full items-center justify-center px-16">
                    <div className="flex flex-row gap-x-4">
                        <Icons.skipBack
                            className="cursor-pointer "
                            onClick={onPlayPrevious}
                        />
                        <Icon

                            className="cursor-pointer"
                            onClick={handlePlay} />
                        <Icons.skipForward
                            className="cursor-pointer "
                            onClick={onPlayNext}
                        />
                    </div>
                    <div className="w-full md:flex flex-row items-center space-x-2 hidden">
                        <Label className="text-muted-foreground text-xs">
                            {formatTime(currentTime)}
                        </Label>
                        <SlideBar
                            className="w-full"
                            value={currentTime / duration}
                            onChange={(value) => {
                                const newTime = value * duration;
                                sound?.seek(newTime);
                                setCurrentTime(newTime);
                            }}
                        />
                        <Label className="text-muted-foreground text-xs">
                            {formatTime(duration)}
                        </Label>

                    </div>
                </div>

                <div className="md:flex flex-row items-center gap-x-2 w-[160px] hidden ">
                    <VolumeIcon
                        className="cursor-pointer"
                        onClick={toggleMute}
                    />
                    <SlideBar
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />

                </div>
            </div>

        </footer>
    )
}