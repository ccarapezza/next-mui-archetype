import MuiBox from "@/components/client/MuiBox";
import CheckoutDiscountsForm from "@/components/management/checkout-discounts/CheckoutDiscountsForm";
import PageHeader from "@/components/management/paperbase/PageHeader";

export default async function NewCheckoutDiscounts() {
    return (<>
        <PageHeader title="Nuevo Cupón" />
        <MuiBox className="px-4 pt-8 flex justify-center">
            <CheckoutDiscountsForm />
        </MuiBox>
    </>)
}