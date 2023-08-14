import MuiAlert from "@/components/client/MuiAlert";
import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { userService } from "@/services/UserService";

const fetchRoleData = async (id: string) => {
    return await userService.getById(id);
};

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const data = await fetchRoleData(params.id);
    return (<>
        <PageHeader title="Edit Role" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <MuiAlert severity="info" className="w-full max-w-md">
                <div className="font-medium">Not implemented yet</div>
            </MuiAlert>
        </MuiBox>
    </>)
}