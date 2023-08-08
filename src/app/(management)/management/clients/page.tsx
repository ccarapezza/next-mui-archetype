import MuiDataGrid from "@/components/client/DataGrid";
import MuiBox from "@/components/client/MuiBox";
import EntityTableToolbar from "@/components/management/EntityTableToolbar";
import PageHeader from "@/components/management/paperbase/PageHeader";
import createQueryString from "@/utils/RouterUtil";
import { GridColDef } from "@mui/x-data-grid";
import { headers } from "next/headers";

const fetchUsersByUserType = async (page: number, size: number, search: string, userType: string) => {
    const paramsArray: Array<{ name: string, value: string }> = [];
    if (search) {
        paramsArray.push({
            name: 'search',
            value: search
        })
    }

    if(userType){
        paramsArray.push({
            name: 'userType',
            value: userType
        })
    }

    const queryParams = createQueryString(paramsArray, "");
    console.log("queryParams", queryParams)
    console.log("URL!!", `${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/user/list/${page}/${size}${queryParams?'?'+queryParams:''}`)
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/user/list/${page}/${size}${queryParams?'?'+queryParams:''}`, {
        cache: 'no-store',
        headers: headers()
    });
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
    const data = await fetchUsersByUserType(paginationParams.page, paginationParams.size, searchParams.search, "client");
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
        <PageHeader title="Clients" />
        <MuiBox className="p-10">
            <EntityTableToolbar/>
            <MuiDataGrid columns={columns} rows={data.rows} rowCount={data.totalItems} editPath="/management/users/edit" deletePath="/api/management/users/"/>
        </MuiBox>
    </>)
}