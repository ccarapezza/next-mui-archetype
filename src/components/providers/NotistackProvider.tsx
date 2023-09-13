'use client'
import React from 'react'
import { SnackbarProvider } from 'notistack'

interface Props{
    children?: React.ReactNode
}

export default function NotistackProviderWrapper({children}: Props){
    return (
        <SnackbarProvider>
            {children}
        </SnackbarProvider>
    )
}