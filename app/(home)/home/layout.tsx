import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
import { Sidebar } from "@/components/sidebar2"
import { dashboardConfig } from "@/config/dashboard"
import { ModeToggle } from "@/components/mode-toggle"
import { User } from "@prisma/client"
import Player from "@/components/player"
import { SiteFooter } from "@/components/site-footer"


interface MarketingLayoutProps {
    children: React.ReactNode
}

export default async function MarketingLayout({
    children,
}: MarketingLayoutProps) {

    const user = await getCurrentUser()

    return (
        <div className="h-full flex container pr-0 pl-0 ">
            <Sidebar currentUser={user as User} playlists={[]} className="hidden lg:block border-r" />
            <main className="flex-1 h-full overflow-y-auto">
                {children}
            </main>
            <Player className="absolute container" />
        </div>
    )
}

