"use client"
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button } from '@mui/material'
import React from 'react'
import SearchField from '../client/SearchField'
import { useRouter } from 'next/navigation'

function EntityTableToolbar({ newEntityPath, newButtonLabel }: { newEntityPath?: string, newButtonLabel?: string }) {
    const route = useRouter();
    return (<Box className="flex items-center justify-between">
        <SearchField />
        <Button startIcon={<FontAwesomeIcon icon={faPlus} />} onClick={() => { newEntityPath&&route.push(newEntityPath) }} variant="contained" color="primary" className='my-4'>
            {newButtonLabel&&newButtonLabel}
        </Button>
    </Box>)
}

export default EntityTableToolbar