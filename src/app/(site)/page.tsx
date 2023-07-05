'use client';
import * as React from 'react';
import Hero from '@/components/main-ui/Hero';
import Features from '@/components/main-ui/Features';
import CarouselHome from '@/components/carousels/CarouselHome';
import CollectionsGrid from '@/components/main-ui/CollectionsGrid';
import ProductCard from '@/components/main-ui/ProductCard';
import CarouselProducts from '@/components/carousels/CarouselProducts';

export default function Home() {
  return (
    <>
      <CarouselHome />
      <CollectionsGrid />
      <CarouselProducts />
      {/* <Hero />
      <Features /> */}
    </>)
    ;
}