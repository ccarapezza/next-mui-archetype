'use client'
import { VariationOptionDto } from '@/schemas/variationOption';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Stack, Switch, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { CirclePicker, SketchPicker } from 'react-color'

interface ColorPickerProps {
    name?: string,
    initialColor?: string,
    onChange?: (color: any) => void,
    ref?: any,
    inputProps?: any,
    className?: string,
    variationOptions?: VariationOptionDto[],
    error?: boolean
}

export default function ColorPicker({name, initialColor, onChange, ref, inputProps, className, variationOptions, error }: ColorPickerProps) {
    const [advanceMode, setAdvanceMode] = useState<any>(false)
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false)
    const [color, setColor] = useState<any>(initialColor?initialColor:"#fff");
    const [colors, setColors] = useState<any>();

    useEffect(() => {
        if (variationOptions) {
            let colors: any = [];
            variationOptions.forEach((variationOption: VariationOptionDto) => {
                colors.push(variationOption.value)
            })
            setColors(colors);
        }
    }, [variationOptions])

    useEffect(() => {
        const variantOptionId = getVariantIdByColor(color);
        if(onChange){
            onChange(variantOptionId);
        }
    }, [color])

    const getVariantIdByColor = (color: string) => {
        let variantId: number = 0;
        variationOptions?.forEach((variationOption: VariationOptionDto) => {
            if (variationOption.value === color) {
                variantId = variationOption.id;
            }
        })
        return variantId?variantId:null;
    }

    const handleClick = () => {
        setDisplayColorPicker(true);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (color: any) => {
        setColor(color.hex)
        if(onChange){
            onChange(color.hex);
        }
    };

    return (
        <Box className={className?className:""+(error!&&' border-red-500 border-2 rounded-full')}>
            <input type='hidden' value={getVariantIdByColor(color)} {...inputProps} />
            <Box className="rounded-full shadow-md w-fit bg-white border cursor-pointer" onClick={handleClick}>
                <Box className="w-10 h-10 rounded-full" style={{ backgroundColor: color }}/>
            </Box>
            
            {displayColorPicker ?
                <Box className="absolute mt-2 ml-2 mb-10 z-10 bg-white border border-grey-500 rounded-md box-content shadow-lg">
                    <div className='fixed top-0 right-0 bottom-0 left-0' onClick={handleClose} />
                    <div className='w-full flex justify-end'>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant='subtitle2'>{advanceMode?"Basic mode":"Advance mode"}</Typography>
                            <Switch size='small' defaultChecked onClick={() => { setAdvanceMode(!advanceMode) }} />
                        </Stack>
                    </div>
                    {advanceMode ?
                        <SketchPicker presetColors={colors} color={color} onChange={handleChange} />
                        :
                        <CirclePicker colors={colors} color={color} onChange={handleChange} className='mr-0 pt-4 pl-4 bg-white border border-grey-500 rounded-md box-content shadow-lg' />
                    }
                </Box>
                :
                null
            }

        </Box>
    )
}