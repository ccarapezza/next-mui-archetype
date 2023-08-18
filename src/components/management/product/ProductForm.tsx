"use client"
import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Divider, Alert, Chip, OutlinedInput, Box, Checkbox, ListItemText, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faPlus, faTrash, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import CurrencyInput from './CurrencyInput';
import CategoryTreeSelector from '../category/CategoryTreeSelector';
import ColorPicker from '../../client/ColorPicker';
import { ProductInput, productInputSchema } from '../../../schemas/product';
import { ProductCategoryDto } from '@/schemas/category';
import { VariationDto } from '@/schemas/variation';
import { VariationOptionDto } from '@/schemas/variationOption';

const COLOR_VARIANT_ID = 2;

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

const saveProductData = async (productData: any, files: File[]) => {
    const fData:FormData = objectToFormData(productData);
    if(files.length>0){
        fData.set('file', files[0]);
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/product/`, {
        method: 'POST',
        body: fData,
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

const ProductForm = ({categories, variations}:{categories: ProductCategoryDto[], variations: VariationDto[]}) => {
    const router = useRouter();
    const [hasVariants, setHasVariants] = useState<boolean>(false);

    const onSubmit = async (data: any) => {
        saveProductData(data, [file!]).then((response) => {
            console.log("response", data);
            router.push('/management/products');
            router.refresh();//Need to refresh the page to get the updated data
        }).catch((error) => {
            console.log("error", error);
        });
    };

    const getValuesByVariantId = (variantId: number) : VariationOptionDto[] => {
        return variations.find((variation) => variation.id === variantId)?.variationOptions || [];
    };

    const { register, control, handleSubmit, reset, formState: { errors, isSubmitting, isLoading }, setValue, watch } = useForm<ProductInput>({
        resolver: yupResolver(productInputSchema),
        defaultValues: {
            name: '',
            description: '',
            categoryId: 0,
            items: [
                {
                    variation: [],
                    price: 0
                }
            ]
        }
    });

    const clearItems = () => {
        setValue("items", [{
            variation: [],
            price: 0
        }]);
        setHasVariants(false);
    };

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

    const [variantsSelected, setVariantsSelected] = React.useState<any[]>([]);

    const handleMultipleVariantsChange = (event: SelectChangeEvent<typeof variantsSelected>) => {
        const { target: { value } } = event;
        if(value instanceof Array){
            //
            if(variantsSelected.length>value.length){//si se saco un elemento
                //se busca el indice del elemento que se saco
                const removedIndex = variantsSelected.findIndex((variantSel)=>!value.find((variant)=>variantSel.id===variant.id));
                //se borra el elemento de las variaciones de cada item ya que al ser una lista dinamica no se puede hacer un setValue directamente
                setValue("items", watch("items").map((item: any) => {
                    item.variation.splice(removedIndex, 1);
                    return item;
                }));
            }

            setVariantsSelected(value);
        }else{
            setVariantsSelected([]);
        }
    };

    /*
    useEffect(() => {
        //TODO: borrar!
        console.log("errors", errors);
        console.log("watch", watch());
    }, [errors, watch]);
    */

    const [file, setFile] = useState<File>();

    return (
        <div className="max-w-md mx-auto bg-white p-4 rounded-md shadow-lg">
            <h1 className="text-xl font-semibold mb-4">Crear nuevo producto</h1>
            <Box>
                {/*
                    <pre>{JSON.stringify(variations, null, 2)}</pre>
                */}
            </Box>
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
                    name={"categoryId"}
                    control={control}
                    render={({ field: { ref, onChange, ...rest } }) => (
                        <CategoryTreeSelector onChange={(value)=>{
                            if(typeof value === 'string' || typeof value === 'number'){
                                const valueInt = parseInt(value);
                                onChange(valueInt);
                            }else{
                                onChange(0);
                            }
                        }} inputProps={{error:!!errors.categoryId, ref:ref}} fullWidth size="small" className="mb-4" categories={categories}
                        />      
                    )}
                />
                <input
                    type="file"
                    name="file"
                    accept="image/png, image/gif, image/jpeg"
                    className='mb-4'
                    onChange={(e) => setFile(e.target.files?.[0])}
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
                    <Button size='small' className='my-4' startIcon={<FontAwesomeIcon icon={faPlus} />} variant="contained" color="primary" onClick={()=>setHasVariants(true)}>
                        {'Incluir variantes'}
                    </Button>
                }
                {hasVariants && <>
                    <Box className="flex">
                        <h1 className="text-xl font-semibold mt-4 mb-1">Variantes</h1>
                        {hasVariants && 
                            <Button className='my-4 ml-auto' size='small' startIcon={<FontAwesomeIcon icon={faTrash} />} variant="outlined" color="primary" onClick={()=>clearItems()}>
                                {'Eliminar variantes'}
                            </Button>
                        }
                    </Box>
                    <FormControl fullWidth size='small' className="mt-4 mb-3">
                        <InputLabel htmlFor='variant-types'>Tipos de variantes</InputLabel>
                        <Select
                            fullWidth
                            id='variant-types'
                            multiple
                            value={variantsSelected || []}
                            onChange={handleMultipleVariantsChange}
                            input={<OutlinedInput id="select-multiple-chip" label="Tipos de variantes" />}
                            renderValue={(value) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {value.map((value) => {
                                        const variant = variations.find((variation)=>variation.id===value);
                                        return(
                                            <Chip variant='outlined' size='small' key={`${variant?.id}-${variant?.name}-selected-variants`} label={variant?.name} />
                                        )
                                    })}
                                </Box>
                            )}
                            MenuProps={MenuProps}
                        >
                            {variations.map((variationValue) => (
                                <MenuItem
                                    key={`${variationValue.id}-${variationValue.name}-variant`}
                                    value={variationValue.id}
                                >
                                    <Checkbox checked={variantsSelected.find((variantSel)=>variantSel===variationValue.id)?true:false} className='mr-2' />
                                    <ListItemText primary={variationValue.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>}
                {hasVariants && variantsSelected.length > 0 && fields.map((variant, itemIndex) => (
                    <div key={itemIndex} className="mt-2">
                        <Divider><Chip label={`Item #${itemIndex + 1}`} className='mb-2 mt-4' /></Divider>
                        {variations.filter((variation)=>variantsSelected.find((variantSel)=>variantSel===variation.id)).map((variant, variantTypeIndex) => (
                            <Box key={`${itemIndex}-${variant?.id}-${variant?.name}`}>
                                {
                                    variant?.id === COLOR_VARIANT_ID ?
                                    <Box className="flex items-center mb-4">
                                        <Typography className='pl-1 pr-4'>{variant?.name}{!!errors.items?.[itemIndex]?.variation?.[variantTypeIndex]!&&<FontAwesomeIcon className='text-red-500' icon={faWarning}/>}</Typography>
                                        <ColorPicker
                                            key={variantTypeIndex}
                                            inputProps={{
                                                className:'mb-4',
                                                ...register(`items.${itemIndex}.variation.${variantTypeIndex}`)
                                            }}
                                            name="variantValue"
                                            error={!!errors.items?.[itemIndex]?.variation?.[variantTypeIndex]}
                                            variationOptions={getValuesByVariantId(variant?.id) || []}
                                        />
                                    </Box>
                                    :
                                    <FormControl variant="outlined" fullWidth size='small' className="mb-3">
                                        <InputLabel htmlFor={"variant-"+variantTypeIndex}>{variant?.name}</InputLabel>
                                        <Select
                                            id={"variant-"+variantTypeIndex}
                                            defaultValue={""}
                                            inputProps={{
                                                ...register(`items.${itemIndex}.variation.${variantTypeIndex}`)
                                            }}
                                            size='small'
                                            name="type"
                                            label={variant?.name}
                                            error={!!errors.items?.[itemIndex]?.variation?.[variantTypeIndex]}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {getValuesByVariantId(variant?.id).map(item => (
                                                <MenuItem key={`${item.id}-${item.value}-variant-value`} value={item.id}>
                                                    {item.value}
                                                </MenuItem>
                                            ))}
                                            {/*getValuesByVariantId(variantType).map((value, valueIndex) => (
                                                <MenuItem key={valueIndex} value={value}>
                                                    {value}
                                                </MenuItem>
                                            ))*/}
                                        </Select>
                                    </FormControl>
                                }
                            </Box>
                        ))}
                        <CurrencyInput
                            fullWidth
                            name={`items.${itemIndex}.price`}
                            error={!!errors.items?.[itemIndex]?.price}
                            control={control}
                            prefix="AR$"
                        />
                        {fields.length > 1 && (
                            <div className='flex justify-end align-center mb-1'>
                                <Button variant="outlined" color="error" size='small' onClick={() => remove(itemIndex)} className='my-2'>
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