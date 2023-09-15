'use client'
import { AppBar, Toolbar, Grid, Typography, Tooltip, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition, faCircleQuestion } from '@fortawesome/free-solid-svg-icons'

export default function PageHeader({title, icon}: {title: string, icon?: IconDefinition}) {
    return (
        <AppBar
            component="div"
            color="primary"
            position="static"
            elevation={0}
            sx={{ zIndex: 0 }}
            className='text-gray-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-900 dark:border-zinc-700'
        >
            <Toolbar>
                <Grid container alignItems="center" spacing={1}>
                    <Grid item xs>
                        <Typography color="inherit" variant="h5" component="h1">
                            {icon&&<FontAwesomeIcon icon={icon} className='mr-2'/>}{title}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Help">
                            <IconButton color="inherit">
                                <FontAwesomeIcon icon={faCircleQuestion} />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
