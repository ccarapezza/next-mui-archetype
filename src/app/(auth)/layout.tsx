import '@/app/globals.css'
import '../../../styles/custom-fonts.css';
import SessionProviderWrapper from "@/components/providers/SessionProvider"
import FooterCheckout from '@/components/store/checkout/FooterCheckout';
import HeaderCheckout from '@/components/store/checkout/HeaderCheckout';

export const metadata = {
    title: 'Cultivo Mis Derechos',
    description: 'Sitio Oficial de Cultivo Mis Derechos',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative min-h-screen pb-[65px]'>
        <SessionProviderWrapper>
          <HeaderCheckout ctaButton={'Volver al Inicio'}/>
          {children}
          <FooterCheckout brandName={"CULTIVO MIS DERECHOS"}/>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
