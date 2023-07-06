import React from 'react'
import Image from 'next/image';

const CollectionsGrid = () => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header className="text-center">
          <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
            New Collection
          </h2>

          <p className="max-w-md mx-auto mt-4 text-gray-500">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
            praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
            natus?
          </p>
        </header>

        <ul className="grid grid-cols-1 gap-4 mt-8 lg:grid-cols-3">
          <li>
            <a href="#" className="relative block group">
              <Image
                src="https://dummyimage.com/774x1161/111827/4F46E5.png"
                alt=""
                className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                width={774}
                height={1161}
              />

              <div
                className="absolute inset-0 flex flex-col items-start justify-end p-6"
              >
                <h3 className="text-xl font-medium text-white">Casual Trainers</h3>

                <span
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Shop Now
                </span>
              </div>
            </a>
          </li>

          <li>
            <a href="#" className="relative block group">
              <Image
                src="https://dummyimage.com/774x1161/111827/4F46E5.png"
                alt=""
                className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                width={774}
                height={1161}
              />

              <div
                className="absolute inset-0 flex flex-col items-start justify-end p-6"
              >
                <h3 className="text-xl font-medium text-white">Winter Jumpers</h3>

                <span
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Shop Now
                </span>
              </div>
            </a>
          </li>

          <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <a href="#" className="relative block group">
              <Image
                src="https://dummyimage.com/774x1161/111827/4F46E5.png"
                alt=""
                className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                width={774}
                height={1161}
              />

              <div
                className="absolute inset-0 flex flex-col items-start justify-end p-6"
              >
                <h3 className="text-xl font-medium text-white">Skinny Jeans Blue</h3>

                <span
                  className="mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
                >
                  Shop Now
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