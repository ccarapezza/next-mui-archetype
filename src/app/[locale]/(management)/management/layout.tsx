import ThemeRegistry from "@/components/Theme/ThemeRegistry/ThemeRegistry";
import Paperbase from "@/components/management/paperbase/Paperbase";
import SessionProviderWrapper from "@/components/providers/SessionProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionProviderWrapper>
            <ThemeRegistry>
                <Paperbase>
                    {children}
                </Paperbase>
            </ThemeRegistry>
        </SessionProviderWrapper>
    );
}