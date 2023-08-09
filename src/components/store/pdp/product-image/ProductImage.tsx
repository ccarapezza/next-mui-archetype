'use client'
import { useState } from 'react';
import ProductImageMain from './ProductImageMain';

const images = [
  {
    url: 'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+1',
    alt: 'Image 1'
  },
  {
    url: 'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+2',
    alt: 'Image 2'
  },
  {
    url: 'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+3',
    alt: 'Image 3'
  },
  {
    url: 'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+4',
    alt: 'Image 4'
  },
  {
    url: 'https://dummyimage.com/700x500/322f30/EFE6D9.jpg&text=Imagen+5',
    alt: 'Image 5'
  }
]

export default function () {

  const [activeImage, setActiveImage] = useState(0)


  return (
    <div className="w-full md:w-1/2 ">
      <div>
        <div className="relative mt-4">
          <ProductImageMain images={images} activeImage={activeImage} />
        </div>
        <ul className="mt-1 flex gap-1 hidden md:flex">
          {
            images.map((image, index) => (
              <li key={index}
                onClick={() => {
                  setActiveImage(index)
                }}
                className={`rounded-md cursor-pointer ${activeImage == index ? 'opacity-100' : 'opacity-50'}`}
              >
                <img
                  alt={image.alt}
                  src={image.url}
                  className="h-16 w-16 rounded-md object-cover"
                />
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}