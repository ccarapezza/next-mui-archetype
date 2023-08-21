'use client'

export default function SkuComponent(props: { items: any, setSelectedOption: any, resultArray: any, variationState: any }) {

    const { setSelectedOption, resultArray, variationState } = props;

    return (
        <>
            {
                resultArray.map((group: any, i: number) => {
                    return (
                        <div key={i}>
                            <h3 >{group.variationName}</h3>
                            <ul className="flex items-center py-2">
                                {
                                    group.values?.map((option: any, i: number) => {
                                        return (
                                            <li key={i} className="mr-2">
                                                <label className="inline-flex items-center gap-4 cursor-pointer"
                                                    onClick={
                                                        () => {
                                                            const variationName = group.variationName;
                                                            setSelectedOption({
                                                                ...variationState, [variationName]: option
                                                            }
                                                            );
                                                        }
                                                    }
                                                >
                                                    {
                                                        group.variationName === 'Color' ?
                                                            <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${variationState[group.variationName] === option ? 'border-2 border-black' : ''}`}>
                                                                <div className='w-4 h-4 rounded-full border'
                                                                    style={{ backgroundColor: option }}
                                                                >
                                                                </div>
                                                            </div>
                                                            :
                                                            <div className={`flex items-center justify-center w-[50px] rounded-md border ${variationState[group.variationName] === option ? 'text-tertiary font-semibold border-black border-2' : 'text-gray border-gray'}`}>
                                                                {option}
                                                            </div>
                                                    }
                                                </label>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    )
                })
            }
        </>
    )
}