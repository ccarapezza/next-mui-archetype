'use client'
import { faEnvelope, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React from 'react'

function TestEmailCard() {
    return (
        <Card className='p-2 my-2 border'>
            <CardContent>
                <div className='flex flex-col items-center'>
                    <Alert severity="info" className='w-full'>
                        <Typography className='font-bold'>Test Email</Typography>
                        <Typography >Send an email test for check styling</Typography>
                    </Alert>
                    <TextField 
                        className='w-full mt-4'
                        size='small'
                        InputProps={{
                            startAdornment: (
                                <FontAwesomeIcon icon={faEnvelope} className='m-0'/>
                            ),
                        }} />
                    <Button variant='outlined' startIcon={<FontAwesomeIcon icon={faEnvelopeOpenText}/>} className='mt-2'>
                        Send Test Email
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default TestEmailCard