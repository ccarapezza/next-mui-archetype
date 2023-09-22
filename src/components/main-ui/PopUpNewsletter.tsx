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
                        <Image src="https://dummyimage.com/800x800/322F30/EFE6D9.png" alt="Newsletter" width={200} height={200} layout="responsive" className=""/>
                        <div className="space-y-3 px-5 py-4">
                            {/* <h4 className="text-lg font-medium text-gray-800">
                                ¡Bienvenido a Cultivo mis derechos!
                            </h4> */}
                            <p className="text-[16px] text-tertiary mb-5">
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