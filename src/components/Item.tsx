import { useState } from "react";

/*export type Item = RouterOutputs["item"]["getAll"][number];*/

export const Item = ({
    /*item,*/
    imageWidth,
    imageHeight,
    hasBadge,
    badgeContent,
}: {
    /*item: Item;*/
    imageWidth: number;
    imageHeight: number;
    hasBadge?: boolean;
    badgeContent?: string;
}) => {
    const [width, setWidth] = useState(imageWidth);
    const [images, setImages] = useState<string[]>([]);
    const formatter = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "EUR",
    });
    const indicator = hasBadge ? "indicator" : "";

    /*useEffect(() => {
        if (item?.images && typeof item?.images === "object") {
            const json = item?.images as unknown as JsonImages;
            console.log(json.images);

            setImages(json.images);
        }
    }, [item?.images]);

    useEffect(() => {
        setWidth(imageWidth);
    }, [imageWidth]);*/

    return (
        <div
            className={`card-normal card w-[${width}px] ${indicator} bg-slate-600 shadow-xl`}
        >
            {/*          {hasBadge && badgeContent && (
            <span className="badge-accent badge indicator-item text-slate-200 shadow">
                    {badgeContent}
                </span>
          )}
          <Carousel
            id={`carousel-${item.id}`}
            width={imageWidth}
            height={imageHeight}
            images={images}
          />

          <div className="card-body">
              <h1 className="card-title text-slate-200">{item.name}</h1>
              <p className="text-slate-300">{item.description}</p>
              <div className="card-actions mt-3 w-full justify-end">
                  <button className="btn-accent btn-block btn">
                      In den Warenkorb - {formatter.format(item.price)}
                  </button>
              </div>
          </div>*/}
        </div>
    );
};
