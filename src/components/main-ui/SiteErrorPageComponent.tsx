'use client';
import MuiAlert from "@/components/client/MuiAlert";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AlertTitle } from "@mui/material";
import Link from 'next/link'
import { useState } from "react";

export default function SiteErrorPage() {
    
    const [message, setMessage] = useState("");

    return (
        <section className="flex-1 leading-relaxed max-w-screen-xl pt-5 mx-auto px-4 md:px-8 mb-4">
            {message &&
                <MuiAlert severity="error">
                    <AlertTitle className="font-medium">Error</AlertTitle>
                    <span>
                        <p>
                            {message}
                        </p>
                    </span>
                </MuiAlert>
            }
            <Link href="/">
                <button className="p-2 text-gray-600 rounded-md hover:bg-gray-100 border mt-2 box-content">
                    <FontAwesomeIcon icon={faHome} className="mr-2" />
                    Volver a la página principal
                </button>
            </Link>

        </section>
    )
}