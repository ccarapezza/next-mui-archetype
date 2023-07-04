import './globals.css'
import * as React from 'react';
import ThemeRegistry from '@/components/Theme/ThemeRegistry/ThemeRegistry';
import SessionProviderWrapper from './providers/sessionProvider';
// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import '@fortawesome/fontawesome-svg-core/styles.css';
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from '@fortawesome/fontawesome-svg-core';
import MainPublicHeader from '@/components/main-ui/MainPublicHeader';
config.autoAddCss = false;

export const metadata = {
  title: 'Next App with MUI5',
  description: 'next app with mui5',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='dark:bg-gray-900'>
        <ThemeRegistry>
          <SessionProviderWrapper>
            <MainPublicHeader/>
            {children}
          </SessionProviderWrapper>
        </ThemeRegistry>
      </body>
    </html>
  );
}
