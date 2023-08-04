'use client'
import { faEnvelope, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import React, { useRef } from 'react'

const sendTestEmail = async (htmlContent: any, email: string) => {
    const res = await fetch(`http://localhost:3000/api/management/email-sender/send-test-email`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            htmlContent,
            email
        })
    });
    return res.json();
};

function TestEmailCard({htmlContent}: {htmlContent: string}) {

    const emailRef = useRef<HTMLInputElement>(null);

    const sendTestEmailButtonClick = () => {
        if(emailRef.current?.value){
            sendTestEmail(htmlContent, emailRef.current?.value);
        }
    }

    return (
        <Card className='p-2 my-2 border'>
            <CardContent>
                <div className='flex flex-col items-center'>
                    <Alert severity="info" className='w-full'>
                        <Typography className='font-bold'>Test Email</Typography>
                        <Typography >Send an email test for check styling</Typography>
                    </Alert>
                    <TextField
                        type='email'
                        inputRef={emailRef}
                        className='w-full mt-4'
                        size='small'
                        InputProps={{
                            startAdornment: (
                                <FontAwesomeIcon icon={faEnvelope} className='m-0'/>
                            ),
                        }} />
                    <Button disabled={htmlContent?false:true} onClick={sendTestEmailButtonClick} variant='outlined' startIcon={<FontAwesomeIcon icon={faEnvelopeOpenText}/>} className='mt-2'>
                        Send Test Email
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default TestEmailCard