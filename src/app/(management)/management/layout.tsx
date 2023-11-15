import '@/app/globals.css'
import '../../../../styles/custom-fonts.css';
import * as React from 'react';
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import ThemeRegistry from '@/components/Theme/ThemeRegistry/ThemeRegistry';
import Paperbase from '@/components/management/paperbase/Paperbase';
import SessionProviderWrapper from '@/components/providers/SessionProvider';
config.autoAddCss = false;

export const metadata = {
    title: 'Next Store',
    description: 'Sitio Oficial de Next Store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className='dark:bg-gray-900'>
                <SessionProviderWrapper>
                    <ThemeRegistry>
                        <Paperbase>
                            {children}
                        </Paperbase>
                    </ThemeRegistry>
                </SessionProviderWrapper>
            </body>
        </html>
    );
}