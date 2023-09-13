"use client"
import CurrencyInput from './CurrencyInput';
import CategoryTreeSelector from '../category/CategoryTreeSelector';
import ColorPicker from '../../client/ColorPicker';
import ProductItemImages from './ProductItemImages';
import LoadingBlocker from '@/components/client/LoadingBlocker';
import { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Divider, Chip, OutlinedInput, Box, Checkbox, ListItemText, Typography, IconButton, Dialog, DialogContent, DialogTitle, CircularProgress, Stack, Tooltip, DialogActions, Alert } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxesPacking, faClose, faPlus, faPlusCircle, faSave, faTrash, faWarning } from '@fortawesome/free-solid-svg-icons';
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProductDto, ProductInput, productInputSchema } from '../../../schemas/product';
import { ProductCategoryDto } from '@/schemas/category';
import { VariationDto } from '@/schemas/variation';
import { ItemVariationOptionDto, VariationOptionDto } from '@/schemas/variationOption';
import { useSnackbar } from 'notistack';
import { EditorState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Editor from '@/components/client/Editor';
import { convertToRaw, convertFromRaw } from 'draft-js';

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

const updateProductData = async (id: number, productData: any) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/product/${id}`, {
        method: 'PUT',
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

const ProductForm = ({ categories, variations: initialVariations, editProduct }: { categories: ProductCategoryDto[], variations: VariationDto[], editProduct?: ProductDto }) => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();
    const [hasVariants, setHasVariants] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [variations, setVariations] = useState<VariationDto[]>(initialVariations);
    const [variationSelected, setVariationSelected] = useState<VariationItemSelected|null>(null);

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        const savePromise = editProduct?updateProductData(editProduct.id, data):saveProductData(data);
        savePromise.then((response) => {
            router.push('/management/products');
            router.refresh();//Need to refresh the page to get the updated data
        }).catch((error) => {
            console.log("error", error);
            if(editProduct){
                enqueueSnackbar('Error al editar el producto', { variant: 'error' });
            }else{
                enqueueSnackbar('Error al crear el producto', { variant: 'error' });
            }
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

    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

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

    useEffect(() => {
        if(editProduct){
            setIsLoading(true);
            const variantsFinded = editProduct.items[0].variationOptions?.map((variationOption) => variationOption.id);

            const variants = variations.filter((variation) => {
                const finded = variation.variationOptions?.find((variationOption) => {
                    return variantsFinded?.find((variantId) => variantId === variationOption.id);
                });
                return finded;
            });

            const variantsIds = variants?.map((v) => v.id);
            if(editProduct.items.length>1){
                setVariantsSelected(variantsIds!);
                setHasVariants(true);
            }
            //set values to form
            reset({
                name: editProduct.name,
                description: editProduct.description,
                categoryId: editProduct.category.id,
                items: editProduct.items.map((item) => {
                    return {
                        id: item.id,
                        images: item.images?item.images:[],
                        variation: variantsFinded?variantsFinded.map((variantId, index) => {
                            return item.variationOptions?.find((variationOption) => {
                                return (variationOption as ItemVariationOptionDto).variation.id === variantId;
                            })?.id;
                        }):[],
                        price: item.price?item.price:0
                    }
                })
            });
            console.log(editProduct.items[0].variationOptions);
            setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(JSON.parse(editProduct.description)))));
            setIsLoading(false);
        }
    }, [editProduct, reset, variations]);

    return (<>
        {isLoading &&
            <LoadingBlocker />
        }
        <div className="max-w-screen-xl mx-auto bg-white p-4 rounded-md shadow-lg">
            <Box>
                {/*
                    <pre>{JSON.stringify(variations, null, 2)}</pre>
                */}
            </Box>
            {/*
                Add variant popup
            */}
            <Dialog open={variationSelected ? true : false} onClose={() => { setVariationSelected(null) }}>
                <form onSubmit={handleSubmitVariant(onSubmitVariant)} >
                    <DialogTitle className='flex justify-between'>
                        <Typography variant="h6" component="div">
                            Agregar {variationSelected?.variation.name}
                        </Typography>
                        <IconButton onClick={() => { setVariationSelected(null) }} className='text-gray-500'>
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
                            className="mb-3" />
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
                <Editor
                    editorState={editorState}
                    wrapperClassName={`mb-3 ${!!errors.description&&'border border-red-500 rounded-md'}`}
                    editorClassName="px-4 border-gray-300 border-l border-r border-b rounded-b-md"
                    toolbarClassName='border-gray-300 border-rounded m-0 rounded-t-md'
                    placeholder='Descripción del producto'
                    onEditorStateChange={(editorState) => {
                        setEditorState(editorState);
                        setValue("description", JSON.stringify(convertToRaw(editorState.getCurrentContent())));
                    }}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history'],
                        inline: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ['bold', 'italic', 'underline', 'strikethrough'],
                        },
                        blockType: {
                            inDropdown: true,
                            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                        }
                    }}
                />
                <textarea { ...register("description") } className='hidden' />
                <Controller
                    name={"categoryId"}
                    control={control}
                    render={({ field: { ref, onChange, ...rest } }) => (
                        <CategoryTreeSelector defaultValue={rest.value.toString()} onChange={(value) => {
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
                                <ProductItemImages name={name} onChange={onChange} defaultFiles={editProduct&&editProduct.items[0].imagesDetail} setLoading={setIsLoading}/>
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
                {!hasVariants && !editProduct &&
                    <Box className="flex">
                        <Button size='small' className='my-4' startIcon={<FontAwesomeIcon icon={faBoxesPacking} />} variant="contained" color="primary" onClick={() => setHasVariants(true)}>
                            {'Incluir variantes'}
                        </Button>
                    </Box>
                }
                {hasVariants && <>
                    <Box className="flex">
                        <h1 className="text-xl font-semibold mt-4 mb-1">Variantes</h1>
                        {hasVariants && !editProduct &&
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
                            disabled={!!editProduct}
                            classes={{
                                disabled: 'bg-gray-200 cursor-not-allowed'
                            }}
                            input={<OutlinedInput id="select-multiple-chip" label="Tipos de variantes" />}
                            renderValue={(value) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {value.map((idValue) => {
                                        const variant = variations.find((variation) => {
                                            return variation.id === idValue;
                                        });
                                        return (<>
                                            <Chip variant='outlined' size='small' key={`${variant?.id}-${variant?.name}-selected-variants`} label={variant?.name} />
                                        </>)
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
                        {!editProduct?
                            <Divider className='border border-t-green-500'><Chip variant='filled' color='primary' label={`Item #${itemIndex + 1}`} className='font-bold' /></Divider>
                        :
                        <>
                            {editProduct.items[itemIndex]?
                                <Divider className='border border-t-green-500'><Chip variant='filled' color='primary' label={`Item ID: ${editProduct.items[itemIndex].id}`} className='font-bold' /></Divider>
                            :
                                <Divider className='border border-t-green-500'><Chip variant='filled' color='primary' label={`New Item #${itemIndex + 1}`} className='font-bold' /></Divider>
                            }
                        </>
                        }
                        {editProduct&&<>
                            <Chip className={`text-sm mb-4 ${!editProduct.items[itemIndex]&&'bg-green-600 text-white'}`} label={
                                <Box className="flex">
                                    {editProduct.items[itemIndex]?
                                        <>
                                            <Typography className='text-sm font-bold mr-1'>SKU:</Typography>
                                            {`${editProduct.items[itemIndex].sku}`}
                                        </>
                                    :
                                        <>
                                            {`New Item !`}
                                        </>
                                    }
                                </Box>
                            } />
                        </>
                        }
                        <Box className={editProduct&&editProduct.items[itemIndex]&&"bg-gray-200 px-2 py-0.5 mb-4 rounded-md cursor-not-allowed"}>
                            {editProduct&&editProduct.items[itemIndex]&&
                                <Alert severity="warning" className='mt-2 mb-4 p-0 pl-2 pr-3 w-fit flex items-center'>
                                    <Typography className='text-xs font-bold'>Solo se puede editar los precios de items existentes</Typography>
                                </Alert>
                            }
                            {variations.filter((variation) => variantsSelected.find((idValue) => {
                                    const variant = variations.find((variation) => {
                                        return variation.id === idValue;
                                    });
                                    return variant?.id === variation.id;
                                })).map((variant, variantTypeIndex) => (
                                <Box key={`${itemIndex}-${variant?.id}-${variant?.name}`} className={`mt-1`}>
                                    {
                                        variant?.id === COLOR_VARIANT_ID ?
                                            <Box className="flex items-center mb-2 pb-2">
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
                                                    disabled={editProduct&&editProduct.items[itemIndex]?true:false}
                                                    initialColor={editProduct&&editProduct.items[itemIndex]?.variationOptions?.find((variationOption) => {
                                                        return (variationOption as ItemVariationOptionDto).variation.id === variant?.id;
                                                    })?.value}
                                                />
                                            </Box>
                                            :
                                            <Stack direction={'row'} className="mb-3">
                                                <FormControl variant="outlined" fullWidth size='small'>
                                                    <InputLabel htmlFor={"variant-" + variantTypeIndex} className="font-bold text-black">{variant?.name}</InputLabel>
                                                    <Select
                                                        defaultValue={(editProduct&&editProduct?.items[itemIndex])?editProduct?.items[itemIndex].variationOptions?.find((variationOption) =>{
                                                            return (variationOption as ItemVariationOptionDto).variation.id === variant?.id;
                                                        })?.id:''}
                                                        classes={{
                                                            disabled: 'bg-gray-200 cursor-not-allowed'
                                                        }}
                                                        inputProps={{
                                                            id: `items.${itemIndex}.variation.${variantTypeIndex}`,
                                                            ...register(`items.${itemIndex}.variation.${variantTypeIndex}`)
                                                        }}
                                                        disabled={!!editProduct?.items[itemIndex]}
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
                                                    <>
                                                        <IconButton size='small' disabled={!!editProduct?.items[itemIndex]} onClick={() => {
                                                            setVariationSelected({
                                                                itemIndex,
                                                                variantTypeIndex,
                                                                variation: variant
                                                            });
                                                            resetVariant();
                                                        }}>
                                                            <FontAwesomeIcon icon={faPlusCircle} className={!!editProduct?.items[itemIndex]?'text-gray-400':'text-green-500'} />
                                                        </IconButton>
                                                    </>
                                                </Tooltip>
                                            </Stack>
                                    }
                                </Box>
                            ))}
                        </Box>
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
                                <ProductItemImages name={name} onChange={onChange} defaultFiles={editProduct&&editProduct.items[itemIndex]&&editProduct.items[itemIndex].imagesDetail} setLoading={setIsLoading}/>
                            </>)}
                        />
                        {fields.length > 1 && !editProduct && (
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
                        <Button startIcon={<FontAwesomeIcon icon={faPlus} />} variant="contained" color="primary" size='small' className='my-4 rounded-full bg-green-700' onClick={handleAddVariant}>
                            Agregar variante
                        </Button>
                    </div>
                }
                <Divider />
                <div className='flex justify-center mt-4'>
                    <Button startIcon={<FontAwesomeIcon icon={faSave} />} variant="contained" color="primary" type="submit" size='small' disabled={(hasVariants && variantsSelected.length <= 0) || isLoading}>
                        Guardar Producto
                        {isLoading &&
                            <CircularProgress size={14} color="inherit" className='absolute left-1/2 text-slate-900' />
                        }
                    </Button>
                </div>
            </form>
        </div>
    </>);
};


export default ProductForm;