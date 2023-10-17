"use client"


import { useModal } from "@/hooks/use-modal-store";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";

const AddMusicButton = () => {

    const { onOpen } = useModal()


    return (
        <Button variant='outline' onClick={() => onOpen('addMusicModal')} >
            <Icons.plusCircle className="mr-2 h-4 w-4" />
            Add music
        </Button>
    );
}

export default AddMusicButton;