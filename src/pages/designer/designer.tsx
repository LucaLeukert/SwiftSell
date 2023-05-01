import { NarrowSidebar } from "~/components/NarrowSidebar";
import { Inspector } from "~/components/Inspector";
import { BlocksGallery } from "~/components/BlockGallery";
import React, { useEffect, useState } from "react";
import renderHandlebar, { type LayoutBlock } from "~/utils/handlebars";

export const Designer = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [layoutBlocks, setLayoutBlocks] = useState<LayoutBlock[]>([]);
    const [selectedLayoutBlock, setSelectedLayoutBlock] =
        useState<LayoutBlock>();
    const [renderedLayout, setRenderedLayout] = useState<string>();

    useEffect(() => {
        if (!layoutBlocks) return;
        setRenderedLayout(renderHandlebar(layoutBlocks));
    }, [layoutBlocks]);

    let handleMessage = (
        event: MessageEvent<{
            event: string;
            newOrder?: string[];
            blockId?: string;
        }>
    ) => {
        if (event.data.event) {
            console.log(layoutBlocks);
            if (event.data.blockId && event.data.event === "click") {
                setActiveTab(0);
                const block = layoutBlocks.find(
                    (block) => block.uuid === event.data.blockId
                );
                if (!block) return console.error("Block not found");
                setSelectedLayoutBlock(block);
            } else if (event.data.newOrder && event.data.event === "sorted") {
                if (!layoutBlocks) return console.error("No layout blocks");
                handleRelayout(event.data.newOrder);
            }
        }
    };

    handleMessage = handleMessage.bind(this);

    let handleRelayout = (newOrder: string[]) => {
        if (!layoutBlocks) return console.error("No layout blocks");

        const newBlocksLayout: LayoutBlock[] = [];
        newOrder.forEach((blockUuid) => {
            const block = layoutBlocks.find((block) => {
                return block.uuid === blockUuid;
            });
            if (!block) return console.error("Block not found");

            newBlocksLayout.push(block);
        });
        setLayoutBlocks(newBlocksLayout);
    };

    handleRelayout = handleRelayout.bind(this);

    useEffect(() => {
        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, [layoutBlocks]);

    return (
        <div className="flex h-screen w-full flex-row">
            <NarrowSidebar
                activeTab={activeTab}
                onChangeActiveTab={setActiveTab}
            />

            <div className="h-full w-[400px]">
                <Inspector
                    layout={layoutBlocks}
                    layoutBlock={selectedLayoutBlock}
                    display={activeTab === 0}
                    onChangeBlockData={(layoutBlock) => {
                        if (!layoutBlocks) return;
                        const newLayoutBlocks = layoutBlocks.map((block) => {
                            if (block.uuid === layoutBlock.uuid) {
                                return layoutBlock;
                            }
                            return block;
                        });
                        setLayoutBlocks(newLayoutBlocks);
                    }}
                />
                <BlocksGallery
                    category="header"
                    display={activeTab === 2}
                    onPushBlock={(block) => {
                        setLayoutBlocks((prevState) => {
                            if (!prevState) return [block];
                            return [...prevState, block];
                        });
                        console.log(block);
                    }}
                />
                <BlocksGallery
                    category="article"
                    display={activeTab === 3}
                    onPushBlock={(block) => {
                        setLayoutBlocks((prevState) => {
                            if (!prevState) return [block];
                            return [...prevState, block];
                        });
                        console.log(block);
                    }}
                />
                <BlocksGallery
                    category="gallery"
                    display={activeTab === 4}
                    onPushBlock={(block) => {
                        setLayoutBlocks((prevState) => {
                            if (!prevState) return [block];
                            return [...prevState, block];
                        });
                        console.log(block);
                    }}
                />
                <BlocksGallery
                    category="ad"
                    display={activeTab === 5}
                    onPushBlock={(block) => {
                        setLayoutBlocks((prevState) => {
                            if (!prevState) return [block];
                            return [...prevState, block];
                        });
                        console.log(block);
                    }}
                />
            </div>
            <div className="h-full w-[1000px]">
                {/*<button
                    onClick={() => {
                        console.log(JSON.stringify(layoutBlocks));
                    }}
                >
                    JSON
                </button>
                <button
                    onClick={() => {
                        setLayoutBlocks([]);
                    }}
                >
                    Clear
                </button>
                <button
                    onClick={() => {
                        setLayoutBlocks(
                            JSON.parse(
                                '[{"blockId":"header1","uuid":"18c73310-42f4-4b49-b38d-fcd1cf64c9b8","data":{"title":"Hello World","tagline":"Lorem ipsum dolor sit amet.","link":"Read more"}}]'
                            )
                        );
                    }}
                >
                    JSON
                </button>*/}
                <iframe className="h-full w-full" srcDoc={renderedLayout} />
            </div>
        </div>
    );
};
