"use client"
import { Alert } from '@mui/material'
import React from 'react'

function MuiAlert(props: any) {
  return (
    <Alert {...props}>{props.children}</Alert>
  )
}

export default MuiAlert