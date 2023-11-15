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

interface ICollectionForm {
    name: string
}

const schema = yup.object({
    name: yup.string().min(3).max(20).required()
}).required();

const updateCollectionData = async (collectionData: any) => {
    console.log("collectionData", collectionData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/collection/${collectionData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(collectionData)
    });
    return res.json();
};

const saveCollectionData = async (collectionData: any) => {
    console.log("collectionData", collectionData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/collection/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(collectionData)
    });
    return res.json();
};

export default function CollectionForm({ collectionData }: { collectionData: any }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors } } = useForm<ICollectionForm>({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data: ICollectionForm) => {
        setLoading(true);
        const reqObj = {
            ...collectionData,
            ...data
        };
        const saveFunction = collectionData.id ? updateCollectionData : saveCollectionData;
        saveFunction(reqObj).then((response) => {
            enqueueSnackbar(collectionData.id ? 'Update success!' : 'Create success!', { variant: 'success' });
            router.push('/management/collections');
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
                        label="Collection Name"
                        type="text"
                        fullWidth
                        defaultValue={collectionData.name}
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
