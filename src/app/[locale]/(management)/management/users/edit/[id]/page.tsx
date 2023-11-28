import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import UserForm from "@/components/management/users/UserForm";
import { RoleDto } from "@/schemas/role";
import { roleService } from "@/services/RoleService";
import { UserService, userService } from "@/services/UserService";

const fetchUserData = async (id: string) => {
    const data = await userService.getByIdWithInclude(id, ['roles']);
    console.log("data", data);
    return data;
};

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const data = (await fetchUserData(params.id))?.toJSON();

    const roles: RoleDto[] = (await roleService.getAll()).map(role => role.toJSON<RoleDto>());

    const availableRoles = roles.filter(role => role.name.toLocaleLowerCase() !== "user" && role.name.toLocaleLowerCase() !== "client");
    const preSelectedRoles = data?.roles.filter((role: { name: string; }) => role.name.toLocaleLowerCase() === "user");

    return (<>
        <PageHeader title="Edit User" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <UserForm userData={data} roles={availableRoles} preSelectedRoles={preSelectedRoles} />
        </MuiBox>
    </>)
}