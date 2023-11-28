import SessionProviderWrapper from "@/components/providers/SessionProvider";
import FooterCheckout from "@/components/store/checkout/FooterCheckout";
import HeaderCheckout from "@/components/store/checkout/HeaderCheckout";
import MiniCartProvider from "@/components/store/context/MiniCartContext";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="pb-[65px]">
            <SessionProviderWrapper>
                <MiniCartProvider>
                    <HeaderCheckout ctaButton={"Seguir Comprando"} bgColor={'bg-white'} />
                    <main>
                        {children}
                    </main>
                    <FooterCheckout brandName={"NEXT STORE"} />
                </MiniCartProvider>
            </SessionProviderWrapper>
        </div>
    );
}