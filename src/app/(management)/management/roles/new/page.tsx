import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import RoleForm from "@/components/management/roles/RoleForm";

export default async function NewRolePage() {
    return (<>
        <PageHeader title="New Role" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <RoleForm roleData={{
                name: ""
            }} />
        </MuiBox>
    </>)
}