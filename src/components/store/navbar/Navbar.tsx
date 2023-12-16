"use client"
import { useEffect, useState } from 'react'
import Link from "next/link";
import Image from 'next/image'
import MiniCart from '../minicart/MiniCart';
import NavBarAuth from './auth/NavBarAuth';
import { Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import LanguageSwitcher from '@/components/main-ui/LanguageSwitcher';
import StringUtils from '@/utils/StringUtils';

export default function Navbar(props: { categoryTree: any }) {

    const { categoryTree } = props;
    const [state, setState] = useState(false);

    const staticMenu = categoryTree.map((category: any) => {
        return {
            title: category.name,
            path: `/shop/${StringUtils.sanitizeTextAndReplaceSpaces(category.name)}`,
            children: category?.childrens?.map((subcategory: any) => {
                return {
                    title: subcategory.name,
                    path: `/shop/${StringUtils.sanitizeTextAndReplaceSpaces(category.name)}/${StringUtils.sanitizeTextAndReplaceSpaces(subcategory.name)}`,
                }
            })
        }
    })

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target as Element;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, [])

    return (
        <nav className={`md:text-sm fixed z-10 w-full top-0 bg-white shadow-lg ${state ? "shadow-lg md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-1 md:block">
                    <Link href="/">
                        <Image src="/logos/NEXT-Store-logo.png" alt='Float UI logo' className='min-h-64' width={200} height={200} />
                    </Link>
                    <div className="flex items-center gap-2.5 md:hidden">
                        {/* <AuthSection /> */}
                        <LanguageSwitcher/>
                        <NavBarAuth />
                        <MiniCart />
                        <button className="menu-btn text-tertiary-600 hover:text-primary-800"
                            onClick={() => setState(!state)}
                        >
                            {
                                state ? (
                                    <FontAwesomeIcon icon={faTimes} size='xl' fixedWidth />
                                ) : (
                                    <FontAwesomeIcon icon={faBars} size='xl' fixedWidth />
                                )
                            }
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center md:mt-0 md:flex ${state ? 'block' : 'hidden'} `}>
                    <div className="bg-white p-4 rounded-lg flex-1 text-tertiary-800 items-center justify-between md:flex md:mt-0 md:p-0 md:bg-transparent">
                        <ul className="flex content-center justify-center flex-col gap-10 space-y-4 pb-4 text-lg text-tertiary-800 md:flex md:space-y-0 md:flex-row md:pb-0 font-semibold">
                            {
                                staticMenu.map((item: any, idx: number) => {
                                    return (<Box key={"cat-" + idx} className="group relative dropdown">
                                        <Link
                                            href={item.path}
                                            target={item.target}
                                            className='hover:text-primary whitespace-nowrap'
                                        >
                                            {item.icon && <FontAwesomeIcon icon={item.icon} className='mr-2' />}
                                            {item.title}
                                        </Link>
                                        {item.children.length > 0 && (
                                            <div className="group-hover:block dropdown-menu absolute hidden h-auto p-6 brder drop-shadow-sm">
                                                <ul className="flex flex-col gap-2 p-2 bg-white rounded-lg border">
                                                    {item.children.map((child: any, subIdx: number) => {
                                                        return (
                                                            <Link
                                                                href={child.path}
                                                                key={"subcat-" + idx + subIdx}
                                                                className='hover:text-primary whitespace-nowrap px-4 py-2'
                                                            >
                                                                {child.title}
                                                            </Link>
                                                        )
                                                    }
                                                    )}
                                                </ul>
                                            </div>
                                        )}

                                    </Box>)
                                })
                            }
                        </ul>
                    </div>
                    <div className="flex-1 gap-x-6 items-center justify-end hidden space-y-6 md:space-y-0 md:flex">
                        {/* <AuthSection /> */}
                        <LanguageSwitcher/>
                        <NavBarAuth />
                        <MiniCart />
                    </div>
                </div>
            </div>
        </nav>
    )
}