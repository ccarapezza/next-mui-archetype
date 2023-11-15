'use client';
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react"
import SubscriptionForm from "./SubscriptionForm";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';

export default function PopUpNewsletter(){

    const { status } = useSession();
    const [modalState, setModalState] = useState(true)

    return (
        modalState && status === "unauthenticated" ? (
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setModalState(false)}></div>   
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg mx-auto bg-white shadow-lg">
                        <div className="flex justify-end">
                            <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100 absolute top-2 right-4"
                                onClick={() => setModalState(false)}
                            >
                                <FontAwesomeIcon icon={faClose}/>
                            </button>
                        </div>
                        <div className="flex justify-center my-6">
                            <Image
                                src="/logos/NEXT-Store-logo.png"
                                alt="Logo"
                                width={200}
                                height={200}
                            />
                        </div>
                        <div className="space-y-3 px-5">
                            <p className="text-[16px] text-tertiary my-5">
                                Suscríbete al newsletter y entérate de las últimas novedades y recibí importantes cupones de descuento.
                            </p>
                            <SubscriptionForm mode='popup' setModalState={setModalState}/>
                        </div>
                    </div>
                </div>
            </div>
        ) : ''
    )
}