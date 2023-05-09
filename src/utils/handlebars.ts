import handlebars from "handlebars";
import document from "../views/document";
import section from "../views/section";
import blocks from "../views/blocks";
import productionDocument from "~/views/productionDocument";
import { type LayoutBlock } from "~/types/layoutBlock";

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

    const documentTemplate = handlebars.compile(document.hbs)({
        content: innerHTML,
    });

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

export default renderHandlebar;
