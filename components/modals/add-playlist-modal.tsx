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
    imageUrl: z.string()
})

type AddPlaylistFormValues = z.infer<typeof formSchema>

const AddPlaylistModal = () => {

    const { isOpen, onClose, type, onOpen } = useModal();

    const router = useRouter()
    const params = useParams()

    const isModalOpen = isOpen && type === "addPlaylistModal";

    const form = useForm<AddPlaylistFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            imageUrl: ""
        }

    })

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (data: AddPlaylistFormValues) => {
        console.log(data);

        try {
            await axios.post(`/api/playlist`, data);
            router.refresh();
            toast({
                description: "New playlist created."
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
                    <DialogTitle>Create new playlist</DialogTitle>
                    <DialogDescription>
                        Enter a name and upload a image for your playlist.
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

                                    <FormLabel className="text-right">Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} className="col-span-3" placeholder="Enter playlist name" {...field} />
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
                            <Button type="submit">Create</Button>
                        </DialogFooter>
                    </form>
                </Form>


            </DialogContent>
        </Dialog>
    );
}

export default AddPlaylistModal;