import React from 'react'
export default function ProductPageHeader(props: { categoryTitle: string | null }) {

    const { categoryTitle } = props;

    return (
        <header className="text-center">
            <h2 className="font-tungsten text-primary text-6xl mb-4 text-center capitalize font-normal">
                {categoryTitle && categoryTitle.length ? categoryTitle : "Tienda"}
            </h2>

            <p className="max-w-md mx-auto mt-4 text-tertiary">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque
                praesentium cumque iure dicta incidunt est ipsam, officia dolor fugit
                natus?
            </p>
        </header>
    )
}