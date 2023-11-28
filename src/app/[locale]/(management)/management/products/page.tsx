import MuiBox from '@/components/client/MuiBox'
import EntityTableToolbar from '@/components/management/EntityTableToolbar'
import PageHeader from '@/components/management/paperbase/PageHeader'
import ProductDataGrid from './dataGrid';
import { productService } from '@/services/ProductService';

const fetchProductsData = async (page: number, size: number, search: string) => {
    return await productService.search(search, page, size);
};

export default async function ProductsPage({ searchParams }: { searchParams: { page: number, size: number, search: string } }) {
    const getPaginationParams= () => {
        return {
            page: searchParams.page? searchParams.page : 1,
            size: searchParams.size? searchParams.size : 5
        }
    }
    const paginationParams = getPaginationParams();
    const data = await fetchProductsData(paginationParams.page, paginationParams.size, searchParams.search);

    return (<>
        <PageHeader title="Products" />
        <MuiBox className="py-2 px-10">
            <EntityTableToolbar newButtonLabel="Crear nuevo producto" newEntityPath="/management/products/new"/>
            <ProductDataGrid rows={data.rows} rowCount={data.totalItems} editPath="/management/products/edit" deletePath="/api/management/product/"/>
        </MuiBox>
    </>)
}
