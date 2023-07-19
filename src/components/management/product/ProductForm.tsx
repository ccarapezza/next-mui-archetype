"use client"
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Divider, InputAdornment, Alert, Chip } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PriceInput from './PriceInput';
import { useForm, useFieldArray } from "react-hook-form";

interface ProductVariant {
    type: string;
    value: string;
    price: number;
}

interface ProductFormState {
    productName: string;
    productDescription: string;
    productPrice: number;
    variants: ProductVariant[];
    variantTypes: string[];
    variantValues: Record<string, string[]>;
    hasVariants: boolean;
}

const ProductForm: React.FC = () => {
    const [state, setState] = useState<ProductFormState>({
        productName: '',
        productDescription: '',
        productPrice: 0,
        variants: [],
        variantTypes: ['Talle', 'Color'], // Ejemplo de opciones de tipos de variantes
        variantValues: {
            Talle: ['S', 'M', 'L'], // Ejemplo de opciones de valores para cada tipo de variante
            Color: ['Rojo', 'Azul', 'Verde'],
        },
        hasVariants: false,
    });

    const { register, control, handleSubmit, reset, watch } = useForm({
        defaultValues: {
            test: [{
                firstName: "Bill",
                lastName: "Luo"
            }]
        }
    });

    const handleChange = (name: string, value: unknown) => {
        setState((prevState) => ({
            ...prevState,
            [name || '']: value,
        }));
    };

    const handleAddVariant = () => {
        setState((prevState) => ({
            ...prevState,
            variants: [...prevState.variants, { type: '', value: '', price: 0 }],
            hasVariants: true,
        }));
    };

    const handleVariantChange = (index: number, name: string | null, value?: string) => {
        setState((prevState) => {
            const updatedVariants = [...prevState.variants];
            updatedVariants[index] = {
                ...updatedVariants[index],
                [name || '']: value,
            };
            return { ...prevState, variants: updatedVariants };
        });
    };

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { productName, productDescription, productPrice, variants } = state;

        const newProduct = {
            name: productName,
            description: productDescription,
            price: productPrice,
            variants,
        };

        try {
            console.log('Producto creado:', newProduct);
        } catch (error) {
            console.error('Error al crear el producto:', error);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-4 rounded-md shadow-lg">
            <h1 className="text-xl font-semibold mb-4">Crear nuevo producto</h1>
            <form onSubmit={handleFormSubmit}>
                <TextField
                    size='small'
                    label="Nombre del producto"
                    variant="outlined"
                    fullWidth
                    value={state.productName}
                    name="productName"
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className="mb-3"
                />
                <TextField
                    size='small'
                    label="Descripción del producto"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={state.productDescription}
                    name="productDescription"
                    onChange={(e) => handleChange(e.target.name, e.target.value)}
                    className="mb-3"
                />
                {state.hasVariants ? (
                    <Alert severity="warning" >
                        El precio principal está inhabilitado debido a que hay variantes.
                    </Alert>
                ) : (
                    <PriceInput
                        inputProps={{
                            startAdornment: <InputAdornment position="start">AR$</InputAdornment>,
                            sizeMaterial: 'small',
                            fullWidth: true
                        }}
                        value={state.productPrice}
                        name="productPrice"
                        onChangeEvent={(value: string) => {
                            handleChange('productPrice', value);
                        }}
                        className="mb-3"
                    />
                )}
                <Button className='my-4' startIcon={<FontAwesomeIcon icon={faPlus} />} variant="contained" color="primary" onClick={handleAddVariant}>
                    {state.hasVariants ? 'Agregar otra variante' : 'Incluir variantes'}
                </Button>
                {state.hasVariants && 
                    <h1 className="text-xl font-semibold mb-4">Variantes</h1>
                }
                {state.variants.map((variant, index) => (
                    <div key={index} className="mt-4">
                        <Divider><Chip label={`Variante #${index+1}`} className='mb-2 mt-4'/></Divider>
                        <FormControl variant="outlined" fullWidth size='small' className="mb-3">
                            <InputLabel>Tipo de variante</InputLabel>
                            <Select
                                size='small'
                                value={variant.type}
                                onChange={(e) => {
                                    handleVariantChange(index, "value", "");
                                    handleVariantChange(index, e?.target?.name, e?.target?.value);
                                }}
                                name="type"
                                label="Tipo de variante"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {state.variantTypes.map((type, typeIndex) => (
                                    <MenuItem key={typeIndex} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" fullWidth size='small' className="mb-3">
                            <InputLabel>Valor de la variante</InputLabel>
                            <Select
                                size='small'
                                value={variant.value}
                                onChange={(e) => handleVariantChange(index, e?.target?.name, e?.target?.value)}
                                disabled={!variant.type}
                                name="value"
                                label="Valor de la variante"
                                variant='outlined'
                                classes={{ disabled: 'bg-gray-200' }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {state.variantValues[variant.type]?.map((value, valueIndex) => (
                                    <MenuItem key={valueIndex} value={value}>
                                        {value}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <PriceInput
                            inputProps={{
                                startAdornment: <InputAdornment position="start">AR$</InputAdornment>,
                                sizeMaterial: 'small',
                                fullWidth: true
                            }}
                            value={variant.price}
                            name="price"
                            onChangeEvent={(value: string) => {
                                handleVariantChange(index, "price", value);
                            }}
                        />
                    </div>
                ))}
                <Divider />
                <div className='flex justify-center mt-4'>
                    <Button variant="contained" color="primary" type="submit">
                        Crear Producto
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
