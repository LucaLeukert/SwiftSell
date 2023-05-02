import header1 from "~/views/blocks/header1";
import gallery from "~/views/blocks/gallery";
import article1 from "~/views/blocks/article1";
import article2 from "~/views/blocks/article2";

const blocks = [header1, gallery, article1, article2];

export type Block = {
    hbs: string;
    name: string;
    blockId: string;
    previewImageUrl: string;
    category: string;
    defaultData: any;
    config: any;
};

export default blocks;
