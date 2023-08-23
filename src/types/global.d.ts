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
}