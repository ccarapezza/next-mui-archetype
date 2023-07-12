import ProductFilters from '@/components/store/productlistingpage/ProductFilters';
import ProductGridList from '@/components/store/productlistingpage/ProductGridList';
import ProductPageHeader from '@/components/store/productlistingpage/ProductPageHeader';

export default function () {

  const products = [
    {
      name: "Random Name #1",
      price: 100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-1'
    },
    {
      name: "Random Name #2",
      price: 100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-2'
    },
    {
      name: "Random Name #3",
      price: 100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-3'
    },
    {
      name: "Random Name #4",
      price:100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-4'
    },
    {
      name: "Random Name #5",
      price:100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-5'
    },
    {
      name: "Random Name #6",
      price:100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-6'
    },
    {
      name: "Random Name #7",
      price:100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-7'
    },
    {
      name: "Random Name #8",
      price:100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-8'
    },
    {
      name: "Random Name #9",
      price:100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-9'
    },
    {
      name: "Random Name #10",
      price:100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-10'
    },
    {
      name: "Random Name #11",
      price:100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-11'
    },
    {
      name: "Random Name #12",
      price:100,
      urlImageMain: 'https://dummyimage.com/500x600/111827/4F46E5.png&text=First',
      urlImageHover: 'https://dummyimage.com/500x600/111827/FFF.png&text=Second',
      productNameUrl: 'product-name-12'
    }
  ];

  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <ProductPageHeader />
        <ProductFilters />
        <ProductGridList products={products} />
      </div>
    </section>
  )
}