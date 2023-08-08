"use client"
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Grid, TextField } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack';
import * as yup from "yup";

interface IRoleForm {
    name: string
}

const schema = yup.object({
    name: yup.string().min(3).max(20).required()
}).required();

const updateRoleData = async (roleData: any) => {
    console.log("roleData", roleData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/role/${roleData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(roleData)
    });
    return res.json();
};

const saveRoleData = async (roleData: any) => {
    console.log("roleData", roleData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/role/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(roleData)
    });
    return res.json();
};

export default function RoleForm({ roleData }: { roleData: any }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors } } = useForm<IRoleForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: IRoleForm) => {
        setLoading(true);
        const reqObj = {
            ...roleData,
            ...data
        };
        const saveFunction = roleData.id ? updateRoleData : saveRoleData;
        saveFunction(reqObj).then((response) => {
            enqueueSnackbar(roleData.id ? 'Update success!' : 'Create success!', { variant: 'success' });
            router.push('/management/roles');
            router.refresh();//Need to refresh the page to get the updated data
        }).catch((err: any) => {
            console.log("err", err);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (<Card variant='outlined' className='max-w-full lg:max-w-2xl pt-2'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container padding={2} marginTop={2} paddingTop={0} gap={2}>
                <Grid item xs={12}>
                    <TextField
                        {...register("name")}
                        id="name"
                        label="Role Name"
                        type="text"
                        fullWidth
                        defaultValue={roleData.name}
                        error={!!errors.name}/>
                </Grid>
                <Grid item xs={12} className='flex flex-row justify-end items-center gap-2'>
                    <Button type='submit' startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary" disabled={loading}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Card>)
}
