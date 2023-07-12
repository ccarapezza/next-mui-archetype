import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import { useState } from "react"
import SubscriptionForm from "./SubscriptionForm";
import { faClose } from "@fortawesome/free-solid-svg-icons";

export default () => {

    const { status } = useSession();
    const [modalState, setModalState] = useState(true)

    return (
        modalState && status === "unauthenticated" ? (
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setModalState(false)}></div>
                <div className="flex items-center min-h-screen px-4 py-8">
                    <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
                        <div className="flex justify-end">
                            <button className="p-2 text-gray-400 rounded-md hover:bg-gray-100"
                                onClick={() => setModalState(false)}
                            >
                                <FontAwesomeIcon icon={faClose}/>
                            </button>
                        </div>
                        <div className="max-w-sm mx-auto py-3 space-y-3 text-center">
                            <h4 className="text-lg font-medium text-gray-800">
                                Sign up for our newsletter
                            </h4>
                            <p className="text-[15px] text-gray-600">
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <SubscriptionForm mode='popup'/>
                        </div>
                    </div>
                </div>
            </div>
        ) : ''
    )
}