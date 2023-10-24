"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Playlist, User } from "@prisma/client"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { useWindowPath } from "@/hooks/use-window-path"
import { useModal } from "@/hooks/use-modal-store"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Icons } from "@/components/icons"


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
    playlists: Playlist[]
    currentUser: User
}

export function Sidebar({ className, currentUser, playlists }: SidebarProps) {

    const router = useRouter()
    const windowPath = useWindowPath()
    const { onOpen } = useModal()
    const [archive, setArchive] = useState<Playlist[] | undefined>([]);

    useEffect(() => {
        fetch(`/api/playlist`)
            .then(response => response.json())
            .then(data => setArchive(data))
            .catch(error => console.error('Error fetching song:', error));
    }, [])

    const handlePlaylist = () => {
        if (!currentUser) {
            onOpen('loginModal')
        } else {
            onOpen('addPlaylistModal')

        }
    }


    return (
        <>
            <aside className={cn("flex flex-col h-full bg-background overflow-y-auto w-60", className)}>
                <div className="sticky top-0 z-40 bg-background h-20">
                    <Link href="/" className="hidden items-center space-x-2 md:flex px-3 h-full">
                        <h1 className="my-4 px-4 text-3xl font-extrabold tracking-tight uppercase text-primary">
                            {siteConfig.name}
                        </h1>
                    </Link>
                    <Separator />
                </div>
                <ScrollArea className="flex-1 ">
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Discover
                        </h2>
                        <div className="space-y-1">
                            <Button
                                variant="ghost"
                                className={cn("w-full justify-start",
                                    (windowPath === '/') ? "bg-secondary" : ""
                                )}
                                onClick={() => router.push('/')}

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
                                    <circle cx="12" cy="12" r="10" />
                                    <polygon points="10 8 16 12 10 16 10 8" />
                                </svg>
                                Listen Now
                            </Button>

                            <Button disabled variant="ghost" className={cn("w-full justify-start",
                                (windowPath === '/browse') ? "bg-secondary" : ""
                            )}>
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
                                    <rect width="7" height="7" x="3" y="3" rx="1" />
                                    <rect width="7" height="7" x="14" y="3" rx="1" />
                                    <rect width="7" height="7" x="14" y="14" rx="1" />
                                    <rect width="7" height="7" x="3" y="14" rx="1" />
                                </svg>
                                Browse
                            </Button>
                            <Button disabled variant="ghost" className={cn("w-full justify-start",
                                (windowPath === '/radio') ? "bg-secondary" : ""
                            )}>
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
                                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                                    <circle cx="12" cy="12" r="2" />
                                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                                </svg>
                                Radio
                            </Button>
                        </div>
                    </div>
                    <div className="px-3 py-2">
                        <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                            Library
                        </h2>
                        <div className="space-y-1">
                            <Button disabled variant="ghost" className="w-full justify-start">
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
                                Playlists
                            </Button>
                            <Button disabled variant="ghost" className="w-full justify-start">
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
                                    <circle cx="8" cy="18" r="4" />
                                    <path d="M12 18V2l7 4" />
                                </svg>
                                Songs
                            </Button>
                            <Button disabled variant="ghost" className="w-full justify-start">
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
                                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                Made for You
                            </Button>
                            <Button disabled variant="ghost" className="w-full justify-start">
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
                                    <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                                    <circle cx="17" cy="7" r="5" />
                                </svg>
                                Artists
                            </Button>
                            <Button disabled variant="ghost" className="w-full justify-start">
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
                                    <path d="m16 6 4 14" />
                                    <path d="M12 6v14" />
                                    <path d="M8 8v12" />
                                    <path d="M4 4v16" />
                                </svg>
                                Albums
                            </Button>
                        </div>
                    </div>
                    <div className="py-2">
                        <div className="flex flex-row justify-between items-center ">
                            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
                                Playlists
                            </h2>
                            <Icons.add
                                size={28}
                                className="mr-4 cursor-pointer hover:bg-secondary p-1 rounded-md"
                                onClick={handlePlaylist}
                            />
                        </div>
                        <ScrollArea className="h-[300px] px-1">
                            <div className="space-y-1 p-2">
                                {archive?.map((playlist, i) => (
                                    <Button
                                        key={`${playlist}-${i}`}
                                        variant="ghost"
                                        className="w-full justify-start font-normal"
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
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </ScrollArea>
            </aside>
        </>
    )
}