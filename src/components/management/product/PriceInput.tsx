import React from 'react';
import { OutlinedInput, OutlinedInputProps } from '@mui/material';
import CurrencyInput, { CurrencyInputProps } from 'react-currency-input-field';

interface ExtOutlinedInputProps extends OutlinedInputProps {
  sizeMaterial: "small" | "medium";
}

const CustomInput = (props: ExtOutlinedInputProps) => {
  const { sizeMaterial, ...outlinedProp } = props;
  
  return <OutlinedInput
      {...outlinedProp}
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
  ref?: any;
}

const PriceInput: React.FC<PriceInputProps> = ({
  value,
  onChangeEvent,
  ref,
  ...props
}) => {
  const handleChange = (
    value: string | undefined
  ) => {
    onChangeEvent(value?value:"0");
  };

  return (<CurrencyInput
      ref={ref}
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
