

import MuiBox from "@/components/client/MuiBox";
import CategoryTree from "@/components/management/category/CategoryTree";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { productCategoryService } from "@/services/ProductCategoryService";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Chip, Divider, Typography } from "@mui/material";

const fetchCategoriesData = async () => {
    return await productCategoryService.searchCategoryTree(null);
};

export default async function CategoriesPage() {
    const categories = await fetchCategoriesData();
    
    return (<>
        <PageHeader title="Categories" />
        <Divider className='mt-4'>
            <Chip label={
                <Typography className='text-sm uppercase'><FontAwesomeIcon icon={faTree} className='mr-2'/>Arbol de categorías</Typography>
            } variant="outlined" />
        </Divider>
        <MuiBox className="flex justify-center">
            <CategoryTree categories={categories}/>
        </MuiBox>
    </>)
}
export const dynamic = 'force-dynamic'