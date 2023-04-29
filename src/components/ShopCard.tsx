import { Carousel } from "~/components/carousel";
import { type RouterOutputs } from "~/utils/api";
import { useRouter } from "next/router";

export type FeaturedShop = RouterOutputs["featuredShops"]["getAll"][number];

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
    const images: unknown = shop.images;
    const indicator = hasBadge ? "indicator" : "";
    const router = useRouter();

    return (
        <div
            className={`card-normal card w-[${imageWidth}px] ${indicator} flex-shrink-0 bg-slate-600 shadow`}
        >
            {hasBadge && badgeContent && (
                <span className="badge-accent badge indicator-item text-slate-200 shadow">
                    {badgeContent}
                </span>
            )}
            <Carousel
                id={`carousel-${shop.id}`}
                width={imageWidth}
                height={imageHeight}
                images={images.images}
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
