"use client"
export default function FooterCheckout(props: { brandName: string }) {

    const { brandName } = props

    const date = new Date();
    const currentYear = date.getFullYear();

    return (
        <footer className="flex justify-center bg-white w-full mt-8 absolute bottom-0">
            <div className="text-center w-full p-4 max-w-screen-xl border-t">
                <p className="text-center">Todos los derechos reservados {brandName}© - {currentYear}</p>
            </div>
        </footer>
    )
}