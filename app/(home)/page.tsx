import AddMusicButton from "@/components/add-music-button";
import FavoritesClient from "@/components/clients/favorites-client";
import MusicClient from "@/components/clients/music-client";
import { Icons } from "@/components/icons";
import { PodcastEmptyPlaceholder } from "@/components/podcast-empty-placeholder";
import { SongArtwork } from "@/components/song-artwork";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/lib/session";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";


export default async function Home() {

    redirect('/home')


}

