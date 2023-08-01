import '@/app/globals.css'
import '../../../../styles/custom-fonts.css';
import SessionProviderWrapper from "@/components/providers/SessionProvider";
import FooterCheckout from '@/components/store/checkout/FooterCheckout';
import HeaderCheckout from "@/components/store/checkout/HeaderCheckout"
import MiniCartProvider from "@/components/store/context/MiniCartContext";
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;


export const metadata = {
  title: 'Next App with MUI5',
  description: 'next app with mui5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='relative min-h-screen pb-[65px]'>
        <SessionProviderWrapper>
          <MiniCartProvider>
            <HeaderCheckout />
            <main>
              {children}
            </main>
            <FooterCheckout />
          </MiniCartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
