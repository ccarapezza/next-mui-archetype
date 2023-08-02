import '@/app/globals.css'
import '../../../styles/custom-fonts.css';
import * as React from 'react';
import SessionProviderWrapper from '@/components/providers/SessionProvider';
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import MiniCartProvider from '@/components/store/context/MiniCartContext';
import Navbar from '@/components/main-ui/Navbar';
import Footer from '@/components/main-ui/Footer';
config.autoAddCss = false;

export const metadata = {
    title: 'Cultivo Mis Derechos',
    description: 'Sitio Oficial de Cultivo Mis Derechos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen pt-[97px] md:pb-[400px] pb-[1100px]">
        <SessionProviderWrapper>
          <MiniCartProvider>
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </MiniCartProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}