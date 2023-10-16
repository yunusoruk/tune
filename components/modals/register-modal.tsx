"use client"
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useModal } from '@/hooks/use-modal-store';
import { useParams, useRouter } from 'next/navigation';
import { Icons } from '../icons';
import { UserLoginForm } from '@/app/(auth)/components/user-login-form';
import { UserRegisterForm } from '@/app/(auth)/components/user-register-form';
import Link from 'next/link';

const RegisterModal = () => {

    const { isOpen, onClose, type, onOpen } = useModal();

    const router = useRouter()
    const params = useParams()

    const isModalOpen = isOpen && type === "registerModal";

    const handleClose = () => {
        // form.reset()
        onClose();
    }

    const forward = () => {
        onClose()
        onOpen('loginModal')
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
                    <UserRegisterForm />

                    <p className="px-8 text-center text-sm text-muted-foreground">
                        By clicking continue, you agree to our{" "}
                        <Link
                            href="/terms"
                            className="hover:text-brand underline underline-offset-4"
                        >
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="/privacy"
                            className="hover:text-brand underline underline-offset-4"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </p>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                        <span
                            className="hover:text-brand cursor-pointer underline underline-offset-4"
                            onClick={() => forward()}
                        >
                            Already have an account? Sign In
                        </span>
                    </p>
                </div>


            </DialogContent>

        </Dialog>
    );
}

export default RegisterModal;