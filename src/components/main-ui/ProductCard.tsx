'use client'
import { ProductDto } from "@/schemas/product";
import Image from 'next/image';
import PriceFormatting from '../management/product/PriceFormatting';
import Link from 'next/link';

const ProductCard = (props: { product: ProductDto }) => {
    const { product } = props;

    let images: string[] = [];
    product?.items?.forEach(item => {
        item.images?.forEach(image => {
            images.push(image);
        })
    });

    const getImage = (index: number) => {
        //add all images on one array
        for (let i = index; i >= 0; i--) {
            const currentImage = images?.[index];
            if (currentImage) {
                return currentImage;
            }
        }
        return "/no-product-image.png";
    }
    
    return (
        <Link
            className="group block overflow-hidden cursor-pointer"
            href={`/product/${product?.id}`}
        >
            <div className="relative h-[500px] sm:h-[450px]">
                <Image
                    src={getImage(0)}
                    alt={`Image of ${product?.name ? product?.name : ""}`}
                    className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
                    width={500}
                    height={600}
                />

                <Image
                    src={getImage(1)}
                    alt={`Image of ${product?.name ? product?.name : ""}`}
                    className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
                    width={500}
                    height={600}
                />
            </div>

            <div className="relative bg-white pt-3">
                <h3 className="text-lg text-gray-700 group-hover:underline group-hover:underline-offset-4">{product?.name}</h3>
                <p className="text-lg mt-1.5 font-bold tracking-wide text-primary"><PriceFormatting value={product?.items[0].price} /></p>
            </div>
        </Link>
    )
}

export default ProductCard