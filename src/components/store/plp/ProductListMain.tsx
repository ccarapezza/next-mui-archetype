'use client';
import ProductFilters from '@/components/store/plp/ProductFilters';
import ProductGridList from '@/components/store/plp/ProductGridList';
import ProductPageHeader from '@/components/store/plp/ProductPageHeader';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';



export default function ProductListMain(props: { categoryTree: any, listProducts: any, varations: any }) {

  // console.log('Lista de productos', props.listProducts);
  
  // Rutas
  const pathname = usePathname();

  const segments = pathname.split('/');
  const categoryUrlName = segments[segments.length - 1];

  // Props
  const { categoryTree, listProducts, varations } = props;


  return (
    <section>
      <div className="max-w-screen-2xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <ProductPageHeader categoryTitle={categoryUrlName}/>
        <div className='flex flex-col mt-8 lg:flex-row'>
          <div className='w-full lg:w-1/5 px-2'>
            <ProductFilters categoryTree={categoryTree} categoryTitle={categoryUrlName} varationsDTO={varations}/>
          </div>
          <div className='w-full lg:w-4/5 px-2 mt-5 lg:mt-0'>
            {
              listProducts.length === 0 && (
                <div className='w-full h-full flex justify-center items-center'>
                  <h2 className='text-2xl text-center'>No se encontraron resultados para esta búsqueda!</h2>
                </div>
              )
            }
            <ProductGridList products={listProducts} />
          </div>
        </div>
      </div>
    </section>
  )
}