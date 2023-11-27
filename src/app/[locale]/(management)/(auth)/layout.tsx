import SessionProviderWrapper from "@/components/providers/SessionProvider";
import FooterCheckout from "@/components/store/checkout/FooterCheckout";
import HeaderCheckout from "@/components/store/checkout/HeaderCheckout";

export default function RootLayout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {
    return (
        <SessionProviderWrapper>
            <HeaderCheckout ctaButton={'Volver al Inicio'} bgColor={'bg-slate-200'} />
                {children}
            <FooterCheckout brandName={"NEXT STORE"} />
        </SessionProviderWrapper>
    )
}