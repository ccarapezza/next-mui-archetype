'use client'
import { VariationOptionDto } from '@/schemas/variationOption';
import { faWarning } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Stack, Switch, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react'
import { CirclePicker, SketchPicker } from 'react-color'
import LoadingBlocker from './LoadingBlocker';

const COLOR_VARIATION_ID = 2;

interface ColorPickerProps {
    name?: string,
    initialColor?: string,
    onChange?: (color: any) => void,
    ref?: any,
    inputProps?: any,
    className?: string,
    variationOptions?: VariationOptionDto[],
    error?: boolean,
    reloadVariations?: Function,
    disabled?: boolean
}

const saveVariantOption = async (value: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_ENDPOINT}/api/management/variationOption`, {
        method: 'POST',
        body: JSON.stringify({
            variationId: COLOR_VARIATION_ID,
            value: value
        }),
    });
    if (!res.ok) {
        throw new Error("Error creando la variante...");
    }
    return res.json();
};

export default function ColorPicker({ initialColor, name, onChange, inputProps, className, variationOptions, error, reloadVariations, disabled }: ColorPickerProps) {
    const [advanceMode, setAdvanceMode] = useState<any>(false)
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false)
    const [color, setColor] = useState<any>(initialColor?initialColor:variationOptions?.[0]?.value?variationOptions?.[0]?.value:"#ffffff");
    const [colors, setColors] = useState<any>();
    const [newColor, setNewColor] = useState<any>();
    const { enqueueSnackbar } = useSnackbar();

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
        const getVariantIdByColor = (color: string) => {
            let variantId: number = 0;
            variationOptions?.forEach((variationOption: VariationOptionDto) => {
                const castedValue = parseInt(variationOption.value.replace("#",""), 16);
                const castedColorValue = parseInt(color.replace("#",""), 16);
                if (castedValue === castedColorValue) {
                    variantId = variationOption.id;
                }
            })
            console.log("Selected", variantId?variantId:null);
            return variantId?variantId:null;
        }
        if(variationOptions?.length!>0){
            const variantOptionId = color?getVariantIdByColor(color):variationOptions?.[0].id;
            if(onChange){
                onChange(variantOptionId);
            }
            if (hiddenInputRef.current) {
                hiddenInputRef.current.value = variantOptionId?variantOptionId.toString():"";
            }
        }
    }, [color,variationOptions,onChange])

    const handleClick = () => {
        setDisplayColorPicker(true);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleChange = (color: any) => {
        setColor(color.hex)
    };

    const handleNewChange = (color: any) => {
        setNewColor(color.hex)
    };

    const hiddenInputRef = useRef<HTMLInputElement | null>(null)
    const [loading, setLoading] = useState<boolean>(false);

    const saveNewColor = async () => {
        if (newColor) {
            setLoading(true);
            saveVariantOption(newColor).then((data) => {
                if(reloadVariations){
                    reloadVariations();
                }
            }).then(() => {
                setAdvanceMode(false);
                setColor(newColor);
            }).catch((error) => {
                enqueueSnackbar("Error guardando el color", { variant: 'error' });
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    return (<>
        <Box className={className?className:""+(error!&&' border-red-500 border-2 rounded-full')}>
            {loading &&
                <LoadingBlocker/>
            }
            <Box className={`rounded-full shadow-md w-fit bg-white border ${disabled?'cursor-not-allowed':'cursor-pointer'}`} onClick={disabled?undefined:handleClick}>
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
                        <div className="bg-white-500 text-center">
                            <SketchPicker presetColors={[]} color={newColor} onChange={handleNewChange} />
                            <Button size='small' variant='contained' onClick={() => { saveNewColor() }} autoFocus className='m-2'>
                                Guardar Color
                            </Button>
                        </div>
                        :
                        <CirclePicker colors={colors} color={color} onChange={handleChange} className='mr-0 pt-4 pl-4 bg-white border border-grey-500 rounded-md box-content shadow-lg' />
                    }
                </Box>
                :
                null
            }

        </Box>
    </>)
}