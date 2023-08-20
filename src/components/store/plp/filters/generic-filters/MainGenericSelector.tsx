'use client'
import GenericSelector from "./GenericSelector";

export default function MainGenericSelector(props: { filters: any, setFilters: any, varationsDTO: any }) {

    const { filters, setFilters, varationsDTO } = props;

    return (
        <>
            {
                varationsDTO.map((variation: any, i: number) => {
                    return (
                        <GenericSelector key={i} variation={variation} filters={filters} setFilters={setFilters} />
                    )
                })
            }
        </>
    )
}