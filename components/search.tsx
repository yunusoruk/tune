"use client";

import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import Image from "next/image";

import { cn } from "@/lib/utils";
import usePlayer from "@/hooks/use-player";
import { useModal } from "@/hooks/use-modal-store";
import { Button } from "@/components/ui/button";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";


interface ServerSearchProps extends React.HTMLAttributes<HTMLElement> {
    currentUser?: User
    data: {
        label: string;
        type: "song" | "playlist",
        data: {
            image: string;
            title: string;
            id: string;
        }[] | undefined
    }[]
}

export const SearchBar = ({
    data,
    currentUser,
    className
}: ServerSearchProps) => {

    const [open, setOpen] = useState(false);
    const player = usePlayer()
    const { onOpen } = useModal()

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        }

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down)
    }, []);

    const onClick = ({ id, type }: { id: string, type: "song" | "playlist" }) => {
        setOpen(false);

        if (type === "song") {
            return player.setId(id)
        }
        // TODO: ADD PLAYLIST FUNCTIONALITY
        if (type === "playlist") {
            // return player.setIds([playlist])
        }
    }



    return (
        <>
            <Button
                variant="outline"
                className={cn(
                    "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64",
                    className
                )}
                onClick={() => setOpen(true)}
            >
                <span className="hidden lg:inline-flex">Search songs...</span>
                <span className="inline-flex lg:hidden">Search...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search all songs and playlists" />
                <CommandList>
                    <CommandEmpty>
                        No Results found
                    </CommandEmpty>
                    {data.map(({ label, type, data }) => {
                        if (!data?.length) return null;

                        return (
                            <CommandGroup key={label} heading={label}>
                                {data?.map(({ id, image, title }) => {
                                    return (
                                        <CommandItem className="flex flex-row items-center space-x-2 cursor-pointer" key={id} onSelect={() => onClick({ id, type })}>
                                            <Image
                                                src={image}
                                                alt={title}
                                                width={40}
                                                height={40}
                                                className={cn(
                                                    "h-auto w-auto object-cover transition-all hover:scale-105 aspect-square"
                                                )}
                                            />
                                            <span className="text-md">{title}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                        )
                    })}
                </CommandList>
            </CommandDialog>
        </>
    )
}