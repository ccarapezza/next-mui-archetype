
import { imageContainerService } from '@/services/ImageContainerService';
import { IMAGE_CONTAINER_CODES } from '@/utils/Constants';

import Image from 'next/image'
import React from 'react'

const getHomeImageBlock = async () => {
    const imageHomeBlock = await imageContainerService.getDtoByCodes([
        IMAGE_CONTAINER_CODES.HOME_IMAGE_1,
        IMAGE_CONTAINER_CODES.HOME_IMAGE_2,
        IMAGE_CONTAINER_CODES.HOME_IMAGE_3
    ]);
    return imageHomeBlock;
}

export default async function HomeImageBlock() {
    const imageContainers = await getHomeImageBlock();
    const imageHome1 = imageContainers.find((imageContainer) => imageContainer.code === IMAGE_CONTAINER_CODES.HOME_IMAGE_1);
    const imageHome2 = imageContainers.find((imageContainer) => imageContainer.code === IMAGE_CONTAINER_CODES.HOME_IMAGE_2);
    const imageHome3 = imageContainers.find((imageContainer) => imageContainer.code === IMAGE_CONTAINER_CODES.HOME_IMAGE_3);

    return (<ul className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <li>
            <a href={imageHome1?.link || "#"} className="relative block group">
                <Image
                    src={imageHome1?.image || "https://dummyimage.com/800x800/322F30/EFE6D9.png"}
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                    width={800}
                    height={800}
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    {imageHome1?.title &&
                        <h3 className="text-xl font-medium text-secondary">{imageHome1?.title}</h3>
                    }
                    {imageHome1?.buttonLabel &&
                        <span className="mt-1.5 inline-block bg-primary px-5 py-3 text-xs font-medium uppercase tracking-wide text-quaternary">
                            {imageHome1?.buttonLabel}
                        </span>
                    }
                </div>
            </a>
        </li>

        <li>
            <a href={imageHome2?.link || "#"} className="relative block group">
                <Image
                    src={imageHome2?.image || "https://dummyimage.com/800x800/322F30/EFE6D9.png"}
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                    width={800}
                    height={800}
                />
                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    {imageHome2?.title &&
                        <h3 className="text-xl font-medium text-secondary">{imageHome2?.title}</h3>
                    }
                    {imageHome2?.buttonLabel &&
                        <span className="mt-1.5 inline-block bg-primary px-5 py-3 text-xs font-medium uppercase tracking-wide text-quaternary">
                            {imageHome2?.buttonLabel}
                        </span>
                    }
                </div>
            </a>
        </li>

        <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <a href={imageHome3?.link || "#"} className="relative block group">
                <Image
                    src={imageHome3?.image || "https://dummyimage.com/800x800/322F30/EFE6D9.png"}
                    alt=""
                    className="object-cover w-full transition duration-500 aspect-square group-hover:opacity-90"
                    width={800}
                    height={800}
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                    {imageHome3?.title &&
                        <h3 className="text-xl font-medium text-secondary">{imageHome3?.title}</h3>
                    }
                    {imageHome3?.buttonLabel &&
                        <span className="mt-1.5 inline-block bg-primary px-5 py-3 text-xs font-medium uppercase tracking-wide text-quaternary">
                            {imageHome3?.buttonLabel}
                        </span>
                    }
                </div>
            </a>
        </li>
    </ul>)
}