
import MuiDataGrid from "@/components/client/DataGrid";
import MuiBox from "@/components/client/MuiBox";
import EntityTableToolbar from "@/components/management/EntityTableToolbar";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { checkoutDiscountsService } from "@/services/CheckoutDiscountsService";
import { GridColDef } from "@mui/x-data-grid";

const fetchCollectionsData = async (page: number, size: number, search: string) => {
    return await checkoutDiscountsService.search(search, page, size);
};

export default async function CheckoutDiscounts({ searchParams }: { searchParams: { page: number, size: number, search: string } }) {
    const getPaginationParams= () => {
        return {
            page: searchParams.page? searchParams.page : 1,
            size: searchParams.size? searchParams.size : 10
        }
    }
    const paginationParams = getPaginationParams();
    const data = await fetchCollectionsData(paginationParams.page, paginationParams.size, searchParams.search);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Nombre del cupón',
            flex: 1
        },
        {
            field: 'coupon',
            headerName: 'Cupón',
            flex: 1
        }
    ];

    return (<>
        <PageHeader title="Cupones de descuento" />
        <MuiBox className="p-10">
            <EntityTableToolbar newButtonLabel="Crear nuevo cupón" newEntityPath="/management/checkout-discounts/new"/>
            <MuiDataGrid columns={columns} rows={data.rows} rowCount={data.totalItems} switcherPath="/api/management/checkout-discounts/" deletePath="/api/management/checkout-discounts/"/>
        </MuiBox>
    </>)
}