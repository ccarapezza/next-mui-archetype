import HeaderCheckout from "@/components/store/checkout/HeaderCheckout"

export default function ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (<>
    <HeaderCheckout />
    <main>
      {children}
    </main>
  </>)
}
