'use client'
import { ProductDto } from '@/schemas/product';
import { faBoxesPacking, faSearch, faTag } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Autocomplete, Box, TextField, Typography, Chip, Tooltip } from '@mui/material'
import { useDebounce } from '@uidotdev/usehooks';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

const searchApiProducts = async (q: string, page: number = 1, size: number = 10) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/product/search?q=${q}&page=${page}&size=${size}`);
    return res.json();
};

function ProductSelector({onSelectProduct, selectedProductsIds, label}: {onSelectProduct: (product: ProductDto) => void, selectedProductsIds: number[], label?: string | null | undefined}) {
    const [searchTerm, setSearchTerm] = useState<string | null>(null);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [searchResults, setSearchResults] = useState<{ totalItems: number, rows: ProductDto[], totalPages: number, currentPage: number }>({ totalItems: 0, rows: [], totalPages: 0, currentPage: 0 });
    
    //create debounce state
    const [loading, setLoading] = useState(false);

    const searchProducts = async (query: string) => {
        setLoading(true);
        setSearchResults(await searchApiProducts(query));
        setLoading(false);
    }

    const clearSearchResults = () => {
        setSearchResults({ totalItems: 0, rows: [], totalPages: 0, currentPage: 0 });
        setSearchTerm("");
    }

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);       
    };

    const onClose = () => {
        clearSearchResults();
    }

    const handleOptionChange = (event: React.ChangeEvent<{}>, option: ProductDto | null) => {
        console.log("option", option);
        onSelectProduct(option!);
    }

    useEffect(() => {
        if (debouncedSearchTerm && debouncedSearchTerm.length > 3) {
            searchProducts(debouncedSearchTerm)
        } else {
            clearSearchResults();
        }
    }, [debouncedSearchTerm]);

    return (<>
        <Autocomplete
            fullWidth
            blurOnSelect
            options={searchResults.rows}
            getOptionLabel={(option) => option?.name}
            value={null}
            filterSelectedOptions
            loading={loading}
            filterOptions={(x) => x}
            onClose={onClose}
            noOptionsText="No se encontraron resultados"
            onChange={handleOptionChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label?label:'Buscar producto'}
                    size='small'
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className='px-0'
                    InputProps={{
                        ...params.InputProps,
                        value: searchTerm,
                        startAdornment: <FontAwesomeIcon icon={faBoxesPacking} spin={loading} className={`text-gray-500 ${loading ? 'text-slate-300': ''}`} />,
                        endAdornment: <FontAwesomeIcon icon={faSearch} className='text-gray-500' />,
                        className: 'px-4'
                    }}
                />
            )}
            renderOption={(props, option) => (
                <Tooltip title={selectedProductsIds.includes(option.id)&&"Producto ya incluido"} followCursor >
                    <Box component="li" {...props} className={`m-0 p-2 rounded-sm ${selectedProductsIds.includes(option.id)?' opacity-25 cursor-not-allowed':' cursor-pointer'}`}>
                        <Box className="flex flex-row content-center items-center gap-2 p-2 rounded border border-transparent hover:border-slate-200 hover:shadow-md">
                            <Image
                                src={option?.items[0]?.images?.[0]}
                                width={32}
                                height={32}
                                alt={option.name}
                                className='rounded-md'
                                />
                            <Box className="w-full flex flex-row justify-between items-center">
                                <Chip label={`#${option.id}`} />
                                <Typography variant="body1">{option.name}</Typography>
                                <Chip variant='outlined' icon={<FontAwesomeIcon icon={faTag} className='pl-2'/>} label={option.category?.name} />
                            </Box>
                        </Box>
                    </Box>
                </Tooltip>
            )}
        />
    </>);
}

export default ProductSelector