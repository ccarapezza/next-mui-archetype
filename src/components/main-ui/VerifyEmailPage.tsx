'use client';
import { useSearchParams, useRouter } from 'next/navigation'
import MuiAlert from "@/components/client/MuiAlert";
import { faExclamationCircle, faHome, faPaperPlane, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertTitle, Stack } from "@mui/material";
import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

export const dynamic = 'force-dynamic'
const verifyEmailByToken = async ({ token }: { token: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/auth/verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token
        })
    });
    return res;
};

const resendVerifyEmail = async ({ email }: { email: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/auth/resend-verify-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    });
    return res;
};

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParam = useSearchParams();
    const [resendVerificationMode, setResendVerificationMode] = useState(false);

    useEffect(() => {
        const token = searchParam.get('token');
        setShowSignInButton(false);
        if (token) {
            setMessage({
                severity: "info",
                title: "Validando...",
                message: "Espere un momento por favor."
            });
            verifyEmailByToken({ token: token as string }).then((res) => {
                if (res.ok) {
                    setMessage({
                        severity: "success",
                        title: "Cuenta activada",
                        message: "Su cuenta ha sido activada correctamente. Ya puede iniciar sesión."
                    });
                    setShowSignInButton(true);
                }
            }).catch((err) => {
                setMessage({
                    severity: "error",
                    title: "Error",
                    message: "Ha ocurrido un error al activar su cuenta. Por favor, inténtelo de nuevo más tarde."
                });
                console.error(err);
            });
        }
    }, [searchParam]);

    useEffect(() => {
        const verificationSended = searchParam.get('verification-sended');
        if (verificationSended) {
            setMessage({
                severity: "success",
                title: "Active su cuenta",
                message: "Para activar su cuenta, por favor haga click en el enlace que le hemos enviado a su correo electrónico."
            });
            setShowSignInButton(false);
        }
    }, [searchParam]);

    useEffect(() => {
        const resendVerification = searchParam.get('resend-verification');
        setResendVerificationMode(resendVerification?true:false);
    }, [searchParam]);

    const [message, setMessage] = useState({
        severity: "info",
        title: "Cargando...",
        message: "Espere un momento por favor."
    })

    const [showSignInButton, setShowSignInButton] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<{
        email: string,
    }>({
        resolver: yupResolver(yup.object({
            email: yup.string().email().min(3).max(50).required(),
        }).required())
    });

    const onSubmit = async (data: {email: string}) => {
        setMessage({
            severity: "info",
            title: "Enviando email de verificación...",
            message: "Espere un momento por favor."
        });
        resendVerifyEmail({ email: data.email }).then((res) => {
            if (res.ok) {
                setMessage({
                    severity: "success",
                    title: "Active su cuenta",
                    message: "Para activar su cuenta, por favor haga click en el enlace que le hemos enviado a su correo electrónico."
                });
                router.push("/verify-email?verification-sended=true");
            }
        }).catch((err) => {
            setMessage({
                severity: "error",
                title: "Error",
                message: "Ha ocurrido un error al activar su cuenta. Por favor, inténtelo de nuevo más tarde."
            });
            console.error(err);
        });
    }

    return (
        <section className="flex-1 leading-relaxed max-w-screen-xl pt-5 mx-auto px-4 md:px-8 mb-4">
            {resendVerificationMode?<>
                <MuiAlert severity="info" className="mb-4">
                    <AlertTitle className="font-medium">{"Reenvío de email de verificación"}</AlertTitle>
                    <p>
                        {"Ingrese su correo electrónico para reenviar el email de verificación."}
                    </p>
                </MuiAlert>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="relative">
                        <input {...register("email")} placeholder="Email" type="email" id="email" name="email" className="py-3 px-4 block w-full border border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400" required aria-describedby="email-error" />
                        <div className="hidden absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                            <FontAwesomeIcon icon={faExclamationCircle} className="h-5 w-5 text-red-500" />
                        </div>
                    </div>
                    <p className="text-xs text-red-600 mt-2">{errors.email?.message}</p>
                    <button className="p-2 text-gray-600 bg-green-500 text-white rounded-md hover:bg-green-600 border mt-2 box-content">
                            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                            Enviar email de verificación
                    </button>
                </form>
            </>
            :<>
                <MuiAlert severity={message.severity}>
                    <AlertTitle className="font-medium">{message.title}</AlertTitle>
                    <span>
                        <p>
                            {message.message}
                        </p>
                    </span>
                </MuiAlert>
                <Stack>
                    {showSignInButton && (
                        <Link href="/auth/signin">
                            <button className="p-2 bg-slate-800 text-white rounded-md hover:bg-gray-700 border mt-2 box-content">
                                <FontAwesomeIcon icon={faSignIn} className="mr-2" />
                                Iniciar Sesión
                            </button>
                        </Link>
                    )}
                </Stack>
            </>}
            <Link href="/">
                <button className="p-2 text-gray-600 rounded-md hover:bg-gray-100 border mt-2 box-content">
                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                    Volver a la página principal
                </button>
            </Link>
        </section>
    )
}