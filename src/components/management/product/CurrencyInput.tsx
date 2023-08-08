import { InputAdornment, OutlinedInput, OutlinedInputProps, TextField } from "@mui/material"
import { ForwardedRef, forwardRef } from "react"
import { Control, Controller, FieldError, FieldErrorsImpl, Merge } from "react-hook-form"
import { NumericFormat } from 'react-number-format'
type CurrencyInputProps = {
    name: string
    error?: boolean | undefined
    control: Control<any, any> | undefined,
    prefix?: string,
    fullWidth?: boolean
}

interface ExtOutlinedInputProps extends OutlinedInputProps {
    customprefix: string;
    error?: boolean;
}

const CustomInput = forwardRef((props: ExtOutlinedInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    return <OutlinedInput
        ref={ref}
        autoComplete='off'
        size="small"
        startAdornment={<InputAdornment position="start">{props.customprefix}</InputAdornment>}
        {...props}
    />;
});
CustomInput.displayName = "CustomInput";

function CurrencyInput({ name, error, control, prefix, fullWidth }: CurrencyInputProps){
    return (
        <>
            <Controller               
                name={name}
                control={control}
                render={({ field: { ref, onChange, ...rest } }) => (
                    <NumericFormat
                        decimalSeparator=","
                        thousandSeparator="."
                        prefix=""
                        allowNegative={false}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        getInputRef={ref}
                        customInput={CustomInput}
                        customprefix={prefix || ""}
                        onValueChange={(values) => {
                            onChange(values.floatValue);
                        }}
                        error={error}
                        fullWidth={fullWidth}
                        {...rest}
                    />
                )}
            />
        </>
    )
}
CurrencyInput.displayName = "CurrencyInput";

export default CurrencyInput;