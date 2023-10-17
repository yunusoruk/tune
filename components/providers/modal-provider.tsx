"use client";

import { useMounted } from "@/hooks/use-mounted";
import LoginModal from "@/components/modals/login-modal";
import RegisterModal from "../modals/register-modal";
import AddMusicModal from "../modals/add-music-modal";

export const ModalProvider = () => {

    useMounted()


    return (
        <>
            <LoginModal />
            <RegisterModal />
            <AddMusicModal />
        </>
    )
}