import AddMusicButton from "@/components/add-music-button";
import MusicClient from "@/components/clients/music-client";
import { Icons } from "@/components/icons";
import { PodcastEmptyPlaceholder } from "@/components/podcast-empty-placeholder";
import { SongArtwork } from "@/components/song-artwork";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function Home() {


    return (
        <Tabs defaultValue="music" className="h-full space-y-6">
            <div className="space-between flex items-center">
                <TabsList>
                    <TabsTrigger value="music" className="relative">
                        Music
                    </TabsTrigger>
                    <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                    <TabsTrigger value="live" disabled>
                        Live
                    </TabsTrigger>
                </TabsList>
                <div className="ml-auto mr-4">
                    <AddMusicButton />
                </div>
            </div>
            <TabsContent
                value="music"
                className="border-none p-0 outline-none"
            >
                <MusicClient />
            </TabsContent>
            <TabsContent
                value="podcasts"
                className="h-full flex-col border-none p-0 data-[state=active]:flex"
            >
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                            New Episodes
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            Your favorite podcasts. Updated daily.
                        </p>
                    </div>
                </div>
                <Separator className="my-4" />
                <PodcastEmptyPlaceholder />
            </TabsContent>
        </Tabs>
    )
}

