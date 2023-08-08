

import MuiDataGrid from "@/components/client/DataGrid";
import MuiBox from "@/components/client/MuiBox";
import EntityTableToolbar from "@/components/management/EntityTableToolbar";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { GridColDef } from "@mui/x-data-grid";
import { headers } from "next/headers";

const fetchRolesData = async (page: number, size: number, search: string) => {
    const querySearch = search?`?search=${search}`:"";
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/role/list/${page}/${size}${querySearch}`, {
        cache: 'no-store',
        headers: headers()
    });
    return res.json();
};

export default async function RolesPage({ searchParams }: { searchParams: { page: number, size: number, search: string } }) {
    const getPaginationParams= () => {
        return {
            page: searchParams.page? searchParams.page : 1,
            size: searchParams.size? searchParams.size : 5
        }
    }
    const paginationParams = getPaginationParams();
    const data = await fetchRolesData(paginationParams.page, paginationParams.size, searchParams.search);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1
        },
        {
            field: 'name',
            headerName: 'Role name',
            flex: 1
        }
    ];

    return (<>
        <PageHeader title="Roles" />
        <MuiBox className="p-10">
            <EntityTableToolbar newButtonLabel="Create new Role" newEntityPath="/management/roles/new"/>
            <MuiDataGrid columns={columns} rows={data.rows} rowCount={data.totalItems} editPath="/management/roles/edit" deletePath="/api/management/role/"/>
        </MuiBox>
    </>)
}