"use client"
import CardProductCheckout from '../CardProductCheckout';

export default function SummaryProducts(props: { cart: any[] }) {
  const { cart } = props;

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {
          cart.map((product, i) => {
            return (
              <CardProductCheckout key={i} product={product} />
            )
          })
        }
      </ul>
    </div>
  )
}