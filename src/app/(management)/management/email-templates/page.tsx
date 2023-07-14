import MuiBox from '@/components/client/MuiBox'
import PageHeader from '@/components/management/paperbase/PageHeader'
import { headers } from "next/headers";
import { GridColDef } from '@mui/x-data-grid';
import MuiDataGrid from '@/components/client/DataGrid';
import EntityTableToolbar from '@/components/management/EntityTableToolbar';

const fetchEmailTemplatesData = async (page: number, size: number, search: string) => {
    const querySearch = search?`?search=${search}`:"";
    const res = await fetch(`http://localhost:3000/api/management/email-template/list/${page}/${size}${querySearch}`, {
        cache: 'no-store',
        headers: headers()
    });
    return res.json();
};

export default async function({ searchParams }: { searchParams: { page: number, size: number, search: string } }) {
    const getPaginationParams= () => {
        return {
            page: searchParams.page? searchParams.page : 1,
            size: searchParams.size? searchParams.size : 5
        }
    }
    const paginationParams = getPaginationParams();
    const data = await fetchEmailTemplatesData(paginationParams.page, paginationParams.size, searchParams.search);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Template Name',
            flex: 1
        }
    ];

    return (<>
        <PageHeader title="Templates" />
        <MuiBox className="py-2 px-4">
            <EntityTableToolbar newButtonLabel="Create new Template" newEntityPath="/management/email-templates/new"/>
            <MuiDataGrid columns={columns} rows={data.rows} rowCount={data.totalItems} editPath="/management/email-templates/edit" deletePath="/api/management/email-template/"/>
        </MuiBox>
    </>)
}
