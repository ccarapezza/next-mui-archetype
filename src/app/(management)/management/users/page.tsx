import MuiDataGrid from "@/components/client/DataGrid";
import MuiBox from "@/components/client/MuiBox";
import EntityTableToolbar from "@/components/management/EntityTableToolbar";
import PageHeader from "@/components/management/paperbase/PageHeader";
import {  userService } from "@/services/UserService";
import { GridColDef } from "@mui/x-data-grid";

const fetchUsersByUserType = async (page: number, size: number, search: string, userType: string) => {
    return await userService.search(search, userType, page, size);
};

export default async function UsersPage({ searchParams }: { searchParams: { page: number, size: number, search: string } }) {
    const getPaginationParams= () => {
        return {
            page: searchParams.page? searchParams.page : 1,
            size: searchParams.size? searchParams.size : 5
        }
    }
    const paginationParams = getPaginationParams();
    const data = await fetchUsersByUserType(paginationParams.page, paginationParams.size, searchParams.search, "admin");
    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 1,
            cellClassName: 'text-xs'
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
            <MuiDataGrid columns={columns} rows={data.rows} rowCount={data.totalItems} editPath="/management/users/edit" deletePath="/api/management/users/"/>
        </MuiBox>
    </>)
}