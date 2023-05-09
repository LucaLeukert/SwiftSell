import React from "react";
import { ShopCard } from "~/components/ShopCard";
import { api } from "~/utils/api";

function StoreView() {
    const { data: stores } = api.shop.getFeatured.useQuery();

    if (!stores) return <></>;

    return (
        <section className="sm:p-5 md:p-8 lg:px-32 lg:py-10">
            <div className="flex h-fit w-full flex-col justify-center overflow-x-scroll scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-700 scrollbar-thumb-rounded">
                <div className="sticky left-0">
                    <h1 className="w-full text-sm text-slate-700">
                        Empfohlene Shops
                    </h1>

                    <div className="divider my-3 divide-info" />
                </div>

                {/*FIXME: Make Container Grabbable/*/}
                <div className="mb-3 flex sm:gap-5 md:gap-20 lg:gap-24">
                    {stores.map((shop) => {
                        return (
                            <>
                                <ShopCard
                                    shop={shop}
                                    imageWidth={300}
                                    imageHeight={200}
                                    hasBadge={true}
                                    badgeContent={"Empfohlen"}
                                    key={shop.id}
                                />
                            </>
                        );
                    })}
                </div>

                <div className="divider my-3 divide-info" />
            </div>
        </section>
    );
}

export default StoreView;
