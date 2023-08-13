"use client"
import Link from "next/link";
import Image from 'next/image'

export default function HeaderCheckout(props: { ctaButton: string }) {

    const { ctaButton } = props
    return (
        <nav className="flex justify-center bg-white w-full">
            <div className="flex justify-between items-center w-full p-4 max-w-screen-xl border-b">
                <Link href="/">
                    <Image src={"/logos/CMD-Logo-Navbar.png"} alt='Float UI logo' width={200} height={200} />
                </Link>
                <Link
                    className="text-4xl font-tungsten text-primary"
                    href="/"
                >
                    {ctaButton}
                </Link>
            </div>
        </nav>
    )
}