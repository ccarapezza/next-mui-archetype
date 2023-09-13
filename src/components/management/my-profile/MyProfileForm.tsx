"use client"
import { faClose, faEnvelope, faRefresh, faSave, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Box, Button, Card, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack';
import * as yup from "yup";
import AvatarUploadModal from '@/components/client/AvatarUploadModal'
import MyProfileAvatarControl from './MyProfileAvatarControl'

interface IMyProfileForm {
    name: string
}

const schema = yup.object({
    name: yup.string().min(3).max(20).required()
}).required();

const saveProfile = async (profileData: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/my-profile/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
    });
    return res.json();
};

export default function MyProfileForm({ myProfileData }: { myProfileData: any }) {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors } } = useForm<IMyProfileForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: IMyProfileForm) => {
        setLoading(true);

        saveProfile(data).then((response) => {
            enqueueSnackbar("Perfil actualizado correctamente", { variant: 'success' });
        }).catch((err: any) => {
            console.log("err", err);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (<Box className="flex w-full flex-col items-center">
        <Card variant='outlined' className='max-w-full w-full lg:max-w-2xl pt-2'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container padding={2} marginTop={2} paddingTop={0} gap={2}>
                    <Grid item xs={12} className='flex flex-row justify-center items-center gap-2'>
                        <Stack className='flex flex-col justify-center items-center gap-2'>
                            <MyProfileAvatarControl avatarImage={myProfileData.image} size={{ width: 200, height: 200 }} compressedSizeOnKb={150} name='avatar' title='Avatar' />
                            <Chip variant='outlined' classes={{label: "leading-none"}} icon={<FontAwesomeIcon icon={faUser}  className='pl-2'/>} label={myProfileData.name} className='font-bold uppercase' />
                            <Typography><FontAwesomeIcon icon={faEnvelope}  className='pr-2'/>{myProfileData.email}</Typography>
                        </Stack>
                    </Grid>
                    <Divider className='w-full'/>
                    <Grid item xs={12}>
                        <Typography component="small" className='font-bold '>
                            Roles
                        </Typography>
                        {myProfileData.roles.map((role: any) => {
                            return (<Chip size='small' variant='outlined' key={role.id} label={role.name} className='font-bold uppercase ml-2'/>)
                        })}
                    </Grid>
                    <Divider className='w-full'/>
                    <Grid item xs={12} className='flex items-center gap-2'>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            {...register("name")}
                            id="name"
                            label="Nombre"
                            type="text"
                            fullWidth
                            defaultValue={myProfileData.name}
                            error={!!errors.name}/>
                    </Grid>
                    <Grid item xs={12} className='flex flex-row justify-end items-center gap-2'>
                        <Button type='submit' startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary" disabled={loading}>
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Card>
        <Card variant='outlined' className='max-w-full w-full lg:max-w-2xl mt-4'>
            <CardHeader title="Cambiar email"/>
            <Alert severity="warning">
                <Typography variant='body2'>
                    Si necesitas cambiar tu email deberas volver a verificar tu cuenta. La sesión actual se cerrará.
                    <Box className="w-full flex justify-center">
                        <Button variant="contained" color="inherit" className='mr-4 mt-4' startIcon={<><FontAwesomeIcon icon={faRefresh} /></>} disabled={loading}>
                            Cambiar email
                        </Button>
                    </Box>
                </Typography>
            </Alert>
        </Card>
        <Dialog open={false} onClose={() => {}}>
            <form onSubmit={() => {}} >
                <DialogTitle className='flex justify-between items-center my-0 py-1'>
                    <Typography component="small">
                        Cambiar email
                    </Typography>
                    <IconButton onClick={() => {  }} className='text-gray-500'>
                        <FontAwesomeIcon icon={faClose} />
                    </IconButton>
                </DialogTitle>
                <Divider />
                <DialogContent className="flex flex-col items-center justify-center">
                    <TextField
                        type='email'
                        className='w-full mt-4'
                        size='small'
                        label="Email"
                        defaultValue={myProfileData.email}
                        InputProps={{
                            startAdornment: (
                                <FontAwesomeIcon icon={faEnvelope} className='m-0 pr-2 text-gray-600'/>
                            ),
                        }} />
                </DialogContent>
                <DialogActions>
                    <Button type='submit' startIcon={<FontAwesomeIcon icon={faRefresh} />} variant="contained" color="primary" size='small'>
                        <Typography className='text-sm leading-normal'>Cambiar Email</Typography>
                    </Button>
                </DialogActions>
            </form>
            
        </Dialog>

    </Box>)
}
