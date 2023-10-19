"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import usePlayer from "@/hooks/use-player";

interface ServerSearchProps {
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
    data
}: ServerSearchProps) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    const player = usePlayer()

    console.log(data);


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
            // return router.push(`/servers/${params?.serverId}/conversations/${id}`)
            return player.setId(id)
        }

        if (type === "playlist") {
            // return player.setIds([playlist])
        }
    }

    return (
        <>
            {/* <button
                onClick={() => setOpen(true)}
                className="group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
            >
                <Search className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                <p
                    className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
                >
                    Search
                </p>
                <kbd
                    className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
                >
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button> */}
            <Button
                variant="outline"
                className={cn(
                    "relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
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