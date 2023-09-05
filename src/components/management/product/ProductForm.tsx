"use client"
import { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Divider, Alert, Chip, OutlinedInput, Box, Checkbox, ListItemText, Typography, IconButton, Dialog, DialogContent, DialogTitle, CircularProgress, Stack, Tooltip, DialogActions } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesPacking, faBoxesStacked, faClose, faPlus, faPlusCircle, faSave, faSquareRootVariable, faTrash, faWarning } from '@fortawesome/free-solid-svg-icons';
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
import ProductItemImages from './ProductItemImages';
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { useSnackbar } from 'notistack';

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

interface VariationItemSelected {
    itemIndex: number,
    variantTypeIndex: number,
    variation: VariationDto,
}

const saveProductData = async (productData: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/product/`, {
        method: 'POST',
        body: JSON.stringify(productData),
    });
    return res.json();
};

const saveVariantOption = async (variantData: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/variationOption`, {
        method: 'POST',
        body: JSON.stringify(variantData),
    });
    return res.json();
};

const getAllVariations = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/variation/list`);
    return res.json();
}

const ProductForm = ({ categories, variations: initialVariations }: { categories: ProductCategoryDto[], variations: VariationDto[] }) => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [hasVariants, setHasVariants] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [variations, setVariations] = useState<VariationDto[]>(initialVariations);

    const [variationSelected, setVariationSelected] = useState<VariationItemSelected|null>(null);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        saveProductData(data).then((response) => {
            router.push('/management/products');
            router.refresh();//Need to refresh the page to get the updated data
        }).catch((error) => {
            console.log("error", error);
            enqueueSnackbar('Error al crear el producto', { variant: 'error' });
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const onSubmitVariant = async (data: any) => {
        setIsLoading(true);
        saveVariantOption({
            variationId: variationSelected?.variation.id,
            value: data.name
        }).then(async (response) => {
            //reload variations
            const variations = await getAllVariations();
            setVariations(variations);
            setVariationSelected(null);
        }).catch((error) => {
            console.log("error", error);
            enqueueSnackbar('Error al crear la variante', { variant: 'error' });
        }).finally(() => {
            setIsLoading(false);
        });
    };

    const getValuesByVariantId = (variantId: number): VariationOptionDto[] => {
        return variations.find((variation) => variation.id === variantId)?.variationOptions || [];
    };

    const { register: registerVariant, handleSubmit: handleSubmitVariant, reset: resetVariant, formState: { errors: errorsVariant } } = useForm<ProductInput>({
        defaultValues: {
            name: ''
        }
    });

    const { register, control, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<ProductInput>({
        resolver: yupResolver(productInputSchema),
        defaultValues: {
            name: '',
            description: '',
            categoryId: 0,
            items: [
                {
                    images: [],
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

    const [variantsSelected, setVariantsSelected] = useState<any[]>([]);

    const handleMultipleVariantsChange = (event: SelectChangeEvent<typeof variantsSelected>) => {
        const { target: { value } } = event;
        if (value instanceof Array) {
            //
            if (variantsSelected.length > value.length) {//si se saco un elemento
                //se busca el indice del elemento que se saco
                const removedIndex = variantsSelected.findIndex((variantSel) => !value.find((variant) => variantSel.id === variant.id));
                //se borra el elemento de las variaciones de cada item ya que al ser una lista dinamica no se puede hacer un setValue directamente
                setValue("items", watch("items").map((item: any) => {
                    item.variation.splice(removedIndex, 1);
                    return item;
                }));
            }

            setVariantsSelected(value);
        } else {
            setVariantsSelected([]);
        }
    };

    return (<>
        {isLoading &&
            <LoadingBlocker/>
        }
        <div className="max-w-screen-xl mx-auto bg-white p-4 rounded-md shadow-lg">
            <h1 className="text-xl font-semibold mb-4">Crear nuevo producto</h1>
            <Box>
                {/*
                    <pre>{JSON.stringify(variations, null, 2)}</pre>
                */}
            </Box>
            {/*
                Add variant popup
            */}
            <Dialog open={variationSelected?true:false} onClose={() => { setVariationSelected(null)}}>
                <form onSubmit={handleSubmitVariant(onSubmitVariant)} >
                    <DialogTitle className='flex justify-between'>
                        <Typography variant="h6" component="div">
                            Agregar {variationSelected?.variation.name}
                        </Typography>
                        <IconButton onClick={()=>{setVariationSelected(null)}} className='text-gray-500'>
                            <FontAwesomeIcon icon={faClose} />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className="flex flex-col items-center justify-center pt-2">
                        <TextField
                            {...registerVariant("name", { required: true })}
                            error={!!errorsVariant.name}
                            size='small'
                            label="Nombre de la variante"
                            variant="outlined"
                            fullWidth
                            className="mb-3"/>
                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary" size='small'>
                            Agregar variante
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>

            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <TextField
                    inputProps={{ ...register("name") }}
                    error={!!errors.name}
                    size='small'
                    label="Nombre del producto"
                    variant="outlined"
                    fullWidth
                    name="productName"
                    className="mb-3"
                />
                <TextField
                    inputProps={{ ...register("description") }}
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
                        <CategoryTreeSelector onChange={(value) => {
                            if (typeof value === 'string' || typeof value === 'number') {
                                const valueInt = parseInt(value);
                                onChange(valueInt);
                            } else {
                                onChange(0);
                            }
                        }} inputProps={{ error: !!errors.categoryId, ref: ref }} fullWidth size="small" className="mb-4" categories={categories}
                        />
                    )}
                />

                {!hasVariants &&
                    <>
                        <Controller
                            name={"items.0.images"}
                            control={control}
                            render={({ field: { name, onChange, value } }) => (<>
                                <Typography className='text-xs font-bold mb-2'>Imagenes del producto</Typography>
                                <ProductItemImages name={name} onChange={onChange} />
                            </>)}
                        />
                        <CurrencyInput
                            className="w-full"
                            label="Precio"
                            fullWidth
                            name="items.0.price"
                            error={!!errors.items?.[0]?.price}
                            control={control}
                            prefix="AR$"
                        />
                    </>
                }
                {!hasVariants &&
                    <Box className="flex">
                        <Button size='small' className='my-4' startIcon={<FontAwesomeIcon icon={faBoxesPacking} />} variant="contained" color="primary" onClick={() => setHasVariants(true)}>
                            {'Incluir variantes'}
                        </Button>
                    </Box>
                }
                {hasVariants && <>
                    <Box className="flex">
                        <h1 className="text-xl font-semibold mt-4 mb-1">Variantes</h1>
                        {hasVariants &&
                            <Button className='my-4 ml-auto' size='small' startIcon={<FontAwesomeIcon icon={faTrash} />} variant="outlined" color="primary" onClick={() => clearItems()}>
                                {'Eliminar variantes'}
                            </Button>
                        }
                    </Box>
                    <FormControl fullWidth size='small' className="mt-4 mb-3">
                        <InputLabel htmlFor='variant-types' className="font-bold text-black">Tipos de variantes</InputLabel>
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
                                        const variant = variations.find((variation) => variation.id === value);
                                        return (
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
                                    <Checkbox checked={variantsSelected.find((variantSel) => variantSel === variationValue.id) ? true : false} className='mr-2' />
                                    <ListItemText primary={variationValue.name} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </>}
                {hasVariants && variantsSelected.length > 0 && fields.map((variant, itemIndex) => (
                    <div key={itemIndex} className="mt-2">
                        <Divider className='border border-t-green-500'><Chip size='small' variant='outlined' label={`Item #${itemIndex + 1}`}/></Divider>
                        {variations.filter((variation) => variantsSelected.find((variantSel) => variantSel === variation.id)).map((variant, variantTypeIndex) => (
                            <Box key={`${itemIndex}-${variant?.id}-${variant?.name}`} className="mt-1">
                                {
                                    variant?.id === COLOR_VARIANT_ID ?
                                        <Box className="flex items-center mb-4">
                                            <Typography className='pl-1 pr-4'>{variant?.name}{!!errors.items?.[itemIndex]?.variation?.[variantTypeIndex]! && <FontAwesomeIcon className='text-red-500' icon={faWarning} />}</Typography>
                                            <ColorPicker
                                                key={variantTypeIndex}
                                                name={`items.${itemIndex}.variation.${variantTypeIndex}`}
                                                inputProps={register(`items.${itemIndex}.variation.${variantTypeIndex}`)}
                                                error={!!errors.items?.[itemIndex]?.variation?.[variantTypeIndex]}
                                                onChange={(colorId) => {
                                                    setValue(`items.${itemIndex}.variation.${variantTypeIndex}`, colorId);
                                                }}
                                                variationOptions={getValuesByVariantId(variant?.id) || []}
                                                reloadVariations={() => {
                                                    getAllVariations().then((variations) => {
                                                        setVariations(variations);
                                                    });
                                                }}
                                            />
                                        </Box>
                                        :
                                        <Stack direction={'row'} className="mb-3">
                                            <FormControl variant="outlined" fullWidth size='small'>
                                                <InputLabel htmlFor={"variant-" + variantTypeIndex} className="font-bold text-black">{variant?.name}</InputLabel>
                                                <Select
                                                    defaultValue={""}
                                                    inputProps={{
                                                        id:`items.${itemIndex}.variation.${variantTypeIndex}`,
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
                                            {/*
                                            Add variation
                                            */}
                                            <Tooltip title="Agregar variante">
                                                <IconButton size='small' onClick={() => {
                                                    setVariationSelected({
                                                        itemIndex,
                                                        variantTypeIndex,
                                                        variation: variant
                                                    });
                                                    resetVariant();
                                                }}>
                                                    <FontAwesomeIcon icon={faPlusCircle} className='text-green-600' />
                                                </IconButton>
                                            </Tooltip>
                                        </Stack>
                                }
                            </Box>
                        ))}
                        <CurrencyInput
                            label="Precio"
                            fullWidth
                            name={`items.${itemIndex}.price`}
                            error={!!errors.items?.[itemIndex]?.price}
                            control={control}
                            prefix="AR$"
                        />
                        <Controller
                            name={`items.${itemIndex}.images`}
                            control={control}
                            render={({ field: { name, onChange, value } }) => (<>
                                <Typography className='text-xs font-bold my-2'>Imagenes del producto</Typography>
                                <ProductItemImages name={name} onChange={onChange} />
                            </>)}
                        />
                        {fields.length > 1 && (
                            <div className='flex justify-end align-center mb-1'>
                                <Button variant="outlined" color="error" size='small' onClick={() => remove(itemIndex)} className='my-2'>
                                    <FontAwesomeIcon icon={faTrash} className='mr-2' />
                                    <Typography component="span" fontSize={12}>Eliminar variante</Typography>
                                </Button>
                            </div>
                        )}
                    </div>
                ))}
                {hasVariants && variantsSelected.length > 0 &&
                    <div className='flex justify-center mt-4'>
                        <Button startIcon={<FontAwesomeIcon icon={faPlus}/>} variant="contained" color="primary" size='small' className='my-4 rounded-full bg-green-700' onClick={handleAddVariant}>
                            Agregar variante
                        </Button>
                    </div>
                }
                <Divider />
                <div className='flex justify-center mt-4'>
                    <Button startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary" type="submit" size='small' disabled={(hasVariants && variantsSelected.length <= 0)||isLoading}>
                        Crear Producto
                        {isLoading &&
                            <CircularProgress size={14} color="inherit" className='absolute left-1/2 text-slate-900'/>
                        }
                    </Button>
                </div>
            </form>
        </div>
    </>);
};


export default ProductForm;