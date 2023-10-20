"use client"


import { useModal } from "@/hooks/use-modal-store";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

interface AddMusicButtonProps {
    currentUser?: User
}

const AddMusicButton = ({ currentUser }: AddMusicButtonProps) => {

    const { onOpen } = useModal()

    const handleClick = () => {
        if (!currentUser) {
            onOpen('loginModal')
        } else {
            onOpen('addMusicModal')
        }
    }


    return (
        <Button variant='outline' onClick={handleClick} >
            <Icons.plusCircle className="mr-2 h-4 w-4" />
            Add music
        </Button>
    );
}

export default AddMusicButton;