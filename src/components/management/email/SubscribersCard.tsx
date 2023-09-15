'use client'
import { faEnvelopeOpenText, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

function SubscribersCard({ count }: { count: number }) {
    console.log("count", count)
    return (
        <Card className='p-2 my-2 border'>
            <CardContent>
                <div className='flex flex-col items-center'>
                    <FontAwesomeIcon icon={faUserAlt} size='6x' className='m-5 text-slate-400'/>
                    <Typography className='font-bold'>{`${count} Suscripciones`}</Typography>
                    <Button variant='outlined' startIcon={<FontAwesomeIcon icon={faEnvelopeOpenText}/>} className='mt-2'>
                        Send Email to all subscribers
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default SubscribersCard