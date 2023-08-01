import { NumericFormat, NumericFormatProps } from 'react-number-format'

const PriceFormatting = (props: NumericFormatProps) => {
    return (
        <NumericFormat
            decimalSeparator=","
            thousandSeparator="."
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale={true}
            displayType="text"
            prefix={props.prefix || "$ "}
            {...props}
        />
    )
}

export default PriceFormatting;