import blocks from "../views/blocks";
import { BlockPreview } from "~/components/BlockPreview";
import { type LayoutBlock } from "~/utils/handlebars";

export const BlocksGallery = (props: {
    display: boolean;
    category: string;
    onPushBlock: (block: LayoutBlock) => void;
}) => {
    if (!props.display) return null;

    return (
        <div>
            <h5>Category: {props.category}</h5>
            <hr />
            {blocks.map((block) => {
                if (block.category === props.category) {
                    return (
                        <BlockPreview
                            key={block.name}
                            block={block}
                            onPushBlock={props.onPushBlock}
                        />
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};
