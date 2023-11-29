import '@/app/globals.css'
import '@/styles/custom-fonts.css';
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { notFound } from 'next/navigation';
config.autoAddCss = false;

// Can be imported from a shared config
import { getMessages, locales } from "@/i18n";
import CookieBanner from '@/components/main-ui/CookieBanner';
import GoogleAnalytics from '@/components/main-ui/GoogleAnalytics';
import NextIntlClientCustomerProvider from '@/components/auth/providers/NextIntlClientCustomerProvider';

export const metadata = {
    title: 'Next Store',
    description: 'Sitio Oficial de Next Store',
};

export default async function RootLayout({ children, params: {locale} }: { children: React.ReactNode, params: {locale: string} }) {
    let messages;
    try {
        messages = await getMessages(locale);
    } catch (error) {
        notFound();
    }
    if (!locales.includes(locale as any)) notFound();
    return (
        <html lang={locale}>
            <GoogleAnalytics GA_MEASUREMENT_ID={`${process.env.GA_MEASUREMENT_ID}`}/>
            <body className="relative min-h-screen">
                <NextIntlClientCustomerProvider locale={locale} messages={messages}>
                    {children}
                    <CookieBanner/>
                </NextIntlClientCustomerProvider>
            </body>
        </html>
    );
}