export type VariationFilter = {
    key: string,
    value: string
}

export type FilterProduct = {
    category?: string | null,
    priceMin?: number | null,
    priceMax?: number | null,
    variations?: VariationFilter[]
}