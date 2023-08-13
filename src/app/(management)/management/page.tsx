'use client'
import { Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

export default function ManagementHome() {
    return (<Grid container alignItems="center" justifyContent="center" direction="column">
        <Typography variant="h5" className="uppercase mt-4 font-bold">
            Panel de administración
        </Typography>
        <Stack direction="row" columnGap={1}>
            <Image src="/logos/CMD [Logotipo] variables-03.png" alt='Float UI logo' width={550} height={550} />
        </Stack>
    </Grid>)
}