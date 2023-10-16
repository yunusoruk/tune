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
import { User } from "@prisma/client"

interface MainNavProps {
    user: User
    items?: MainNavItem[]
    children?: React.ReactNode
}

export function MainNav({ user, items, children }: MainNavProps) {


    const segment = useSelectedLayoutSegment()
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)

    const { onOpen } = useModal()

    return (
        <>
            <div className="">
            </div>
            {user ? (
                <UserAccountNav
                    user={{
                        name: user.name,
                        image: user.image,
                        email: user.email,
                    }}
                />
            ) : (
                <nav>

                    <Button variant='secondary' size='sm' className="px-4" onClick={() => onOpen('loginModal')} >
                        Login
                    </Button>

                </nav>

            )}

        </>
    )
}