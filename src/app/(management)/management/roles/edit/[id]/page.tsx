import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import RoleForm from "@/components/management/roles/RoleForm";

const fetchUserData = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/role/${id}`, {cache: 'no-store'} );
    return res.json();
};

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const data = await fetchUserData(params.id);
    return (<>
        <PageHeader title="Edit Role" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <RoleForm roleData={data} />
        </MuiBox>
    </>)
}