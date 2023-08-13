import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import UserForm from "@/components/management/users/UserForm";
import { UserService, userService } from "@/services/UserService";

const fetchUserData = async (id: number) => {
    return await userService.getById(id);
};

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const data = await fetchUserData(parseInt(params.id));
    return (<>
        <PageHeader title="Edit User" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <UserForm userData={data?.toJSON()} />
        </MuiBox>
    </>)
}