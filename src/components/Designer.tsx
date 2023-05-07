import { NarrowSidebar } from "~/components/NarrowSidebar";
import { Inspector } from "~/components/Inspector";
import { BlocksGallery } from "~/components/BlockGallery";
import React, { useEffect, useState } from "react";
import renderHandlebar from "~/utils/handlebars";
import { api } from "~/utils/api";
import Head from "next/head";
import { BlockSearch } from "~/components/BlockSearch";
import {
    BsPhone,
    BsPhoneLandscape,
    BsTabletLandscape,
    HiOutlineDesktopComputer,
} from "react-icons/all";
import { Navbar } from "~/components/navbar";
import { LayoutBlock } from "~/types/layoutBlock";

export const Designer = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [layoutBlocks, setLayoutBlocks] = useState<LayoutBlock[]>([]);
    const [selectedLayoutBlock, setSelectedLayoutBlock] =
        useState<LayoutBlock>();
    const [renderedLayout, setRenderedLayout] = useState<string>();
    const { data: shop, isLoading } =
        api.shop.getShopFromCurrentAuth.useQuery();
    const { mutate: updateShop } = api.shop.mutateShopInfo.useMutation();
    const [replaced, setReplaced] = useState(false);
    const [size, setSize] = useState(1);

    useEffect(() => {
        if (replaced) return;
        if (isLoading || !shop || !shop.info) return;

        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setLayoutBlocks(JSON.parse(JSON.stringify(shop.info.handlebar)));
        setReplaced(true);
    }, [shop, isLoading]);

    useEffect(() => {
        if (!layoutBlocks) return;
        setRenderedLayout(renderHandlebar(layoutBlocks));
    }, [layoutBlocks]);

    const handleMessage = (
        event: MessageEvent<{
            event: string;
            newOrder?: string[];
            uuid?: string;
        }>
    ) => {
        if (event.data.event) {
            if (event.data.uuid && event.data.event === "click") {
                setActiveTab(0);
                const block = layoutBlocks.find(
                    (block) => block.uuid === event.data.uuid
                );
                if (!block) return console.error("Block not found");
                setSelectedLayoutBlock(block);
            } else if (event.data.newOrder && event.data.event === "sorted") {
                if (!layoutBlocks) return console.error("No layout blocks");
                handleRelayout(event.data.newOrder);
            }
        }
    };

    /*handleMessage = handleMessage.bind(this);*/

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
        <>
            <Head>
                <title>SwiftSell - Designer</title>
            </Head>
            <div className="h-screen">
                <Navbar />
                <div
                    className="flex w-full flex-row bg-white text-slate-700"
                    style={{ height: "calc(100% - 80px)" }}
                >
                    <NarrowSidebar
                        activeTab={activeTab}
                        onChangeActiveTab={setActiveTab}
                        onSaveShop={() => {
                            if (!shop) return;

                            updateShop({
                                shopId: shop.id,
                                info: {
                                    handlebar: layoutBlocks,
                                },
                            });
                        }}
                    />

                    <div className="h-full w-[800px]">
                        <Inspector
                            currentBlock={selectedLayoutBlock}
                            display={activeTab === 0}
                            shopId={shop?.id as string}
                            shopName={shop?.name as string}
                            onChangeBlockData={(action: {
                                uuid: string;
                                key: string;
                                value: object | string | number | boolean;
                            }) => {
                                if (!layoutBlocks) return;

                                setLayoutBlocks(
                                    layoutBlocks.map((block) => {
                                        if (block.uuid === action.uuid) {
                                            return {
                                                blockId: block.blockId,
                                                uuid: block.uuid,
                                                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                                                data: {
                                                    ...block.data,
                                                    [action.key]: action.value,
                                                },
                                            };
                                        }
                                        return block;
                                    })
                                );
                            }}
                            onDeleteBlock={(layoutBlock) => {
                                if (!layoutBlocks) return;

                                setLayoutBlocks(
                                    layoutBlocks.filter((block) => {
                                        if (layoutBlock)
                                            return (
                                                block.uuid !== layoutBlock.uuid
                                            );
                                    })
                                );

                                if (layoutBlocks.length >= 1)
                                    setSelectedLayoutBlock(layoutBlocks[0]);
                            }}
                        />
                        <BlockSearch
                            display={activeTab === 1}
                            onPushBlock={(block) => {
                                setLayoutBlocks((prevState) => {
                                    if (!prevState) return [block];
                                    return [...prevState, block];
                                });
                            }}
                        />
                        <BlocksGallery
                            category="Kopfzeile"
                            display={activeTab === 2}
                            onPushBlock={(block) => {
                                setLayoutBlocks((prevState) => {
                                    if (!prevState) return [block];
                                    return [...prevState, block];
                                });
                            }}
                        />
                        <BlocksGallery
                            category="Artikel"
                            display={activeTab === 3}
                            onPushBlock={(block) => {
                                setLayoutBlocks((prevState) => {
                                    if (!prevState) return [block];
                                    return [...prevState, block];
                                });
                            }}
                        />
                        <BlocksGallery
                            category="Galerie"
                            display={activeTab === 4}
                            onPushBlock={(block) => {
                                setLayoutBlocks((prevState) => {
                                    if (!prevState) return [block];
                                    return [...prevState, block];
                                });
                            }}
                        />
                        <BlocksGallery
                            category="Werbung"
                            display={activeTab === 5}
                            onPushBlock={(block) => {
                                setLayoutBlocks((prevState) => {
                                    if (!prevState) return [block];
                                    return [...prevState, block];
                                });
                            }}
                        />
                    </div>

                    <div className="flex h-full w-full justify-center p-10">
                        <div
                            className={`mockup-window relative h-full border bg-gray-100 shadow-2xl transition-all ${
                                size == 1
                                    ? "w-full"
                                    : size == 2
                                    ? `${
                                          window.innerWidth < 1024
                                              ? "w-full"
                                              : "w-[1024px]"
                                      }`
                                    : size == 3
                                    ? `${
                                          window.innerWidth < 1024
                                              ? "w-full"
                                              : "w-[768px]"
                                      }`
                                    : `${
                                          window.innerWidth < 1024
                                              ? "w-full"
                                              : "w-[375px]"
                                      }`
                            }`}
                        >
                            <div className="absolute right-7 h-fit w-fit translate-y-[-42.5px]">
                                <button
                                    onClick={() => setSize(1)}
                                    className="h-10 w-10 rounded transition-all hover:bg-gray-200"
                                >
                                    <HiOutlineDesktopComputer
                                        className={`mx-auto h-2/3 w-2/3 ${
                                            size === 1
                                                ? "stroke-[#1FB2A5]"
                                                : "stroke-slate-600"
                                        }`}
                                    />
                                </button>
                                <button
                                    onClick={() => setSize(2)}
                                    className="h-10 w-10 rounded transition-all hover:bg-gray-200"
                                >
                                    <BsTabletLandscape
                                        className={`mx-auto h-2/3 w-2/3 ${
                                            size === 2
                                                ? "fill-[#1FB2A5]"
                                                : "fill-slate-600"
                                        }`}
                                    />
                                </button>
                                <button
                                    onClick={() => setSize(3)}
                                    className="h-10 w-10 rounded transition-all hover:bg-gray-200"
                                >
                                    <BsPhoneLandscape
                                        className={`mx-auto h-2/3 w-2/3 ${
                                            size === 3
                                                ? "fill-[#1FB2A5]"
                                                : "fill-slate-600"
                                        }`}
                                    />
                                </button>
                                <button
                                    onClick={() => setSize(4)}
                                    className="h-10 w-10 rounded transition-all hover:bg-gray-200"
                                >
                                    <BsPhone
                                        className={`mx-auto h-2/3 w-2/3 ${
                                            size === 4
                                                ? "fill-[#1FB2A5]"
                                                : "fill-slate-600"
                                        }`}
                                    />
                                </button>
                            </div>

                            <iframe
                                className="h-full w-full"
                                srcDoc={renderedLayout}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
