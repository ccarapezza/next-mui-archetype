

import DataGridDemo from "@/components/client/DataGrid";
import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { GridColDef } from "@mui/x-data-grid";

const fetchUserData = async (page: number, size: number) => {
    const res = await fetch(`http://localhost:3000/api/user/list/${page}/${size}`);
    return res.json();
};

export default async function UsersPage({ searchParams }: { searchParams: { page: number, size: number } }) {
    const getPaginationParams= () => {
        return {
            page: searchParams.page? searchParams.page : 1,
            size: searchParams.size? searchParams.size : 5
        }
    }
    const paginationParams = getPaginationParams();
    const data = await fetchUserData(paginationParams.page, paginationParams.size);
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
            <DataGridDemo columns={columns} rows={data.rows} rowCount={data.totalItems} />
        </MuiBox>
    </>)
}