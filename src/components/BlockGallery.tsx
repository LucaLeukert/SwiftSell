import blocks from "../views/blocks";
import { BlockPreview } from "~/components/BlockPreview";

import { type LayoutBlock } from "~/types/layoutBlock";

export const BlocksGallery = (props: {
    display: boolean;
    category: string;
    onPushBlock: (block: LayoutBlock) => void;
}) => {
    if (!props.display) return null;

    return (
        <div className="h-full max-h-full overflow-y-scroll scrollbar scrollbar-track-gray-100 scrollbar-thumb-slate-500 scrollbar-thumb-rounded">
            <div className="flex h-14 items-center">
                <h1 className="h-fit w-full text-center text-2xl font-bold">
                    {props.category}
                </h1>
            </div>
            <div className="divider mt-0"></div>
            <div className="flex flex-col gap-5">
                {blocks.map((block, index) => {
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
        </div>
    );
};
