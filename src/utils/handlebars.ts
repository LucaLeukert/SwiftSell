import handlebars from "handlebars";
import document from "../views/document";
import section from "../views/section";
import blocks from "../views/blocks";
import previewDocument from "~/views/previewDocument";

export type LayoutBlock = {
    uuid: string;
    blockId: string;
    data: any;
};

function renderHandlebar(layoutBlocks: LayoutBlock[]) {
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

    return handlebars.compile(document.hbs)({
        content: innerHTML,
    });
}

export const renderPreview = (hbs: string, defaultData: object) => {
    debugger;
    const preview = handlebars.compile(hbs)(defaultData);

    return handlebars.compile(previewDocument.hbs)({
        content: preview,
    });
};

export default renderHandlebar;
