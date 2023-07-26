import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import ProductForm from "@/components/management/product/ProductForm";
import { headers } from "next/headers";

const fetchCategoriesData = async () => {
    const res = await fetch(`http://localhost:3000/api/management/category/list/`, {
        cache: 'no-store',
        headers: headers()
    });
    return res.json();
};
export default async function NewProductPage() {
    const categories = await fetchCategoriesData();

    return (<>
        <PageHeader title="New Product" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <ProductForm categories={categories}/>
        </MuiBox>
    </>)
}