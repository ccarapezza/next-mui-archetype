import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import RoleForm from "@/components/management/roles/RoleForm";
import { headers } from "next/headers";

const fetchRoleData = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/role/${id}`, {
        cache: 'no-store',
        headers: headers()
    } );
    return res.json();
};

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const data = await fetchRoleData(params.id);
    return (<>
        <PageHeader title="Edit Role" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <RoleForm roleData={data} />
        </MuiBox>
    </>)
}