import ProductCard from '@/components/main-ui/ProductCard';
import React from 'react'

export default function ProductGridList(props: { products: any[] }) {

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {props.products.map((product, i) => (
        <ProductCard key={i} product={product} />
      ))}
    </div>
  )
}