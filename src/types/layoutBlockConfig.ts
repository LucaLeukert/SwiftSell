export type LayoutBlockConfig = {
    handlebars: string;
    name: string;
    blockId: string;
    previewImageUrl: string;
    category: string;
    defaultData: { [key: string]: string | number | boolean | object };
    config: { [key: string]: string | number | boolean | object };
};
