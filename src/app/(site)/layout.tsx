import Footer from "@/components/main-ui/Footer";
import Navbar from "@/components/main-ui/Navbar";
import MiniCartProvider from "@/components/store/context/MiniCartContext";

export default function ({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode
}) {
  return (<>
    <MiniCartProvider>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </MiniCartProvider>
  </>)
}
