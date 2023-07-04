'use client'
import React, { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useTheme } from 'next-themes'

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                }
            }),
        [mode],
    );

    const { resolvedTheme } = useTheme();
    useEffect(() => {
        console.log("THEME!!!!!!!", resolvedTheme)
        if (resolvedTheme === 'dark') {
            setMode('dark');
        } else {
            setMode('light');
        }
    }, [resolvedTheme]);
        

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}