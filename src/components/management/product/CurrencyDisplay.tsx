import { NumericFormat, NumericFormatProps } from 'react-number-format'
import { use, useEffect, useRef, useState } from 'react';

const CurrencyDisplay = (props: NumericFormatProps) => {
    const ref = useRef<HTMLInputElement>();
    const [value, setValue] = useState(ref.current?.value);
    useEffect(() => {
        setValue(ref.current?.value);
    }, [ref.current?.value]);
    return (<>
        <span className={`bg-transparent w-fit ${props.className}`}>{value}</span>
        <NumericFormat
            decimalSeparator=","
            thousandSeparator="."
            allowNegative={false}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={props.prefix || "AR$ "}
            {...props}
            className={'hidden'}
            getInputRef={ref}
        />
    </>)
}

export default CurrencyDisplay;