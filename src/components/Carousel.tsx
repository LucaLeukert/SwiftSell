import Image from "next/image";

export const Carousel = ({
                             id,
                             width,
                             height,
                             images
                         }: {
    id: string;
    width: number;
    height: number;
    images: string[];
}) => {
    return (
      <figure>
          <div className="carousel w-full overflow-hidden">
              {images.map((image, index) => {
                  let toIndex;
                  let fromIndex;

                  if (index === images.length - 1) toIndex = 0;
                  else toIndex = index + 1;

                  if (index === 0) fromIndex = images.length - 1;
                  else fromIndex = index - 1;

                  return (
                    <CarouselItem
                      id={id}
                      key={`${id}-item-${index}`}
                      width={width}
                      height={height}
                      image={image}
                      fromItem={`${id}-slide-${fromIndex}`}
                      currentItem={`${id}-slide-${index}`}
                      toItem={`${id}-slide-${toIndex}`}
                      amount={images}
                      currentIndex={index}
                    />
                  );
              })}
          </div>
      </figure>
    );
};

export const CarouselItem = ({
                                 id,
                                 width,
                                 height,
                                 image,
                                 fromItem,
                                 currentItem,
                                 toItem,
                                 amount,
                                 currentIndex
                             }: {
    id: string;
    width: number;
    height: number;
    image: string;
    fromItem: string;
    currentItem: string;
    toItem: string;
    amount: string[];
    currentIndex: number;
}) => {
    return (
      <div className="carousel-item relative w-full" id={currentItem}>
          <Image
            src={image}
            alt="Scateboard"
            width={width}
            height={height}
            className="shadow-b rounded-t-xl"
          />
          {amount.length > 1 && (
            <>
                <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a
                      href={`#${fromItem}`}
                      className="btn-xs btn-circle btn"
                    >
                        ❮
                    </a>
                    <a
                      href={`#${toItem}`}
                      className="btn-xs btn-circle btn"
                    >
                        ❯
                    </a>
                </div>
                <div
                  className="absolute bottom-0 z-10 w-full translate-y-2 text-center text-[30px] font-bold text-slate-100">
                    {amount.map((_, index) => {
                        const textColor =
                          index === currentIndex
                            ? "text-cyan-600"
                            : "text-slate-600";
                        return (
                          <span
                            key={`${id}-${index}`}
                            className={`mr-1 ${textColor}`}
                          >
                                    •
                                </span>
                        );
                    })}
                </div>
            </>
          )}
      </div>
    );
};
