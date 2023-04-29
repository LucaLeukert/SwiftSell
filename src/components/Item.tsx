import { Carousel } from "~/components/carousel";
import { type RouterOutputs } from "~/utils/api";

export type Item = RouterOutputs["item"]["getAll"][number];

export const Item = ({
    item,
    imageWidth,
    imageHeight,
    hasBadge,
    badgeContent,
}: {
    item: Item;
    imageWidth: number;
    imageHeight: number;
    hasBadge?: boolean;
    badgeContent?: string;
}) => {
    const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });

    const images: unknown = item.images;
    const indicator = hasBadge ? "indicator" : "";

    return (
        <div
            className={`card-normal card w-[${imageWidth}px] ${indicator} bg-slate-600 shadow-xl`}
        >
            {hasBadge && badgeContent && (
                <span className="badge-accent badge indicator-item text-slate-200 shadow">
                    {badgeContent}
                </span>
            )}
            <Carousel
                id={`carousel-${item.id}`}
                width={imageWidth}
                height={imageHeight}
                images={images.images}
            />

            <div className="card-body">
                <h1 className="card-title text-slate-200">{item.name}</h1>
                <p className="text-slate-300">{item.description}</p>
                <div className="card-actions mt-3 w-full justify-end">
                    <button className="btn-accent btn-block btn">
                        In den Warenkorb - {formatter.format(item.price)}
                    </button>
                </div>
            </div>
        </div>
    );
};
