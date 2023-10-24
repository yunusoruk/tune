import { getCurrentUser } from "@/lib/session"
import { Sidebar } from "@/components/sidebar"
import { User } from "@prisma/client"
import Player from "@/components/player"

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

