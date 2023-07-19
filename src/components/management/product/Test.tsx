import { InputAdornment, OutlinedInput, OutlinedInputProps } from "@mui/material";

export const Test = (props: OutlinedInputProps) => {
    return <OutlinedInput
        size='small'
        {...props}
    />;
};