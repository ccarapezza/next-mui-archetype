import ThemeRegistry from "@/components/Theme/ThemeRegistry/ThemeRegistry";
import Paperbase from "@/components/management/paperbase/Paperbase";

export default function ({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        <ThemeRegistry>
            <Paperbase>
                {children}
            </Paperbase>
        </ThemeRegistry>
    )
}