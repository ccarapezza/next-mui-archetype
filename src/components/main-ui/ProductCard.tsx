'use client'
import { useRouter } from 'next/navigation';
import { Product } from "@/schemas/product";
import Image from 'next/image';
import PriceFormatting from '../management/product/PriceFormatting';

const ProductCard = (props: { product: Product }) => {

  const router = useRouter();
  return (
    <div
      className="group block overflow-hidden cursor-pointer"
      onClick={() => {
        router.push(`/product/remera-1`)
      }}
    >
      <div className="relative h-[500px] sm:h-[450px]">
        <Image
          src={props.product.items[0].image}
          alt={`Image of ${props.product.name}`}
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
          width={500}
          height={600}
        />

        <Image
          src={props.product.items[0].image}
          alt={`Image of ${props.product.name}`}
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
          width={500}
          height={600}
        />
      </div>

      <div className="relative bg-white pt-3">
        <h3 className="text-lg text-gray-700 group-hover:underline group-hover:underline-offset-4">{props.product.name}</h3>
        <p className="text-lg mt-1.5 font-bold tracking-wide text-primary"><PriceFormatting value={props.product.items[0].price}/></p>
      </div>
    </div>
  )
}

export default ProductCard