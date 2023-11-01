"use client";

import { useMounted } from "@/hooks/use-mounted";
import LoginModal from "@/components/modals/login-modal";
import RegisterModal from "../modals/register-modal";
import AddMusicModal from "../modals/add-music-modal";
import AddPlaylistModal from "../modals/add-playlist-modal";
import PlaylistModal from "../modals/playlist-modal";

export const ModalProvider = () => {

    useMounted()


    return (
        <>
            <LoginModal />
            <RegisterModal />
            <AddMusicModal />
            <AddPlaylistModal />
            <PlaylistModal />
        </>
    )
}