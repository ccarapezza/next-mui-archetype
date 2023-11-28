import '@/app/globals.css'
import '@/styles/custom-fonts.css';
import * as React from 'react';
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import { notFound } from 'next/navigation';
config.autoAddCss = false;

// Can be imported from a shared config
import { getMessages, locales } from "@/navigation";
import { NextIntlClientProvider } from 'next-intl';

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
            <body className='dark:bg-gray-900'>           
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}