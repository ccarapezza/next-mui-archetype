"use client"
import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Grid, TextField, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack';
import * as yup from "yup";

interface ICategoryForm {
    name: string
    parentId?: string | null
}

const schema = yup.object({
    name: yup.string().min(3).max(50).required()
}).required();

const updateCategoryData = async (categoryData: any) => {
    console.log("categoryData", categoryData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/category/${categoryData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(categoryData)
    });
    return res.json();
};

const saveCategoryData = async (categoryData: any) => {
    console.log("categoryData", categoryData);
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/category/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: categoryData.name,
            parentId: categoryData.parentId?categoryData.parentId:null
        })
    });
    return res.json();
};

export default function CategoryForm({ categoryData, title, onSaveComplete }: { categoryData: any, title?: string, onSaveComplete?: any }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors } } = useForm<ICategoryForm>({
        resolver: yupResolver(schema),
        values: {
            parentId: categoryData?.parentId,
            name: categoryData?.name?categoryData?.name:""
        }
    });

    const onSubmit = async (data: ICategoryForm) => {
        setLoading(true);
        const reqObj = {
            ...categoryData,
            ...data
        };
        const saveFunction = categoryData?.id ? updateCategoryData : saveCategoryData;
        saveFunction(reqObj).then((response) => {
            enqueueSnackbar(categoryData?.id ? 'Update success!' : 'Create success!', { variant: 'success' });
            onSaveComplete();
            router.push('/management/categories');
            router.refresh();//Need to refresh the page to get the updated data
        }).catch((err: any) => {
            enqueueSnackbar(categoryData?.id ? 'Update error!' : 'Create error!', { variant: 'error' });
            console.log("err", err);
        }).finally(() => {
            setLoading(false);
        });
    };

    return (<Card variant='outlined' className='max-w-full lg:max-w-2xl pt-2'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container padding={2} marginTop={2} paddingTop={0} gap={2}>
                {title&&
                    <Grid item xs={12}>
                        <Typography>{title}</Typography>
                    </Grid>
                }
                <Grid item xs={12}>
                    <TextField
                        InputLabelProps={{ shrink: true }}  
                        {...register("name")}
                        inputProps={{defaultValue: categoryData?.name}}
                        id="name"
                        name='name'
                        label={"Nombre de la categoría"}
                        type="text"
                        fullWidth
                        error={!!errors.name}/>
                </Grid>
                <Grid item xs={12} className='flex flex-row justify-end items-center gap-2'>
                    <Button type='submit' startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary" disabled={loading}>
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Card>)
}
