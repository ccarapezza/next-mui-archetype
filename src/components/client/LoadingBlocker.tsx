import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export default function LoadingBlocker() {
    return (<Backdrop className='z-[9999]' open={true}>
        <CircularProgress />
    </Backdrop>)
}
