import Image from 'next/image';

type Product = {
  name: string;
  price: string;
  urlImageMain: string;
  urlImageHover: string;
  bannerCta: string;
};

const ProductCard = (props: { product: Product }) => {
  return (
    <a href="#" className="group block overflow-hidden md:w-1/4">
      <div className="relative h-[500px] sm:h-[450px]">
        <Image
          src={props.product.urlImageMain}
          alt={`Image of ${props.product.name}`}
          className="absolute inset-0 h-full w-full object-cover opacity-100 group-hover:opacity-0"
          width={500}
          height={600}
        />

        <Image
          src={props.product.urlImageHover}
          alt={`Image of ${props.product.name}`}
          className="absolute inset-0 h-full w-full object-cover opacity-0 group-hover:opacity-100"
          width={500}
          height={600}
        />
      </div>

      <div className="relative bg-white pt-3">
        <h3 className="text-sm text-gray-700 group-hover:underline group-hover:underline-offset-4">{props.product.name}</h3>
        <p className="mt-1.5 tracking-wide text-gray-900">{props.product.price}</p>
      </div>
    </a>
  )
}

export default ProductCard