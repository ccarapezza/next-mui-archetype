'use client'
import { Box, Stack, Switch, Typography } from '@mui/material';
import React, { useState } from 'react'
import { CirclePicker, SketchPicker } from 'react-color'

interface ColorPickerProps {
    name?: string,
    initialColor?: string,
    onChange?: (color: any) => void,
    ref?: any,
    inputProps?: any,
    className?: string
}

export default function ColorPicker({name, initialColor, onChange, ref, inputProps, className }: ColorPickerProps) {
    const [advanceMode, setAdvanceMode] = useState<any>(false)
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false)
    const [color, setColor] = useState<any>(initialColor?initialColor:"#fff");

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
        <Box className={className}>
            <input type='hidden' value={color} {...inputProps} />
            <Box className="rounded-full shadow-md w-fit bg-white border cursor-pointer" onClick={handleClick}>
                <Box className="w-10 h-10 rounded-full" style={{ backgroundColor: color }}/>
            </Box>
            {displayColorPicker ?
                <Box className="absolute mt-2 ml-2 z-10 bg-white border border-grey-500 rounded-md box-content shadow-lg">
                    <div className='fixed top-0 right-0 bottom-0 left-0' onClick={handleClose} />
                    <div className='w-full flex justify-end'>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography variant='subtitle2'>{advanceMode?"Basic mode":"Advance mode"}</Typography>
                            <Switch size='small' defaultChecked onClick={() => { setAdvanceMode(!advanceMode) }} />
                        </Stack>
                    </div>
                    {advanceMode ?
                        <SketchPicker color={color} onChange={handleChange} />
                        :
                        <CirclePicker color={color} onChange={handleChange} className='mr-0 pt-4 pl-4 bg-white border border-grey-500 rounded-md box-content shadow-lg' />
                    }
                </Box>
                :
                null
            }

        </Box>
    )
}