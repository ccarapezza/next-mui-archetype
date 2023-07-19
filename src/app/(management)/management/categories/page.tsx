

import MuiBox from "@/components/client/MuiBox";
import CategoryTree from "@/components/management/category/CategoryTree";
import PageHeader from "@/components/management/paperbase/PageHeader";
import { headers } from "next/headers";

const fetchCategoriesData = async () => {
    const res = await fetch(`http://localhost:3000/api/management/category/list/`, {
        cache: 'no-store',
        headers: headers()
    });
    return res.json();
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