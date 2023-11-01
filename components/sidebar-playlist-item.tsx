"use client"

import { Playlist, Song, User } from '@prisma/client';
import type { FC } from 'react';
import { Button } from './ui/button';
import { useModal } from '@/hooks/use-modal-store';

interface PlaylistItemProps {
    playlist: Playlist & {
        songs: Song[],
        user: User
    }
}

const PlaylistItem: FC<PlaylistItemProps> = ({ playlist }) => {

    const { onOpen } = useModal()


    return (
        <Button
            key={`${playlist.id}`}
            variant="ghost"
            className="w-full justify-start font-normal"
            onClick={() => onOpen('playlistModal', { playlist })}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
            >
                <path d="M21 15V6" />
                <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                <path d="M12 12H3" />
                <path d="M16 6H3" />
                <path d="M12 18H3" />
            </svg>
            {playlist.title}
        </Button>
    );
}
export default PlaylistItem;