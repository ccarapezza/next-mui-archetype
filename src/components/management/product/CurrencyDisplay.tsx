import { NumericFormat, NumericFormatProps } from 'react-number-format'

const CurrencyDisplay = (props: NumericFormatProps) => {
    return (
        <NumericFormat
            decimalSeparator=","
            thousandSeparator="."
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={props.prefix || "AR$ "}
            {...props}
            className={'bg-transparent '+props.className || ''}
        />
    )
}

export default CurrencyDisplay;