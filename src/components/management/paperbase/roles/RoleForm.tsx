"use client"
import AvatarUploadModal from '@/components/client/AvatarUploadModal'
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Card, Chip, Grid, TextField, Typography } from '@mui/material'
import React from 'react'

export default function UserForm({ userData }: { userData: any }) {
    return (<Card variant='outlined' className='max-w-full lg:max-w-2xl'>
        <Grid container padding={2} paddingTop={0} gap={2}>
            <Grid item xs={12} className='flex flex-row justify-center items-center'>
                <AvatarUploadModal src={userData.image}/>
            </Grid>
            <Grid item xs={12} className='flex flex-row items-center gap-2'>
                <Typography className='font-bold'>ID</Typography><Chip label={userData.id} />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="username"
                    label="Username"
                    type="username"
                    fullWidth
                    value={userData.name}/>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="outlined-password-input"
                    label="Email"
                    type="email"
                    fullWidth
                    value={userData.email}/>
            </Grid>
            <Grid item xs={12} className='flex flex-row justify-end items-center gap-2'>
                <Button startIcon={<FontAwesomeIcon icon={faSave}/>} variant="contained" color="primary">
                    Save
                </Button>
            </Grid>
        </Grid>
    </Card>)
}
