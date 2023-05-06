import handlebars from "handlebars";
import document from "../views/document";
import section from "../views/section";
import blocks from "../views/blocks";
import previewDocument from "~/views/previewDocument";
import productionDocument from "~/views/productionDocument";

export type LayoutBlock = {
    uuid: string;
    blockId: string;
    data: any;
};

function renderHandlebar(layoutBlocks: LayoutBlock[]) {
    const start = Date.now();
    console.log("render");
    const innerHTML = layoutBlocks.reduce((acc, layoutBlock) => {
        const blockHbs = blocks.find(
            (block) => block.blockId === layoutBlock.blockId
        );
        const blockTemplate = handlebars.compile(blockHbs?.hbs);
        const blockHTML = blockTemplate(layoutBlock.data);

        const sectionTemplate = handlebars.compile(section);
        const sectionHTML = sectionTemplate({
            content: blockHTML,
            uuid: layoutBlock.uuid,
        });

        return `${acc}${sectionHTML}`;
    }, ``);

    const documentTemplate = handlebars.compile(document.hbs)({
        content: innerHTML,
    });

    const end = Date.now();
    console.log(`Execution time: ${end - start} ms`);

    return documentTemplate;
}

export const renderProduction = (layoutBlocks: LayoutBlock[]) => {
    const innerHTML = layoutBlocks.reduce((acc, layoutBlock) => {
        const blockHbs = blocks.find(
            (block) => block.blockId === layoutBlock.blockId
        );
        const blockTemplate = handlebars.compile(blockHbs?.hbs);
        const blockHTML = blockTemplate(layoutBlock.data);

        const sectionTemplate = handlebars.compile(section);
        const sectionHTML = sectionTemplate({
            content: blockHTML,
            uuid: layoutBlock.uuid,
        });

        return `${acc}${sectionHTML}`;
    }, ``);

    return handlebars.compile(productionDocument.hbs)({
        content: innerHTML,
    });
};

export const renderPreview = (hbs: string, defaultData: object) => {
    debugger;
    const preview = handlebars.compile(hbs)(defaultData);

    return handlebars.compile(previewDocument.hbs)({
        content: preview,
    });
};

export default renderHandlebar;
