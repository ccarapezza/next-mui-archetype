"use client"
import { Box } from '@mui/material'
import React from 'react'

function MuiBox(props: any) {
  return (
    <Box {...props}>{props.children}</Box>
  )
}

export default MuiBox