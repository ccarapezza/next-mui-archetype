import React, { forwardRef, useRef } from 'react';
import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { UseFormRegisterReturn } from 'react-hook-form';

interface ExtOutlinedInputProps extends OutlinedInputProps {
    sizeMaterial: "small" | "medium";
}

const CustomInput = forwardRef((props: ExtOutlinedInputProps, ref) => {
    const { sizeMaterial, ...outlinedProp } = props;
    console.log("OutlinedInput", outlinedProp);
    return <OutlinedInput
        autoComplete='off'
        ref={ref}
        size={sizeMaterial}
        {...outlinedProp}
    />;
});

interface PriceInputProps extends CurrencyInputProps {
    value?: number;
    onChangeEvent?: (value: string) => void;
    error?: boolean;
    inputProps?: {
        fullWidth?: boolean;
        startAdornment?: React.ReactNode;
        className?: string;
        sizeMaterial: "small" | "medium";
        error?: boolean;
    }
}

const PriceInput: React.FC<PriceInputProps> = ({
    value,
    onChangeEvent,
    error,
    ...props
}) => {

    return (<CurrencyInput
        customInput={CustomInput}
        decimalSeparator=","
        groupSeparator="."
        prefix=""
        allowNegativeValue={false}
        decimalScale={props.decimalScale || 2}
        disableGroupSeparators={false}
        {...props.inputProps}
    />);
};

export default PriceInput;
