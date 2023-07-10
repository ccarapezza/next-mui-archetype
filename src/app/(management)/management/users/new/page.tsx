import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import UserForm from "@/components/management/users/UserForm";

export default async function NewUserPage({ params }: { params: { id: string } }) {
    return (<>
        <PageHeader title="New User" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <UserForm userData={{
                name: "",
                email: "",
                image: "",
            }} />
        </MuiBox>
    </>)
}