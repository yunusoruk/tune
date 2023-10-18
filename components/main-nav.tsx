"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { MainNavItem } from "@/types"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { MobileNav } from "@/components/mobile-nav"
import { Command as Logo, X } from 'lucide-react'
import { UserAccountNav } from "./user-account-nav"
import { Button, buttonVariants } from "./ui/button"
import { useModal } from "@/hooks/use-modal-store"
import { Song, User } from "@prisma/client"
import { ModeToggle } from "./mode-toggle"
import { SearchBar } from "./search"

interface MainNavProps {
    user: User
    items?: MainNavItem[]
    children?: React.ReactNode
}

export function MainNav({ user, items, children }: MainNavProps) {



    const segment = useSelectedLayoutSegment()
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
    const [archive, setArchive] = React.useState<Song[] | undefined>([]);

    const { onOpen } = useModal()

    React.useEffect(() => {
        fetch(`/api/song`)
            .then(response => response.json())
            .then(data => setArchive(data))
            .catch(error => console.error('Error fetching song:', error));
    }, [])

    return (
        <>
            <div className="">
            </div>
            <SearchBar
                data={[
                    {
                        label: "Songs",
                        type: "song",
                        data: archive?.map((song) => ({
                            id: song.id,
                            title: song.title,
                            image: song.image,
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

        </>
    )
}