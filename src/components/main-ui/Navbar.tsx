"use client"
import { useEffect, useState } from 'react'
import ThemeSwitch from '../Theme/ThemeRegistry/ThemeSwitch'
import Image from 'next/image'
import logo from "../../assets/logos/logo.svg";
import logoDark from "../../assets/logos/logo-dark.svg";
import AuthSection from './AuthSection';

export default () => {

    const [state, setState] = useState(false)

    // Replace javascript:void(0) paths with your paths
    const navigation = [
        { title: "Features", path: "/" },
        { title: "Integrations", path: "/" },
        { title: "Customers", path: "/" },
        { title: "Pricing", path: "/" }
    ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target as Element;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, [])

    return (
        <nav className={`pb-5 md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <a href="/">
                        <Image src={logo} className="dark:hidden" alt='Float UI logo'/>
                        <Image src={logoDark} className="hidden dark:block" alt='Float UI logo'/>
                    </a>
                    <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg flex-1 mt-10 text-gray-700 dark:text-gray-300 gap-6 items-center justify-between md:flex md:mt-0 md:p-0 dark:md:bg-transparent md:bg-transparent">
                        <ul className="gap-6 space-y-4 [&>li>*]:duration-150 [&>li:hover>*]:text-gray-900 dark:[&>li:hover>*]:text-gray-100 md:flex md:space-y-0">
                            {
                                navigation.map((item, idx) => {
                                    return (
                                        <li key={idx} className="">
                                            <a href={item.path} className="block">
                                                {item.title}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
                        <ThemeSwitch/>
                        <AuthSection/>
                    </div>
                </div>
            </div>
        </nav>
    )
}