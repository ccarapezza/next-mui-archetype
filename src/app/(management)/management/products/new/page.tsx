import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import ProductForm from "@/components/management/product/ProductForm";
import { VariationDto } from "@/schemas/variation";
import { productCategoryService } from "@/services/ProductCategoryService";
import { variationService } from "@/services/VariationService";

const fetchCategoriesData = async () => {
    return await productCategoryService.searchCategoryTree(null);
};

const fetchVariationsData = async () => {
    return await variationService.getAll({include: "variationOptions",order: [
        ['id', 'ASC']
    ]});
};

export default async function NewProductPage() {
    const categories = await fetchCategoriesData();
    const variations = (await fetchVariationsData()).map(variation => {
        return variation.toJSON<VariationDto>();
    });
    
    return (<>
        <PageHeader title="Nuevo producto" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <ProductForm categories={categories} variations={variations}/>
        </MuiBox>
    </>)
}

export const dynamic = 'force-dynamic'