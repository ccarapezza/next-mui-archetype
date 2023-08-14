

import MuiBox from "@/components/client/MuiBox";
import CategoryTree from "@/components/management/category/CategoryTree";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { productCategoryService } from "@/services/ProductCategoryService";

const fetchCategoriesData = async () => {
    return await productCategoryService.searchCategoryTree(null);
};

export default async function CategoriesPage() {
    const categories = await fetchCategoriesData();
    
    return (<>
        <PageHeader title="Categories" />
        <MuiBox className="p-10">
            <CategoryTree categories={categories}/>
        </MuiBox>
    </>)
}