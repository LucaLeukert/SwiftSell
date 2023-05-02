import { type LayoutBlock } from "~/utils/handlebars";
import blocks from "~/views/blocks";
import { DebounceInput } from "react-debounce-input";
import React from "react";

export const Inspector = (props: {
    display: boolean;
    currentBlock: LayoutBlock | undefined;
    onChangeBlockData: (action: {
        uuid: string;
        key: string;
        value: object | string | number | boolean;
    }) => void;
    onDeleteBlock: (layoutBlock?: LayoutBlock) => void;
}) => {
    if (!props.display) {
        return null;
    }

    if (props.currentBlock === undefined) {
        return (
            <div className="text-center">
                First add and select block section
            </div>
        );
    }

    const config = blocks.find((block) => {
        if (!props.currentBlock) return false;
        return block.blockId === props.currentBlock.blockId;
    })?.config;

    if (!config) return null;

    return (
        <div className="flex h-full flex-col overflow-y-scroll p-2 pt-4 scrollbar scrollbar-track-gray-100 scrollbar-thumb-slate-500 scrollbar-thumb-rounded">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Inspector</h1>
                <button
                    className="btn-outline-danger btn-sm btn"
                    onClick={() => props.onDeleteBlock(props.currentBlock)}
                >
                    Delete block
                </button>
            </div>

            <div className="divider"></div>

            <div className="flex flex-col gap-2">
                {Object.keys(config).map((key, index) => {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const value = config[key] as unknown as {
                        name: "string" | "color" | "boolean";
                        type: string | boolean;
                    };

                    if (value.type === "string") {
                        return (
                            <div className="form-group" key={index}>
                                <label>{value.name}</label>

                                <DebounceInput
                                    debounceTimeout={200}
                                    type="text"
                                    className="input-bordered input w-full bg-slate-100 text-slate-700 shadow"
                                    placeholder={value.name}
                                    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
                                    value={props.currentBlock?.data[key]}
                                    onChange={(e) => {
                                        props.onChangeBlockData({
                                            uuid:
                                                props.currentBlock?.uuid ?? "",
                                            key,
                                            value: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        );
                    } else if (value.type === "color") {
                        return (
                            <div className="form-group" key={index}>
                                <label>{value.name}</label>
                                <DebounceInput
                                    debounceTimeout={200}
                                    type="color"
                                    className="input-bordered input w-full bg-slate-100 text-slate-700 shadow"
                                    placeholder={value.name}
                                    /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
                                    value={props.currentBlock?.data[key]}
                                    onChange={(e) => {
                                        props.onChangeBlockData({
                                            uuid:
                                                props.currentBlock?.uuid ?? "",
                                            key,
                                            value: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        );
                    } else if (value.type === "boolean") {
                        return (
                            <div className="form-check" key={index}>
                                <label>
                                    <input
                                        type="checkbox"
                                        className="checkbox"
                                        /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
                                        value={props.currentBlock?.data[key]}
                                        onChange={(e) => {
                                            props.onChangeBlockData({
                                                uuid:
                                                    props.currentBlock?.uuid ??
                                                    "",
                                                key,
                                                value: e.target.value,
                                            });
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
        </div>
    );
};
