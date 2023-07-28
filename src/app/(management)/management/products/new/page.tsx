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

const fetchVariationsData = async () => {
    const res = await fetch(`http://localhost:3000/api/management/variation/list/`, {
        cache: 'no-store',
        headers: headers()
    });
    return res.json();
};

export default async function NewProductPage() {
    const categories = await fetchCategoriesData();
    const variations = await fetchVariationsData();
    

    return (<>
        <PageHeader title="New Product" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <ProductForm categories={categories} variations={variations}/>
        </MuiBox>
    </>)
}