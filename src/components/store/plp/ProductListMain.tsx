'use client';
import ProductFilters from '@/components/store/plp/ProductFilters';
import ProductGridList from '@/components/store/plp/ProductGridList';
import ProductPageHeader from '@/components/store/plp/ProductPageHeader';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';



export default function ProductListMain(props: { categoryTree: any, listProducts: any, filters: any }) {
  // Rutas
  const pathname = usePathname();

  const segments = pathname.split('/');
  const categoryUrlName = segments[segments.length - 1];

  // Props
  const { categoryTree, listProducts, filters } = props;

  // console.log('props.categoryTree', categoryTree);

  // categoryTree.map((category: any) => {
  //   console.log('category', category.name);
  // })

  return (
    <section>
      <div className="max-w-screen-2xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <ProductPageHeader categoryTitle={categoryUrlName}/>
        <div className='flex flex-col mt-8 lg:flex-row'>
          <div className='w-full lg:w-1/5 px-2'>
            <ProductFilters categoryTree={categoryTree} categoryTitle={categoryUrlName} filtersDTO={filters}/>
          </div>
          <div className='w-full lg:w-4/5 px-2 mt-5 lg:mt-0'>
            <ProductGridList products={listProducts} />
          </div>
        </div>
      </div>
    </section>
  )
}