"use client"
import { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';
import AuthSection from './AuthSection';
import ThemeSwitch from '../Theme/ThemeRegistry/ThemeSwitch'
import Image from 'next/image'
import logo from "../../assets/logos/logo.svg";
import MiniCart from '../store/minicart/MiniCart';

export default () => {
  const router = useRouter();
  const [state, setState] = useState(false)

  const navigation = [
    { title: "Hombre", path: "hombre" },
    { title: "Mujer", path: "mujer" },
    { title: "Niño", path: "nino" },
    { title: "Sale", path: "sale" }
  ]

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target as Element;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, [])

  return (
    <nav className={`md:text-sm fixed z-50 w-full top-0 bg-white shadow-lg ${state ? "shadow-lg md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
      <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex items-center justify-between py-5 md:block">
          <Link href="/">
            <Image src={logo} alt='Float UI logo' />
          </Link>
          <div className="flex items-center gap-2.5 md:hidden">
            <AuthSection />
            <MiniCart />
            <button className="menu-btn text-gray-500 hover:text-gray-800"
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
          <div className="bg-white  p-4 rounded-lg flex-1 text-gray-700  gap-6 items-center justify-between md:flex md:mt-0 md:p-0 md:bg-transparent">
            <ul className="gap-6 space-y-4 [&>li>*]:duration-150 [&>li:hover>*]:text-gray-900  md:flex md:space-y-0">
              {
                navigation.map((item, idx) => {
                  return (
                    <Link
                      href={`/category/${item.path}`}
                    >
                      {item.title}
                    </Link>
                  )
                })
              }
            </ul>
          </div>
          <div className="flex-1 gap-x-6 items-center justify-end hidden space-y-6 md:space-y-0 md:flex">
            <AuthSection />
            <MiniCart />
          </div>
        </div>
      </div>
    </nav>
  )
}