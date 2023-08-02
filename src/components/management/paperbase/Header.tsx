import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faBell, faComment } from '@fortawesome/free-solid-svg-icons'
import AccountMenu from './AccountMenu';

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;

  return (
    <>
      <AppBar position="sticky" elevation={0} className='border-b border-gray-300 bg-slate-200 dark:bg-slate-800 dark:border-zinc-700 drop-shadow-lg'>
        <Toolbar className='min-h-min h-12'>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <FontAwesomeIcon icon={faBars} />
              </IconButton>
            </Grid>
            <Grid item xs />
            {/*
            <Grid item>
              <ThemeSwitch/>
            </Grid>
            */}
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton size='small'>
                  <FontAwesomeIcon fixedWidth icon={faBell} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Messages • No messages">
                <IconButton size='small'>
                  <FontAwesomeIcon fixedWidth icon={faComment} />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <AccountMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
