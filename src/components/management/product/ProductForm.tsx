"use client"
import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Divider, Alert, Chip, OutlinedInput, Box, Checkbox, ListItemText, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import ColorPicker from '@/components/client/ColorPicker';
import { Product, productSchema } from '@/schemas/product';
import { yupResolver } from '@hookform/resolvers/yup';
import CurrencyInput from './CurrencyInput';
import CategoryTreeSelector from '../category/CategoryTreeSelector';

const VARIANT_TYPES = [
    {
        name: 'Talle',
        values: ['S', 'M', 'L'],
    },
    {
        name: 'Color',
        values: ['Rojo', 'Azul', 'Verde'],
    }

]; // Ejemplo de opciones de tipos de variantes

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const saveProductData = async (productData: any) => {
    console.log("productData", productData);
    const fData:FormData = objectToFormData(productData);
    const res = await fetch(`http://localhost:3000/api/management/product/`, {
        method: 'POST',
        body: fData
    });
    return res.json();
};

const buildFormData = (formData:FormData, obj:any, parentKey: string = '') => {
    if (Array.isArray(obj)) {
      obj.forEach((element, index) => {
        buildFormData(formData, element, parentKey+"."+index);
      });
    } else if (typeof obj === 'object' && !(obj instanceof File)) {
      Object.keys(obj).forEach(key => {
        buildFormData(
          formData,
          obj[key],
          parentKey ? `${parentKey}.${key}` : key,
        );
      });
    } else {
      if (obj == null) {
        return;
      }
  
      const value =
        typeof obj === 'number' || typeof obj === 'boolean'
          ? obj.toString()
          : obj;
      formData.append(parentKey, value);
    }
};
  
export const objectToFormData = (obj: any) => {
    const formData = new FormData();

    buildFormData(formData, obj);

    return formData;
};

