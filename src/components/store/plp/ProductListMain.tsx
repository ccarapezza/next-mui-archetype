'use client';
import ProductFilters from '@/components/store/plp/ProductFilters';
import ProductGridList from '@/components/store/plp/ProductGridList';
import ProductPageHeader from '@/components/store/plp/ProductPageHeader';
import { ProductCategoryDto } from '@/schemas/category';
import { useParams } from 'next/navigation';

const findKeyOnTree = (key: string, categories: ProductCategoryDto[]): ProductCategoryDto | null => {
    let result: ProductCategoryDto | null = null;
    categories?.forEach((category) => {
        if (category.key === key) {
            result = category;
        } else if (category.childrens && category.childrens.length > 0) {
            const findedOnChilds = findKeyOnTree(key, category.childrens);
            if (findedOnChilds) {
                result = findedOnChilds;
            }
        }
    });
    return result;
}

export default function ProductListMain(props: { categoryTree: any, listProducts: any, varations: any }) {
  const params = useParams()
  const rootCategory = findKeyOnTree(params.category?params.category?.[0]:"", props.categoryTree); 
  const { categoryTree, listProducts, varations } = props;

  return (
    <section>
      <div className="max-w-screen-2xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <ProductPageHeader categoryTitle={rootCategory?.name?rootCategory?.name:""} />
        <div className='flex flex-col mt-8 lg:flex-row'>
          <div className='w-full lg:w-1/5 px-2'>
            <ProductFilters categoryTree={categoryTree} categoryTitle={rootCategory?.name?rootCategory?.name:""} varationsDTO={varations}/>
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