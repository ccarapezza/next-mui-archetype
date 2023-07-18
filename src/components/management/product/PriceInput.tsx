import { InputAdornment, OutlinedInput, OutlinedInputProps, TextField } from '@mui/material';
import React, { useRef } from 'react';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';
import { CurrencyInputOnChangeValues } from 'react-currency-input-field/dist/components/CurrencyInputProps';

interface ExtOutlinedInputProps extends OutlinedInputProps {
  sizeMaterial: "small" | "medium";
}

const CustomInput = (props: ExtOutlinedInputProps) => {
  return <OutlinedInput
      {...props}
      size={props.sizeMaterial}
  />;
}

interface PriceInputProps extends CurrencyInputProps {
  value: number;
  onChangeEvent: (value: string) => void;
  inputProps?: {
    fullWidth?: boolean;
    startAdornment?: React.ReactNode;
    sizeMaterial: "small" | "medium";
  }
  
}

const PriceInput: React.FC<PriceInputProps> = ({
  value,
  onChangeEvent,
  ...props
}) => {
  const handleChange = (
    value: string | undefined
  ) => {
    onChangeEvent(value?value:"0");
  };

  const propInput = {
    ...props.inputProps,
    size: props.inputProps?.sizeMaterial,
  }

  return (<CurrencyInput
      customInput={CustomInput}
      value={value}
      onValueChange={handleChange}
      decimalSeparator=","
      groupSeparator="."
      prefix=""
      decimalScale={props.decimalScale || 2}
      disableGroupSeparators={false}
      {...props.inputProps}
  />);
};

export default PriceInput;
