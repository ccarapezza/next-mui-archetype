"use client"
import { useEffect, useState } from 'react'
import Link from "next/link";
import Image from 'next/image'
import logo from "./../../../assets/logos/CMD-Logo-Navbar.png";
import MiniCart from '../minicart/MiniCart';
import NavBarAuth from './auth/NavBarAuth';
import { ClientSafeProvider, LiteralUnion, getProviders } from 'next-auth/react'
import { BuiltInProviderType } from 'next-auth/providers';

export default function Navbar(props: {categoryTree: any}) {

    const { categoryTree } = props;
    const [state, setState] = useState(false);
    const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);

    useEffect(() => {
        getProviders().then((providersIncomming) => {
            setProviders(providersIncomming)
        })
    }, []);

    function clearNameForUrl(urlCategory: string) {
        // Convertir a minúsculas y eliminar acentos
        urlCategory = urlCategory.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, '');
        // Reemplazar caracteres especiales y espacios por guiones
        urlCategory = urlCategory.replace(/[^\w]/g, '');

        return urlCategory;
    }

    const navigation = categoryTree.map((category: any) => {
        return {
            title: category.name,
            path: clearNameForUrl(category.name)
        }
    })

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target as Element;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, [])

    return (
        <nav className={`md:text-sm fixed z-50 w-full top-0 bg-white shadow-lg ${state ? "shadow-lg md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-1 md:block">
                    <Link href="/">
                        <Image src={logo} alt='Float UI logo' width={200} />
                    </Link>
                    <div className="flex items-center gap-2.5 md:hidden">
                        {/* <AuthSection /> */}
                        <NavBarAuth />
                        <MiniCart />
                        <button className="menu-btn text-tertiary-600 hover:text-primary-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    <div className="bg-white  p-4 rounded-lg flex-1 text-tertiary-800 gap-6 items-center justify-between md:flex md:mt-0 md:p-0 md:bg-transparent">
                        <ul className="flex content-center justify-center flex-col gap-6 space-y-4 pb-4 text-lg text-tertiary-800 md:flex md:space-y-0 md:flex-row md:pb-0 font-semibold">
                            {
                                navigation.map((item: any, idx: number) => {
                                    return (
                                        <Link
                                            className='hover:text-primary'
                                            href={`/category/${item.path}`}
                                            key={idx}
                                        >
                                            {item.title}
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <div className="flex-1 gap-x-6 items-center justify-end hidden space-y-6 md:space-y-0 md:flex">
                        {/* <AuthSection /> */}
                        <NavBarAuth />
                        <MiniCart />
                    </div>
                </div>
            </div>
        </nav>
    )
}