import { type LayoutBlock } from "~/utils/handlebars";
import { v4 as uuid } from "uuid";
import { type Block } from "~/views/blocks";

export const BlockPreview = (props: {
    block: Block;
    onPushBlock: (block: LayoutBlock) => void;
}) => {
    /*const [handlebar] = useState(
        renderPreview(props.block.hbs, props.block.defaultData)
    );*/

    return (
        <div className="block-entry card card-body mb-2 p-2 shadow-lg">
            <img
                src={props.block.previewImageUrl}
                alt={props.block.name}
                className="img-fluid"
            />
            {/*<iframe srcDoc={handlebar} />*/}
            <div
                className="prompt"
                onClick={() => {
                    props.onPushBlock({
                        blockId: props.block.blockId,
                        uuid: uuid(),
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        data: props.block.defaultData,
                    });
                }}
            >
                <div className="prompt-inside">
                    <div>{props.block.name}</div>
                    <button className="btn-outline-light btn-sm btn m-2">
                        Add block
                    </button>
                </div>
            </div>
        </div>
    );
};
