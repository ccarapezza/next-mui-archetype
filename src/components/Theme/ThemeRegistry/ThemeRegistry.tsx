'use client';

import * as React from 'react';
import { ThemeProvider } from 'next-themes';
import CssBaseline from '@mui/material/CssBaseline';
import { NextAppDirEmotionCacheProvider } from '@/components/Theme/ThemeRegistry/EmotionCache';
import MuiThemeProvider from './MuiThemeProvider';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
      <ThemeProvider>
        <MuiThemeProvider>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
