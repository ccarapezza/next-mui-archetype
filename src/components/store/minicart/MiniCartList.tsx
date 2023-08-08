'use client'
import MiniCartProductCard from "./MiniCartProductCard";

export default function MiniCartList(props: { products: any[] }) {
  const { products } = props;

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {
          products.map((product, i) => {
            return (
              <MiniCartProductCard key={i} product={product} />
            )
          })
        }
      </ul>
    </div>
  )
}