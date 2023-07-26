"use client"
import Link from "next/link";
import logo from "../../../assets/logos/logo.svg";
import Image from 'next/image'

export default () => {

  return (
    <nav className="flex justify-center bg-white w-full">
      <div className="flex justify-between items-center w-full p-4 max-w-screen-xl border-b">
        <Link href="/">
          <Image src={logo} alt='Float UI logo' />
        </Link>
        <Link
          href="/"
        >
          Seguir Comprando
        </Link>
      </div>
    </nav>
  )
}