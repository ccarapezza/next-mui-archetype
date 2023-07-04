import Footer from "@/components/main-ui/Footer";
import Navbar from "@/components/main-ui/Navbar";

export default function ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (<>
    <Navbar />
    <main>
      {children}
    </main>
    <Footer />
  </>)
}
