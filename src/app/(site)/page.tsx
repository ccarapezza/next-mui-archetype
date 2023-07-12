'use client';
import * as React from 'react';
import Hero from '@/components/main-ui/Hero';
import Features from '@/components/main-ui/Features';
import CollectionsGrid from '@/components/main-ui/CollectionsGrid';
import PopUpNewsletter from '@/components/main-ui/PopUpNewsletter';
import CarouselHome from '@/components/store/carousels/CarouselHome';
import CarouselProducts from '@/components/store/carousels/CarouselProducts';

export default function Home() {
  return (
    <>
      <PopUpNewsletter />
      <CarouselHome />
      <CollectionsGrid />
      <CarouselProducts />
      {/* <Hero />
      <Features /> */}
    </>)
    ;
}