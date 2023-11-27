'use client';
import SliderImagesControl from '@/components/management/content-manager/SliderImagesControl';
import { SliderImageDto } from '@/schemas/sliderImage';
import React from 'react'

export default function SliderControlClientPage({images}: {images: SliderImageDto[]}) {
  return (<>
    <SliderImagesControl defaultFiles={images} name='' onChange={()=>{}}/>
  </>)
}
