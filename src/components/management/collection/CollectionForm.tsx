"use client"
import { faSave, faTag, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, Grid, TextField, Box, Chip, Typography, IconButton, Tooltip, Divider, Input, Alert } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { use, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSnackbar } from 'notistack';
import * as yup from "yup";
import ProductSelector from '../product/product-selector/ProductSelector'
import { ProductDto } from '@/schemas/product'
import Image from 'next/image';

interface ICollectionForm {
    name: string
    productsIds: number[]
}

const schema = yup.object({
    name: yup.string().min(3).max(20).required(),
    productsIds: yup.array().of(yup.number().required()).min(1, 'Debe seleccionar al menos un producto').required()
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
    const [products, setProducts] = useState<ProductDto[]>([]);
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        console.log("collectionData", collectionData);
        if(collectionData.id){
            setEditMode(true);
            setProducts(collectionData.products);
        }
    }, [collectionData]);

    const { register, handleSubmit, formState: { errors }, setValue  } = useForm<ICollectionForm>({
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
            enqueueSnackbar('Error al guardar la colección', { variant: 'error' });
            console.log("err", err);
        }).finally(() => {
            setLoading(false);
        });
    };

    const addProduct = (product: ProductDto) => {
        if(!products.find((p) => p.id === product?.id)){
            setProducts([...products, product]);
            enqueueSnackbar('Producto agregado a la colección', { variant: 'success' });
        }else{
            enqueueSnackbar('El producto ya está en la colección', { variant: 'warning' });
        }
    }

    const removeProduct = (product: ProductDto) => {
        setProducts(products.filter((p) => p.id !== product?.id));
        enqueueSnackbar('Producto eliminado de la colección', { variant: 'success' });
    }

    useEffect(() => {
        if(products.length > 0){
            setValue('productsIds', products.map((p) => p?.id));
        }else{
            setValue('productsIds', []);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    return (<Card variant='outlined' className='max-w-full lg:max-w-2xl pt-2'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container padding={2} marginTop={2} paddingTop={0} gap={2}>
                <Grid item xs={12}>
                    <TextField
                        {...register("name")}
                        id="name"
                        label="Nombre de la colección"
                        type="text"
                        size='small'
                        fullWidth
                        defaultValue={collectionData.name}
                        error={!!errors.name}/>
                </Grid>
                <Divider component="hr" className='w-full'/>
                <Grid item xs={12} className='flex flex-row justify-end items-center gap-2'>
                    <ProductSelector label="Agregar productos" selectedProductsIds={products.map((p) => p?.id)} onSelectProduct={ (product: ProductDto) => {
                        addProduct(product);
                    } }/>
                </Grid>
                <Grid item xs={12} className='flex flex-row justify-between items-center gap-2'>
                    <ul className='w-full'>
                        <Typography variant="body1" className='my-0 py-0 flex items-center gap-2 mt-2'>
                            Productos
                            <Chip component="span" variant='outlined' className='px-2' label={products.length} size='small'/>
                            {!!errors.productsIds && <Alert severity="error" className='px-3 pr-4 py-0'>{"Debe seleccionar al menos un producto"}</Alert>}
                        </Typography>
                        {products.length === 0 && <Typography variant="body2" className='my-0 py-0 w-100 text-center italic'>No hay productos en la colección</Typography>}
                        {products.map((product) => {
                            return (<Box component="li" key={`prod-red-${product.id}`} className='flex'>
                                <Box className="flex flex-row content-center items-center gap-2 p-2 rounded border border-transparent border-slate-200 shadow-md mt-2 w-full">
                                    <Image
                                        src={product?.items[0]?.images?.[0]}
                                        width={32}
                                        height={32}
                                        alt={product.name}
                                        className='rounded-md'
                                    />
                                    <Box className="w-full flex flex-row justify-between items-center">
                                        <Chip label={`#${product.id}`} />
                                        <Typography variant="body1">{product.name}</Typography>
                                        <Chip variant='outlined' icon={<FontAwesomeIcon icon={faTag} className='pl-2'/>} label={product.category?.name} />
                                    </Box>
                                </Box>
                                <Tooltip title="Eliminar" placement='right'>
                                    <IconButton size='small' onClick={() => {removeProduct(product)}} className='ml-2 hover:text-red-500'>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </IconButton>
                                </Tooltip>
                            </Box>)
                        })}
                    </ul>
                </Grid>
                <Grid item xs={12} className='flex flex-row justify-end items-center gap-2'>
                    <Button className='mt-2' type='submit' startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary" disabled={loading}>
                        Guardar
                    </Button>
                </Grid>
            </Grid>
        </form>
    </Card>)
}
