"use client"
import { Grid } from '@mui/material'
import React from 'react'

function MuiGrid(props: any) {
  return (
    <Grid {...props}>{props.children}</Grid>
  )
}

export default MuiGrid