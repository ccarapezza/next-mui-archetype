import React from 'react'

export default function ProductPageHeader(props: { categoryTitle: string }) {

  return (
    <header className="text-center">
      <h2 className="font-tungsten text-primary text-6xl mb-4 text-center capitalize">
        {props.categoryTitle}
      </h2>

      <p className="max-w-md mx-auto mt-4 text-tertiary">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
        praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
        natus?
      </p>
    </header>
  )
}