import MuiBox from "@/components/client/MuiBox";
import PageHeader from "@/components/management/paperbase/PageHeader";
import ProductForm from "@/components/management/product/ProductForm";

export default async function NewProductPage() {
    return (<>
        <PageHeader title="New Product" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <ProductForm />
        </MuiBox>
    </>)
}