const ProductForm = ({categories}:{categories: any}) => {
    const [hasVariants, setHasVariants] = useState<boolean>(false);

    const onSubmit = async (data: any) => {
        console.log("onSubmit", data);
        saveProductData(data).then((response) => {
            console.log("response", response);
        }).catch((error) => {
            console.log("error", error);
        });
    };

    const getVariantValues = (variantType: string) => {
        return VARIANT_TYPES.find(({ name }) => name === variantType)?.values || [];
    };

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<Product>({
        resolver: yupResolver(productSchema),
        defaultValues: {
            name: '',
            description: '',
            category: '',
            items: [
                {
                    variation: [],
                    price: 0
                }
            ]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "items"
    });

    const handleAddVariant = () => {
        append({
            variation: [],
            price: 0

        });
    };

    const [variantsSelected, setVariantsSelected] = React.useState<string[]>([]);

    const handleMultipleVariantsChange = (event: SelectChangeEvent<typeof variantsSelected>) => {
        const { target: { value } } = event;
        setVariantsSelected(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        
        //show errors
        console.log("errors", errors);
    }, [errors]);

    return (
        <div className="max-w-md mx-auto bg-white p-4 rounded-md shadow-lg">
            <h1 className="text-xl font-semibold mb-4">Crear nuevo producto</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    inputProps={{...register("name")}}
                    error={!!errors.name}
                    size='small'
                    label="Nombre del producto"
                    variant="outlined"
                    fullWidth
                    name="productName"
                    className="mb-3"
                />
                <TextField
                    inputProps={{...register("description")}}
                    error={!!errors.description}
                    size='small'
                    label="Descripción del producto"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    name="productDescription"
                    className="mb-3"
                />
                <Controller               
                    name={"category"}
                    control={control}
                    render={({ field: { ref, onChange, ...rest } }) => (
                        <CategoryTreeSelector onChange={onChange} inputProps={{error:!!errors.category, ref:ref}} fullWidth size="small" className="mb-4" categories={categories}
                        />      
                    )}
                />
                {hasVariants ? (
                    <Alert severity="warning" >
                        El precio principal está inhabilitado debido a que hay variantes.
                    </Alert>
                ) : (
                    <CurrencyInput
                        fullWidth
                        name="items.0.price"
                        error={!!errors.items?.[0]?.price}
                        control={control}
                        prefix="AR$"
                    />
                )}
                {!hasVariants && 
                    <Button className='my-4' startIcon={<FontAwesomeIcon icon={faPlus} />} variant="contained" color="primary" onClick={()=>setHasVariants(true)}>
                        {'Incluir variantes'}
                    </Button>
                }
                {hasVariants && <>
                    <h1 className="text-xl font-semibold mt-4 mb-1">Variantes</h1>
                    <FormControl fullWidth size='small' className="mt-4 mb-3">
                        <InputLabel id="variant-types">Tipos de variantes</InputLabel>
                        <Select
                            fullWidth
                            labelId="variant-types"
                            multiple
                            value={variantsSelected}
                            onChange={handleMultipleVariantsChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Tipos de variantes" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip variant='outlined' size='small' key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {VARIANT_TYPES.map(({ name }) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                >
                                    <Checkbox checked={variantsSelected.indexOf(name) > -1} />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>}
                {hasVariants && variantsSelected.length > 0 && fields.map((variant, index) => (
                    <div key={index} className="mt-2">
                        <Divider><Chip label={`Item #${index + 1}`} className='mb-2 mt-4' /></Divider>
                        {variantsSelected.map((variantType, variantTypeIndex) => (
                            variantType?.toLowerCase() === 'color' ?
                            <Box key={variantType} className="flex items-center mb-4">
                                <Typography className='pl-1 pr-4'>{variantType}</Typography>
                                <input type="hidden" {...register(`items.${index}.variation.${variantTypeIndex}.name`)} value={variantType} />
                                <ColorPicker
                                    key={variantTypeIndex}
                                    inputProps={{
                                        className:'mb-4',
                                        ...register(`items.${index}.variation.${variantTypeIndex}.value`)
                                    }}
                                    name="variantValue"
                                />
                            </Box>
                            :
                            <FormControl key={variantType} variant="outlined" fullWidth size='small' className="mb-3">
                                <InputLabel>{variantType}</InputLabel>
                                <input type="hidden" {...register(`items.${index}.variation.${variantTypeIndex}.name`)} value={variantType} />
                                <Select
                                    defaultValue={""}
                                    inputProps={{
                                        ...register(`items.${index}.variation.${variantTypeIndex}.value`)
                                    }}
                                    size='small'
                                    name="type"
                                    label={variantType}
                                    error={!!errors.items?.[index]?.variation?.[variantTypeIndex]?.value}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {getVariantValues(variantType).map((value, valueIndex) => (
                                        <MenuItem key={valueIndex} value={value}>
                                            {value}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        ))}
                        <CurrencyInput
                            fullWidth
                            name={`items.${index}.price`}
                            error={!!errors.items?.[index]?.price}
                            control={control}
                            prefix="AR$"
                        />
                        {fields.length > 1 && (
                            <div className='flex justify-end align-center mb-1'>
                                <Button variant="outlined" color="error" size='small' onClick={() => remove(index)} className='my-2'>
                                    <FontAwesomeIcon icon={faTrash} className='mr-2' />
                                    <Typography component="span" fontSize={12}>Eliminar variante</Typography>
                                </Button>
                            </div>
                        )}
                        <Divider />
                        <div className='flex justify-end mt-4'>
                            <Button variant="contained" color="primary" size='small' className='my-4' onClick={handleAddVariant}>
                                Agregar variante
                            </Button>
                        </div>
                    </div>
                ))}
                {hasVariants&&<>
                </>}
                <Divider />
                <div className='flex justify-center mt-4'>
                    <Button variant="contained" color="primary" type="submit" size='small' disabled={(hasVariants&&variantsSelected.length<=0)}>
                        Crear Producto
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;