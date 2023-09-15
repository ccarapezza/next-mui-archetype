import MuiAlert from "@/components/client/MuiAlert";
import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import ProductForm from "@/components/management/product/ProductForm";
import { VariationDto } from "@/schemas/variation";
import { productCategoryService } from "@/services/ProductCategoryService";
import { productService } from "@/services/ProductService";
import { variationService } from "@/services/VariationService";

const fetchProductData = async (id: string) => {
    return await productService.getDtoById(id, true);
};

const fetchCategoriesData = async () => {
    return await productCategoryService.searchCategoryTree(null);
};

const fetchVariationsData = async () => {
    return await variationService.getAll({include: "variationOptions",order: [
        ['id', 'ASC']
    ]});
};

export default async function EditUserPage({ params }: { params: { id: string } }) {
    const data = await fetchProductData(params.id);
    const categories = await fetchCategoriesData();
    const variations = (await fetchVariationsData()).map(variation => {
        return variation.toJSON<VariationDto>();
    });
    return (<>
        <PageHeader title={`Editar producto #${params.id}`} />
        <MuiBox className="px-4 pt-8 flex justify-center">
            {data&&
                <ProductForm categories={categories} variations={variations} editProduct={data}/>
            }
        </MuiBox>
    </>)
}