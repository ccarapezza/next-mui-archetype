'use client'
import { use, useEffect, useState } from 'react';
import ProductImageMain from './ProductImageMain';
import Image from 'next/image';


export default function ProductImage(props: { images: string[] }) {

  const { images } = props
  const [activeImage, setActiveImage] = useState(0)

  return (
    <div className="w-full md:w-1/2 ">
      <div>
        <div className="relative mt-4">
          <ProductImageMain images={images} activeImage={activeImage} />
        </div>
        <ul className="mt-1 flex gap-1 hidden md:flex">
          {
            images?.map((image: string, index: number) => (
              <li key={index}
                onClick={() => {
                  setActiveImage(index)
                }}
                className={`rounded-md cursor-pointer ${activeImage == index ? 'opacity-100' : 'opacity-50'}`}
              >
                <Image
                  alt={'Nombre del prodcuto'}
                  src={image}
                  className="h-16 w-16 rounded-md object-cover"
                  width={64}
                  height={64}
                />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}