'use client'
import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function ManagementHome() {
    return (<Grid container alignItems="center" justifyContent="center" direction="column" className="h-full">
        <Typography variant="h5" className="uppercase mt-4 font-bold">
            Panel de administración
        </Typography>
        <Stack direction="row" columnGap={1}>
            <Image src="/logos/NEXT-Store-logo.png" alt='Float UI logo' width={550} height={550} className="max-h-72 object-contain"/>
        </Stack>
    </Grid>)
}