'use client'
import PriceFormatting from "@/components/management/product/PriceFormatting";

export default function ProductHeader(props: { product: any }) {
  const { product } = props;

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-tertiary lg:text-3xl">{product.name}</h1>
        <p className="mt-1 text-sm text-gray-500">SKU: {product.sku}</p>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-bold text-primary"><PriceFormatting value={product.listPrice} /></p>
      </div>
      <div className="mt-4">
        <div className="max-w-none">
          <p className="text-tertiary">
            {product.description}
          </p>
        </div>
      </div>
    </>
  )
}
