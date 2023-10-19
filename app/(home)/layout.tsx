import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { UserAccountNav } from "@/components/user-account-nav"
import { getCurrentUser } from "@/lib/session"
import { notFound } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
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
        <div className="flex flex-col min-h-screen container">
            <div className="flex-1 bg-background">
                <div className="grid lg:grid-cols-5"><div className="">
                    <Sidebar playlists={[]} className="hidden lg:block " />
                </div>
                    <div className="col-span-3 lg:col-span-4 lg:border-l">
                        <div className="h-full">
                            <header className="sticky top-0 z-40 border-b bg-background mb-4 px-3">
                                <div className="container flex h-20  items-center justify-between  ">
                                    <MainNav user={user as User} items={dashboardConfig.mainNav} />
                                </div>
                            </header>
                            <main className="flex-1 px-8">
                                {children}
                            </main>

                        </div>
                    </div>

                </div>

            </div>
            {/* <SiteFooter className="bg-white" /> */}

            <Player />
            {/* <Player className="sticky bottom-0 z-40 border-t bg-background" /> */}
        </div>
    )
}