"use client"
import { Box, CircularProgress, Fade, Typography } from "@mui/material";

export default function LoadingUI({label="Cargando"}: {label?: string}) {
    // You can add any UI inside Loading, including a Skeleton.<Box sx={{ display: 'flex', minHeight: '100vh' }}>
    return <Box>
        <Fade in={true} unmountOnExit>
            <CircularProgress />
        </Fade>
        <Typography className='animate-pulse'>{label}</Typography>
    </Box>
}