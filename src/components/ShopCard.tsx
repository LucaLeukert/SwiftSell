import { Carousel } from "~/components/carousel";
import { type RouterOutputs } from "~/utils/api";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export type FeaturedShop = RouterOutputs["featuredShops"]["getAll"][number];
export type JsonImages = {
    images: string[];
};

export const ShopCard = ({
    shop,
    imageWidth,
    imageHeight,
    hasBadge,
    badgeContent,
}: {
    shop: FeaturedShop;
    imageWidth: number;
    imageHeight: number;
    hasBadge?: boolean;
    badgeContent?: string;
}) => {
    const [images, setImages] = useState<string[]>([]);
    /*const [width, setWidth] = useState(imageWidth);*/
    const indicator = hasBadge ? "indicator" : "";
    const router = useRouter();

    useEffect(() => {
        if (shop?.images && typeof shop?.images === "object") {
            const json = shop?.images as unknown as JsonImages;
            console.log(json.images);

            setImages(json.images);
        }
    }, [shop?.images]);

    /*useEffect(() => {
        setWidth(imageWidth);
    }, [imageWidth]);*/

    return (
        <div
            className={`card-normal card w-[300px] ${indicator} flex-shrink-0 rounded-t-xl bg-slate-600 shadow`}
        >
            {hasBadge && badgeContent && (
                <span className="badge-accent badge indicator-item text-slate-200 shadow sm:indicator-center lg:indicator-end">
                    {badgeContent}
                </span>
            )}
            <Carousel
                id={`carousel-${shop.id}`}
                width={imageWidth}
                height={imageHeight}
                /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
                images={images}
            />

            <div className="card-body">
                <h1 className="card-title text-slate-200">{shop.name}</h1>
                <p className="text-slate-300">{shop.description}</p>
                <div className="card-actions mt-3 w-full justify-end">
                    <button
                        className="btn-accent btn-block btn"
                        onClick={() => {
                            void router.push(shop.url);
                        }}
                    >
                        zum Shop
                    </button>
                </div>
            </div>
        </div>
    );
};
