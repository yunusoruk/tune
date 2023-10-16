"use client"
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { useParams, useRouter } from 'next/navigation';
import { Icons } from '../icons';
import { UserLoginForm } from '@/app/(auth)/components/user-login-form';

const LoginModal = () => {

    const { isOpen, onClose, type, onOpen } = useModal();

    const router = useRouter()
    const params = useParams()

    const isModalOpen = isOpen && type === "loginModal";

    const handleClose = () => {
        // form.reset()
        onClose();
    }

    const forward = () => {
        onClose()
        onOpen('registerModal')
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="max-h-[640px] ">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] py-4">
                    <div className="flex flex-col space-y-2 text-center">
                        <Icons.logo className="mx-auto h-6 w-6" />

                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome back
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email to sign in to your account
                        </p>
                    </div>
                    {/* <UserLoginForm /> */}
                    <UserLoginForm />
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        <span
                            className="hover:text-brand cursor-pointer underline underline-offset-4"
                            onClick={() => forward()}
                        >
                            Don&apos;t have an account? Sign Up
                        </span>
                    </p>
                </div>


            </DialogContent>

        </Dialog>
    );
}

export default LoginModal;