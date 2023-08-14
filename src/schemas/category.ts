export type ProductCategoryDto = {
    id: number;
    name: string;
    parentId: number | null;
    parent: ProductCategoryDto | null;
    childrens?: ProductCategoryDto[];
};