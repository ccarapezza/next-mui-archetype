'use client'
import { Grid, Button, Stack } from "@mui/material";

export default function ManagementHome() {
    return (<Grid container alignItems="center" justifyContent="center" direction="column">
    <h1>Using Material UI with Next.js 13</h1>
    <Stack direction="row" columnGap={1}>
      <Button variant="text" className="hover:bg-blue-100 dark:hover:bg-blue-950">Text</Button>
      <Button variant="contained" className="bg-blue-600 hover:bg-blue-700">Contained</Button>
      <Button variant="outlined" className="hover:bg-blue-100 dark:hover:bg-blue-950">Outlined</Button>
    </Stack>
  </Grid>)
  }