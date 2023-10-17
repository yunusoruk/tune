import { FC } from "react";
import { PlayerContent } from "./player-content";
import prismadb from "@/lib/prismadb";

interface PlayerContentProps {
    activeId: string
}

const PlayerSong: FC<PlayerContentProps> = async ({ activeId }) => {


    return (
        <>
        </>
    );
}

export default PlayerSong;