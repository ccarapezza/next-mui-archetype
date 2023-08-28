export { };

declare global {

    interface TemplateDto {
        id: number;
        name: string;
        template: string;
    }

    interface CustomAction {
        icon: IconProp,
        action: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, row: any) => void,
        title: string,
        show: (row: any) => boolean
    }

    interface ProductImageFile {
        itemIndex: number,
        file: File,
        key: string
    }
}