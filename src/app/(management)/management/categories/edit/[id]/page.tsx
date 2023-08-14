import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import RoleForm from "@/components/management/roles/RoleForm";
import { productCategoryService } from "@/services/ProductCategoryService";

const fetchCategoryData = async (id: number) => {
    return await productCategoryService.getById(id);
};

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const data = await fetchCategoryData(parseInt(params.id));
    return (<>
        <PageHeader title="Edit Role" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <RoleForm roleData={data?.toJSON()} />
        </MuiBox>
    </>)
}