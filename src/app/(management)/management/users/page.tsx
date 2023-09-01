import MuiBox from "@/components/client/MuiBox";
import EntityTableToolbar from "@/components/management/EntityTableToolbar";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { userService } from "@/services/UserService";
import UserDataGrid from "./dataGrid";

const USER_ROLE = "user";

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
    const data = await fetchUsersByUserType(paginationParams.page, paginationParams.size, searchParams.search, USER_ROLE);

    return (<>
        <PageHeader title="Users" />
        <MuiBox className="p-10">
            <EntityTableToolbar newButtonLabel="Create new User" newEntityPath="/management/users/new"/>
            <UserDataGrid
                rows={data.rows}
                rowCount={data.totalItems}
                editPath="/management/users/edit"
                deletePath="/api/management/users/"
            />
        </MuiBox>
    </>)
}
export const dynamic = 'force-dynamic'