'use client';
import CollectionsGrid from '@/components/main-ui/CollectionsGrid';
import PopUpNewsletter from '@/components/main-ui/PopUpNewsletter';
import CarouselHome from '@/components/store/carousels/CarouselHome';
import CarrouselProductServer from '@/components/store/carousels/CarrouselProductServer';
import { useEffect, useState } from 'react';


export default function Home() {
    const [imgSrc, setImgSrc] = useState();
    
    const getImage = async (key: string) => {
        const res = await fetch(`http://localhost:3000/api/image/${key}`);
        return res.json();
    }

    useEffect(() => {
        const url = getImage('test');
        url.then((url) => {
            setImgSrc(url);
        });
    }, []);

    return (
        <>
            <PopUpNewsletter />
            <CarouselHome />
            <CollectionsGrid />
            <CarrouselProductServer />
            {/* <Hero />
      <Features /> */}
        </>)
        ;
}