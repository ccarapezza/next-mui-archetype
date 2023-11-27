"use client"
import { Box, CircularProgress, Fade, Typography } from "@mui/material";

export default function ManagementLoadingPage() {
    // You can add any UI inside Loading, including a Skeleton.<Box sx={{ display: 'flex', minHeight: '100vh' }}>
    return <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '90vh' }}>
        <Fade in={true} unmountOnExit>
            <CircularProgress size={100} className="text-green-600" />
        </Fade>
        <Typography className='animate-pulse'>Cargando</Typography>
    </Box>
}