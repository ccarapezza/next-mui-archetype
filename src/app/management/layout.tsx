import Paperbase from "@/components/management/paperbase/Paperbase";

export default function MamagementLayout({
    children, // will be a page or nested layout
}: {
    children: React.ReactNode
}) {
    return (
        
            <Paperbase>
                {children}
            </Paperbase>
        
    )
}