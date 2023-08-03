import { useEffect, useState } from "react";
import CarouselProducts from "./CarouselProducts";

const fetchProductData = async () => {
  const res = await fetch(`http://localhost:3000/api/store/product/list/`, {
    cache: 'no-store',
  });
  return res.json();
};

export default async function () {

    const listProducts = await fetchProductData(); // TODO: Ver Loop infinito!
    const lista = listProducts.rows;

    return (  
        <CarouselProducts products={lista}/>
    )

}