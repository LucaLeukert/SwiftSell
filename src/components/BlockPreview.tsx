import { type LayoutBlock } from "~/utils/handlebars";
import { v4 as uuid } from "uuid";
import { type Block } from "~/views/blocks";
import Image from "next/image";

export const BlockPreview = (props: {
    block: Block;
    onPushBlock: (block: LayoutBlock) => void;
}) => {
    return (
        <div className={`card-compact rounded-xl border pt-2 shadow-xl`}>
            <figure>
                <Image
                    src={props.block.previewImageUrl}
                    alt={props.block.name}
                    className="img-fluid mx-auto"
                    width={450}
                    height={300}
                />
            </figure>
            <div
                className="card-body"
                onClick={() => {
                    props.onPushBlock({
                        blockId: props.block.blockId,
                        uuid: uuid(),
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        data: props.block.defaultData,
                    });
                }}
            >
                <div className="flex items-center justify-between">
                    <h1 className="h-fit text-xl font-bold">
                        {props.block.name}
                    </h1>
                    <button className="btn-accent btn-sm btn shadow">
                        Add block
                    </button>
                </div>
            </div>
        </div>
    );
};
