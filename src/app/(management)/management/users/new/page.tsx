import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import UserForm from "@/components/management/users/UserForm";
import { RoleDto } from "@/schemas/role";
import { roleService } from "@/services/RoleService";

export default async function NewUserPage({ params }: { params: { id: string } }) {
    const roles: RoleDto[] = (await roleService.getAll()).map(role => role.toJSON<RoleDto>());
    const initialData = {
        name: "",
        email: "",
        image: "",
    }

    const availableRoles = roles.filter(role => role.name.toLocaleLowerCase() !== "user" && role.name.toLocaleLowerCase() !== "client");
    const preSelectedRoles = roles.filter(role => role.name.toLocaleLowerCase() === "user");

    return (<>
        <PageHeader title="Nuevo Usuario" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <UserForm roles={availableRoles} preSelectedRoles={preSelectedRoles} userData={initialData} />
        </MuiBox>
    </>)
}