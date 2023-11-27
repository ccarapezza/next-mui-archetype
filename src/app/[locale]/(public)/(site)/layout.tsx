import NotistackProviderWrapper from "@/components/providers/NotistackProvider";
import SessionProviderWrapper from "@/components/providers/SessionProvider";
import MiniCartProvider from "@/components/store/context/MiniCartContext";
import FooterServer from "@/components/store/footer/FooterServer";
import NavBarServer from "@/components/store/navbar/NavBarServer";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <NotistackProviderWrapper>
            <SessionProviderWrapper>
                <MiniCartProvider>
                    <NavBarServer />
                    <main>
                        {children}
                    </main>
                    <FooterServer />
                </MiniCartProvider>
            </SessionProviderWrapper>
        </NotistackProviderWrapper>
    );
}