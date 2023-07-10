

import MuiDataGrid from "@/components/client/DataGrid";
import MuiBox from "@/components/client/MuiBox";
import EntityTableToolbar from "@/components/management/EntityTableToolbar";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { GridColDef } from "@mui/x-data-grid";

const fetchUserListData = async (page: number, size: number, search: string) => {
    const querySearch = search?`?search=${search}`:"";
    const res = await fetch(`http://localhost:3000/api/user/list/${page}/${size}${querySearch}`, { cache: 'no-store'});
    return res.json();
};

export default async function UsersPage({ searchParams }: { searchParams: { page: number, size: number, search: string } }) {
    const getPaginationParams= () => {
        return {
            page: searchParams.page? searchParams.page : 1,
            size: searchParams.size? searchParams.size : 5
        }
    }
    const paginationParams = getPaginationParams();
    const data = await fetchUserListData(paginationParams.page, paginationParams.size, searchParams.search);
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1
        },
        {
            field: 'name',
            headerName: 'First name',
            flex: 1
        },
        {
            field: 'email',
            headerName: 'Last name',
            flex: 1
        }
    ];

    return (<>
        <PageHeader title="Users" />
        <MuiBox className="p-10">
            <EntityTableToolbar newButtonLabel="Create new User" newEntityPath="/management/users/new"/>
            <MuiDataGrid columns={columns} rows={data.rows} rowCount={data.totalItems} editPath="/management/users/edit" deletePath="/api/users/"/>
        </MuiBox>
    </>)
}