import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import UserForm from "@/components/management/users/UserForm";
import { headers } from "next/headers";

const fetchUserData = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/management/user/${id}`, {
        cache: 'no-store',
        headers: headers()
    });
    return res.json();
};

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const data = await fetchUserData(params.id);
    return (<>
        <PageHeader title="Edit User" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <UserForm userData={data} />
        </MuiBox>
    </>)
}