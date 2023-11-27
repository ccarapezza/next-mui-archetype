

import MuiDataGrid from "@/components/client/DataGrid";
import MuiBox from "@/components/client/MuiBox";
import EntityTableToolbar from "@/components/management/EntityTableToolbar";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { roleService } from "@/services/RoleService";
import { GridColDef } from "@mui/x-data-grid";

const fetchRolesData = async (page: number, size: number, search: string) => {
    return await roleService.search(search, page, size);
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