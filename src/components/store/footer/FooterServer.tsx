import { ProductCategoryService } from "@/services/ProductCategoryService";
import Footer from "./Footer";
import { Suspense } from "react";

export default async function FooterServer() {
    const categoryTree = await ProductCategoryService.searchCategoryTree(null);
    
    return (<Suspense fallback={<div>Loading...</div>}>
        <Footer categoryTree={categoryTree} />
    </Suspense>)
}