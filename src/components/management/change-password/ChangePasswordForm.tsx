"use client"
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Card, Divider, Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack';
import * as yup from "yup";
import { signOut } from 'next-auth/react';

interface IChangePasswordForm {
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
}

const schema = yup.object({
    currentPassword: yup.string().min(3).max(20).required(),
    newPassword: yup.string().min(3).max(20).required(),
    confirmPassword: yup.string().min(3).max(20).required()
}).required();

const updateChangePasswordData = async (changePasswordData: any) => {
    console.log("changePasswordData", changePasswordData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/my-profile/change-password`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            currentPassword: changePasswordData.currentPassword,
            newPassword: changePasswordData.newPassword
        })
    });
    if(!res.ok){
        if(res.status===401){
            throw new Error("La contraseña actual no es correcta", { cause: "currentPassword" });
        }

        throw new Error("Error cambiando la contraseña");
    }
    return res.json();
};

export default function ChangePasswordForm() {
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors }, setError } = useForm<IChangePasswordForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: IChangePasswordForm) => {
        if (data.newPassword !== data.confirmPassword) {
            enqueueSnackbar("Las contraseñas no coinciden", { variant: 'error' });
            setError("confirmPassword", { });
            setError("newPassword", { });
            return;
        }
        setLoading(true);
        updateChangePasswordData({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword
        }).then((response) => {
            enqueueSnackbar("La contraseña se cambió correctamente", { variant: 'success' });
            signOut();
        }).catch((err: any) => {
            if(err.cause==="currentPassword"){
                setError("currentPassword", { message: err.message });
            }
            enqueueSnackbar(err.message, { variant: 'error' });
            console.log("err", err);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (<Card variant='outlined' className='max-w-full lg:max-w-2xl pt-2'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container padding={2} paddingTop={0} gap={2}>
                <Grid item xs={12}>
                    <Alert severity="warning">
                        <strong>Atención:</strong> Si cambias tu contraseña, la sesión actual se cerrará y deberás iniciar sesión nuevamente.
                    </Alert>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        {...register("currentPassword")}
                        className='my-2'
                        label="Contraseña actual"
                        variant="outlined"
                        type='password'
                        fullWidth
                        required
                        error={!!errors.currentPassword}
                        helperText={errors.currentPassword?.message}
                    />
                    <Divider className='my-2'/>
                    <TextField
                        {...register("newPassword")}
                        className='my-2'
                        label="Nueva contraseña"
                        variant="outlined"
                        type='password'
                        fullWidth
                        required
                        error={!!errors.newPassword}
                        helperText={errors.newPassword?.message}
                    />
                    <TextField
                        {...register("confirmPassword")}
                        className='my-2'
                        label="Confirmar contraseña"
                        variant="outlined"
                        type='password'
                        fullWidth
                        required
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                    />
                </Grid>
                <Grid item xs={12} className='flex flex-row justify-end items-center gap-2'>
                    <Button type='submit' startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary" disabled={loading}>
                        Cambiar contraseña
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Card>)
}
