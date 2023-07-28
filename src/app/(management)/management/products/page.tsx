import MuiDataGrid from '@/components/client/DataGrid';
import MuiBox from '@/components/client/MuiBox'
import EntityTableToolbar from '@/components/management/EntityTableToolbar'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { GridColDef } from '@mui/x-data-grid'
import { headers } from "next/headers";
import ProductDataGrid from './dataGrid';

const fetchProductsData = async (page: number, size: number, search: string) => {
    const querySearch = search?`?search=${search}`:"";
    const res = await fetch(`http://localhost:3000/api/management/product/list/${page}/${size}${querySearch}`, {
        cache: 'no-store',
        headers: headers()
    });
    return res.json();
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
            <EntityTableToolbar newButtonLabel="Create new Product" newEntityPath="/management/products/new"/>
            <ProductDataGrid rows={data.rows} rowCount={data.totalItems} editPath="/management/products/edit" deletePath="/api/management/product/"/>
        </MuiBox>
    </>)
}
