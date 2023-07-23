import '@/app/globals.css'
import SessionProviderWrapper from "@/components/providers/SessionProvider";
import HeaderCheckout from "@/components/store/checkout/HeaderCheckout"
import MiniCartProvider from "@/components/store/context/MiniCartContext";


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='relative min-h-screen pt-[97px] md:pb-[400px] pb-[1100px]'>
        <SessionProviderWrapper>
          <MiniCartProvider>
            <HeaderCheckout />
            <main>
              {children}
            </main>
          </MiniCartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
