'use client'
import MiniCartProductCard from "./MiniCartProductCard";
interface ISubscriptionForm {
  email: string
}
export default function (props: { cart: any[] }) {
  const { cart } = props;
  console.log('Cart desde Mini Cart List: ', cart);

  return (
    <div className="mt-4 space-y-6">
      <ul className="space-y-4">
        {
          cart.map((product, i) => {
            return (
              <MiniCartProductCard key={i} product={product} />
            )
          })
        }
      </ul>
    </div>
  )
}