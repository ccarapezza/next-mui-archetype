import ProductFilters from '@/components/store/plp/ProductFilters';
import ProductGridList from '@/components/store/plp/ProductGridList';
import ProductPageHeader from '@/components/store/plp/ProductPageHeader';
// import { headers } from "next/headers";

const fetchCategoryData = async () => {
  const res = await fetch(`http://localhost:3000/api/store/category/list/`, {
    cache: 'no-store',
  });
  return res.json();
};

const fetchProductData = async () => {
  const res = await fetch(`http://localhost:3000/api/store/product/list/`, {
    cache: 'no-store',
  });
  return res.json();
};

export default async function () {

  const categoryTree = await fetchCategoryData();
  console.log('categoryTree', categoryTree);
  
  const listProducts = await fetchProductData();
  console.log('listProducts', listProducts.rows);
  

  const products = [
    {
      name: "Random Name #1",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-1'
    },
    {
      name: "Random Name #2",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-2'
    },
    {
      name: "Random Name #3",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-3'
    },
    {
      name: "Random Name #4",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-4'
    },
    {
      name: "Random Name #5",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-5'
    },
    {
      name: "Random Name #6",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-6'
    },
    {
      name: "Random Name #7",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-7'
    },
    {
      name: "Random Name #8",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-8'
    },
    {
      name: "Random Name #9",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-9'
    },
    {
      name: "Random Name #10",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-10'
    },
    {
      name: "Random Name #11",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-11'
    },
    {
      name: "Random Name #12",
      listPrice: 100,
      specialPrice: 50,
      urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
      productNameUrl: 'product-name-12'
    }
  ];

  return (
    <section>
      <div className="max-w-screen-2xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <ProductPageHeader />
        <div className='flex flex-col mt-8 lg:flex-row'>
          <div className='w-full lg:w-1/5 px-2'>
            <ProductFilters />
          </div>
          <div className='w-full lg:w-4/5 px-2 mt-5 lg:mt-0'>
            <ProductGridList products={listProducts.rows} />
          </div>
        </div>
      </div>
    </section>


  )
}