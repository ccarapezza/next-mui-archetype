'use client';
import React from 'react'
import Image from 'next/image';


const CollectionsGrid = () => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-5xl font-tungsten text-primary sm:text-6xl">
            NOVEDADES
          </h2>

          <p className="max-w-md mx-auto mt-4 text-tertiary">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
            natus?
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
          <li>
            <a href="#" className="relative block group">
              <Image
                src="https://dummyimage.com/774x1161/322F30/EFE6D9.png"
                alt=""
                className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                width={774}
                height={1161}
              />

              <div
                className="absolute inset-0 flex flex-col items-start justify-end p-6"
              >
                <h3 className="text-xl font-medium text-secondary">Grow</h3>

                <span
                  className="mt-1.5 inline-block bg-primary px-5 py-3 text-xs font-medium uppercase tracking-wide text-quaternary"
                >
                  Ver Más
                </span>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="relative block group">
              <Image
                src="https://dummyimage.com/774x1161/322F30/EFE6D9.png"
                alt=""
                className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                width={774}
                height={1161}
              />

              <div
                className="absolute inset-0 flex flex-col items-start justify-end p-6"
              >
                <h3 className="text-xl font-medium text-secondary">Tienda</h3>

                <span
                  className="mt-1.5 inline-block bg-primary px-5 py-3 text-xs font-medium uppercase tracking-wide text-quaternary"
                >
                  Ver Más
                </span>
              </div>
            </a>
          </li>

          <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <a href="#" className="relative block group">
              <Image
                src="https://dummyimage.com/774x1161/322F30/EFE6D9.png"
                alt=""
                className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                width={774}
                height={1161}
              />

              <div
                className="absolute inset-0 flex flex-col items-start justify-end p-6"
              >
                <h3 className="text-xl font-medium text-secondary">Información sobre el trámite.</h3>

                <span
                  className="mt-1.5 inline-block bg-primary px-5 py-3 text-xs font-medium uppercase tracking-wide text-quaternary"
                >
                  Ver Más
                </span>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default CollectionsGrid

function localFont(arg0: { src: string; }) {
  throw new Error('Function not implemented.');
}
