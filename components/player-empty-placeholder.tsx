import { cn } from "@/lib/utils";
import { FC } from "react";
import { Icons } from "./icons";
import SlideBar from "./slideBar";

interface PlayerContentProps extends React.HTMLAttributes<HTMLElement> {

}


const PlayerEmptyPlaceholder: FC<PlayerContentProps> = ({ className }) => {
    return (
        <footer className={cn(className)}>
            <div className="container  flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
                <div className="w-[200px]">

                </div>
                <div className="flex flex-row gap-x-4">
                    <Icons.skipBack
                        className="cursor-pointer text-muted-foreground"
                    />
                    <Icons.play
                        className="cursor-pointer text-muted-foreground"

                    />
                    <Icons.skipForward
                        className="cursor-pointer text-muted-foreground"
                    />
                </div>
                <div className="flex flex-row items-center gap-x-2 w-[120px]">
                    <Icons.volume1
                        className="cursor-pointer text-muted-foreground"
                    />
                    <SlideBar

                        value={1}
                        onChange={() => { }}
                    />

                </div>
            </div>
        </footer>
    );
}

export default PlayerEmptyPlaceholder;