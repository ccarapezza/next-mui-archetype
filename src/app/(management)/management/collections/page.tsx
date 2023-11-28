

import MuiDataGrid from "@/components/client/DataGrid";
import MuiBox from "@/components/client/MuiBox";
import EntityTableToolbar from "@/components/management/EntityTableToolbar";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { collectionService } from "@/services/CollectionService";
import { GridColDef } from "@mui/x-data-grid";

const fetchCollectionsData = async (page: number, size: number, search: string) => {
    return await collectionService.search(search, page, size);
};

export default async function CollectionsPage({ searchParams }: { searchParams: { page: number, size: number, search: string } }) {
    const getPaginationParams= () => {
        return {
            page: searchParams.page? searchParams.page : 1,
            size: searchParams.size? searchParams.size : 5
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
            headerName: 'Nombre',
            flex: 1
        }
    ];

    return (<>
        <PageHeader title="Colecciones" />
        <MuiBox className="p-10">
            <EntityTableToolbar newButtonLabel="Crear nueva colección" newEntityPath="/management/collections/new"/>
            <MuiDataGrid columns={columns} rows={data.rows} rowCount={data.totalItems} editPath="/management/collections/edit" deletePath="/api/management/collection/"/>
        </MuiBox>
    </>)
}