'use client'
import React from 'react'
 
import { usePathname } from 'next/navigation'
import Navbar from './Navbar';

function MainPublicHeader() {
    const pathname = usePathname();

    if(pathname.startsWith('/management')){
        return (<></>);
    }

    return <Navbar/>
}

export default MainPublicHeader