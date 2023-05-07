import { DebounceInput } from "react-debounce-input";
import blocks from "~/views/blocks";
import React, { useState } from "react";
import { BlockPreview } from "~/components/BlockPreview";

import { LayoutBlock } from "~/types/layoutBlock";

export const BlockSearch = (props: {
    display: boolean;
    onPushBlock: (block: LayoutBlock) => void;
}) => {
    const [search, setSearch] = useState("");

    if (!props.display) return null;

    return (
        <div className="flex h-full w-full flex-col px-2 pb-2">
            <DebounceInput
                debounceTimeout={500}
                type="text"
                className="input-bordered input mt-4 h-12 w-full shrink-0 bg-slate-100 text-slate-700 shadow"
                placeholder="Suche nach einem Block"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
            />
            <div className="divider"></div>

            <div className="flex flex-col gap-5 overflow-y-scroll pr-2 scrollbar scrollbar-track-gray-100 scrollbar-thumb-slate-500 scrollbar-thumb-rounded">
                {blocks
                    .filter((block) => {
                        if (block.name.includes(search)) return true;
                    })
                    .map((block) => {
                        return (
                            <BlockPreview
                                key={block.name}
                                block={block}
                                onPushBlock={props.onPushBlock}
                            />
                        );
                    })}
            </div>
        </div>
    );
};
