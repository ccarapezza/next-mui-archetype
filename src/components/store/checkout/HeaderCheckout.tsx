"use client"
import Link from "next/link";
import Image from 'next/image'
import { usePathname } from 'next/navigation';
import { Box, Typography } from "@mui/material";
import { use, useEffect } from "react";

export default function HeaderCheckout(props: { ctaButton: string, bgColor: string }) {
    const { ctaButton, bgColor } = props
    const pathName = usePathname();
    const managementAuth = pathName.includes('management-auth');
    
    return (
        <nav className={`flex justify-center bg-slate-200 w-full ${bgColor}`}>
            <div className="flex justify-between items-center w-full p-4 max-w-screen-xl border-b">
                <Link href="/">
                    {managementAuth?
                        <Box className="flex flex-row items-center gap-2">
                            <Image src={"/logos/NEXT-Store-logo.png"} alt='Float UI logo' width={100} height={200} />
                            <Typography variant="h5" className="font-bold">Panel de Administración</Typography>
                        </Box>
                    :
                        <Image src={"/logos/NEXT-Store-logo.png"} alt='Float UI logo' width={200} height={200} />
                    }
                </Link>
                <Link
                    className="text-2xl font-tungsten text-primary font-normal"
                    href="/"
                >
                    {ctaButton}
                </Link>
            </div>
        </nav>
    )
}