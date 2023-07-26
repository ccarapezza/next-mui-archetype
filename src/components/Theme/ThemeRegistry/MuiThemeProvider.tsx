'use client'
import React from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function MuiThemeProvider({ children }: { children: React.ReactNode }) {
    /*
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
        if (resolvedTheme === 'dark') {
            setMode('dark');
        } else {
            setMode('light');
        }
    }, [resolvedTheme]);
        
*/
    return (
        <ThemeProvider theme={createTheme({
            palette: {
                mode: "light"
            }
        })}>
            {children}
        </ThemeProvider>
    );
}