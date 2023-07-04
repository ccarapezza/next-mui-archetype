'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import SignInButton from './SignInButton';

// Replace / path with your path
const navigation = [
    { title: "Features", path: "/main/features" },
    { title: "Careers", path: "/" },
    { title: "Guides", path: "/" },
    { title: "Partners", path: "/" }
]

export default function MainHeader() {
    const [state, setState] = useState(false);
    const pathname = usePathname();

    return (
        <header >
            <nav className="relative z-30">
                <div className="max-w-screen items-center py-1 md:flex md:space-x-8 xl:space-x-24">
                    <Link href={"/main"}>
                        <img
                            className='dark:hidden'
                            src="https://www.floatui.com/logo.svg"
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                        <img
                            className='hidden dark:block'
                            src="https://www.floatui.com/images/logo.svg"
                            width={120}
                            height={50}
                            alt="Float UI logo"
                        />
                    </Link>
                    <button className="text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 relative z-30" aria-label="Open Menu button"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
                    <button className="text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 relative z-30"
                        onClick={() => setState(!state)}
                    >
                        {
                            state ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )
                        }
                    </button>
                </div>
                <ul className={`flex-1 justify-between mt-12 md:flex md:mt-0 ${state ? '' : 'hidden'}`}>
                    <li className="order-2 pb-5 md:pb-0">
                        <SignInButton/>
                    </li>
                    <div className="order-1 flex-1 justify-center items-center space-y-5 md:flex md:space-x-6 md:space-y-0">
                        {
                            navigation.map((item, idx) => (
                                
                                <li className={"dark:text-white text-gray-500 hover:text-indigo-600 "+(pathname==item.path&&"text-indigo-600 font-bold")} key={idx}>
                                    <a href={item.path}>{item.title}</a>
                                </li>
                            ))
                        }
                    </div>
                </ul>
            </nav>
        </header>
    )
}
