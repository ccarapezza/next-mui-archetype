import ProductListMain from '@/components/store/plp/ProductListMain';
import { productCategoryService } from '@/services/ProductCategoryService';
import { productService } from '@/services/ProductService';

const fetchCategoryData = async () => {
    return productCategoryService.searchCategoryTree(null);
};

const fetchProductData = async () => {
    return productService.search(null);
};
 
export default async function SiteCategoryPage() {

  const categoryTree = await fetchCategoryData();
  const listProducts = await fetchProductData();

  // const products = [
  //   {
  //     name: "Random Name #1",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-1'
  //   },
  //   {
  //     name: "Random Name #2",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-2'
  //   },
  //   {
  //     name: "Random Name #3",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-3'
  //   },
  //   {
  //     name: "Random Name #4",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-4'
  //   },
  //   {
  //     name: "Random Name #5",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-5'
  //   },
  //   {
  //     name: "Random Name #6",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-6'
  //   },
  //   {
  //     name: "Random Name #7",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-7'
  //   },
  //   {
  //     name: "Random Name #8",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-8'
  //   },
  //   {
  //     name: "Random Name #9",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-9'
  //   },
  //   {
  //     name: "Random Name #10",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-10'
  //   },
  //   {
  //     name: "Random Name #11",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-11'
  //   },
  //   {
  //     name: "Random Name #12",
  //     listPrice: 100,
  //     specialPrice: 50,
  //     urlImageMain: 'https://dummyimage.com/500x600/322F30/EFE6D9.png&text=First',
  //     urlImageHover: 'https://dummyimage.com/500x600/322F30/FFF.png&text=Second',
  //     productNameUrl: 'product-name-12'
  //   }
  // ];

  return (
    <ProductListMain categoryTree={categoryTree} listProducts={listProducts.rows}/>
  )
}