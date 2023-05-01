import { type LayoutBlock } from "~/utils/handlebars";
import blocks from "~/views/blocks";
import { DebounceInput } from "react-debounce-input";

export const Inspector = (props: {
    layout: LayoutBlock[];
    display: boolean;
    layoutBlock: LayoutBlock | undefined;
    onChangeBlockData: (layoutBlock: LayoutBlock) => void;
}) => {
    if (!props.display) {
        return null;
    }

    if (props.layoutBlock === undefined) {
        return (
            <div className="text-center">
                First add and select block section
            </div>
        );
    }

    const config = blocks.find((block) => {
        if (!props.layoutBlock) return false;
        return block.blockId === props.layoutBlock.blockId;
    })?.config;

    if (!config) return null;

    return (
        <div>
            {Object.keys(config).map((key, index) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                const value = config[key] as unknown as {
                    name: string;
                    type: string;
                };

                if (value.type === "string") {
                    return (
                        <div className="form-group" key={index}>
                            <label>{value.name}</label>

                            <DebounceInput
                                debounceTimeout={500}
                                type="text"
                                className="form-control"
                                placeholder={value.name}
                                /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
                                value={props.layoutBlock?.data[key]}
                                onChange={(e) => {
                                    const layoutBlock = props.layoutBlock;
                                    if (!layoutBlock) return;

                                    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
                                    layoutBlock.data[key] = e.target.value;
                                    props.onChangeBlockData(layoutBlock);
                                }}
                            />
                        </div>
                    );
                } else if (value.type === "color") {
                    return (
                        <div className="form-group" key={index}>
                            <label>{value.name}</label>
                            <DebounceInput
                                debounceTimeout={500}
                                type="color"
                                className="form-control"
                                placeholder={value.name}
                                /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
                                value={props.layoutBlock?.data[key]}
                                onChange={(e) => {
                                    const layoutBlock = props.layoutBlock;
                                    if (!layoutBlock) return;

                                    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
                                    layoutBlock.data[key] = e.target.value;
                                    props.onChangeBlockData(layoutBlock);
                                }}
                            />
                        </div>
                    );
                } else if (value.type === "boolean") {
                    return (
                        <div className="form-check" key={index}>
                            <label>
                                <input
                                    type={"checkbox"}
                                    className="form-check-input"
                                    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
                                    value={props.layoutBlock?.data[key]}
                                    onChange={(e) => {
                                        const layoutBlock = props.layoutBlock;
                                        if (!layoutBlock) return;

                                        /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
                                        layoutBlock.data[key] = e.target.value;
                                        props.onChangeBlockData(layoutBlock);
                                    }}
                                />
                                {value.name}
                            </label>
                        </div>
                    );
                } else {
                    return null;
                }
            })}
        </div>
    );
};
