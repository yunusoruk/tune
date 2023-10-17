"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { useParams, useRouter } from "next/navigation";
import * as z from "zod"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import FileUpload from "@/components/file-upload";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
    title: z.string().min(2),
    author: z.string().min(2),
    songUrl: z.string(),
    imageUrl: z.string()
})

type AddMusicFormValues = z.infer<typeof formSchema>

const AddMusicModal = () => {

    const { isOpen, onClose, type, onOpen } = useModal();

    const router = useRouter()
    const params = useParams()

    const isModalOpen = isOpen && type === "addMusicModal";

    const form = useForm<AddMusicFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            author: "",
            songUrl: "",
            imageUrl: ""
        }

    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: AddMusicFormValues) => {
        console.log(data);

        try {
            await axios.post(`/api/song`, data);
            router.refresh();
            toast({
                title: "The song is submitted.",
                description: "This song will be posted after confirmation."
            })
            router.push('/')
            onClose()
        } catch (error) {
            toast({
                description: "Oops something went wrong."
            })
            onClose()
        }

    }

    const handleClose = () => {
        // form.reset()
        onClose();
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add music</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                        <FormField
                            key="title"
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">

                                    <FormLabel className="text-right">Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} className="col-span-3" placeholder="Enter song title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            key="author"
                            control={form.control}
                            name="author"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">

                                    <FormLabel className="text-right">Author</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} className="col-span-3" placeholder="Enter author name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            key="songUrl"
                            control={form.control}
                            name="songUrl"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">

                                    <FormLabel className="text-right">Song</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            className="col-span-3"
                                            accept="mp3"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            key="imageUrl"
                            control={form.control}
                            name="imageUrl"
                            render={({ field }) => (
                                <FormItem className="grid grid-cols-4 items-center gap-4">

                                    <FormLabel className="text-right">Image</FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            className="col-span-3"
                                            accept="image"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">Upload</Button>
                        </DialogFooter>
                    </form>
                </Form>


            </DialogContent>
        </Dialog>
    );
}

export default AddMusicModal;