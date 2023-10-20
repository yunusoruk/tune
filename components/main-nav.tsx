"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import { X } from 'lucide-react'
import { UserAccountNav } from "./user-account-nav"
import { Button, buttonVariants } from "./ui/button"
import { useModal } from "@/hooks/use-modal-store"
import { Playlist, Song, User } from "@prisma/client"
import { ModeToggle } from "./mode-toggle"
import { SearchBar } from "./search"
import { Icons } from "./icons"

interface MainNavProps {
    user: User
    items?: MainNavItem[]
    children?: React.ReactNode
}

export function MainNav({ user, items, children }: MainNavProps) {



    const segment = useSelectedLayoutSegment()
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
    const [archive, setArchive] = React.useState<Song[] | undefined>([]);
    const [playlists, setPlaylists] = React.useState<Playlist[] | undefined>([]);

    const { onOpen } = useModal()

    React.useEffect(() => {
        fetch(`/api/song`)
            .then(response => response.json())
            .then(data => setArchive(data))
            .catch(error => console.error('Error fetching song:', error));
    }, [])

    React.useEffect(() => {
        fetch(`/api/playlist`)
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch(error => console.error('Error fetching song:', error));
    }, [])

    const handleSearch = () => {
        if (!user) {

        } else {

        }
    }

    return (
        <>
            <div className="lg:flex lg:flex-row items-center hidden">
                <ModeToggle />
            </div>
            {/* <div className=" lg:hidden">
                <Icons.menu />
            </div> */}
            <button
                className="flex items-center space-x-2 lg:hidden"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
                {showMobileMenu ? <X /> :
                    <Icons.menu />
                }
            </button>
            {showMobileMenu && items && (
                <MobileNav items={items}>{children}</MobileNav>
            )}

            <div className="flex flex-row items-center space-x-4">
                <SearchBar
                    className=""
                    data={[
                        {
                            label: "Songs",
                            type: "song",
                            data: archive?.map((song) => ({
                                id: song.id,
                                title: song.title,
                                image: song.image,
                            }))
                        },
                        {
                            label: "Playlists",
                            type: "playlist",
                            data: playlists?.map((playlist) => ({
                                id: playlist.id,
                                title: playlist.title,
                                image: playlist.image,
                            }))
                        }
                    ]}
                />
                {user ? (
                    <div className="flex flex-row items-center space-x-2">
                        <UserAccountNav
                            user={{
                                name: user.name,
                                image: user.image,
                                email: user.email,
                            }}
                        />
                    </div>
                ) : (
                    <nav className="flex flex-row items-center space-x-4">
                        <Button variant='secondary' size='sm' className="px-4" onClick={() => onOpen('loginModal')} >
                            Login
                        </Button>
                    </nav>

                )}

            </div>
        </>
    )
}