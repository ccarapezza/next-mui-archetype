'use client'
import { ReactNode, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Copyright from './Copyright';
import Navigator from './Navigator';
import Header from './Header';
import { DialogContextProvider } from '../context/DialogContext';
import { SnackbarProvider } from 'notistack';

const drawerWidth = 256;

export default function Paperbase({children}: {children: ReactNode}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  let theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <SnackbarProvider>
      <DialogContextProvider>
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
          <CssBaseline />
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            {isSmUp ? null : (
              <Navigator
                PaperProps={{ style: { width: drawerWidth }, className: 'bg-slate-200 dark:bg-slate-800' }}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
              />
            )}
            <Navigator
              PaperProps={{ style: { width: drawerWidth }, className: 'bg-slate-200 dark:bg-slate-900' }}
              sx={{ display: { sm: 'block', xs: 'none' } }}
            />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Header onDrawerToggle={handleDrawerToggle}/>
            <Box component="main" className='flex-1'>
              {children}
            </Box>
            <Box component="footer" sx={{ p: 2 }}>
              <Copyright />
            </Box>
          </Box>
        </Box>
      </DialogContextProvider>
    </SnackbarProvider>
  );
}
