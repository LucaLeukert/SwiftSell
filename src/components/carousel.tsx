import Image from "next/image";

export const Carousel = ({
    id,
    width,
    height,
    images,
}: {
    id: string;
    width: number;
    height: number;
    images: string[];
}) => {
    return (
        <figure>
            <div className="carousel w-full">
                {images.map((image, index) => {
                    let toIndex;
                    let fromIndex;

                    if (index === images.length - 1) toIndex = 0;
                    else toIndex = index + 1;

                    if (index === 0) fromIndex = images.length - 1;
                    else fromIndex = index - 1;

                    return (
                        <CarouselItem
                            key={`${id}-item-${index}`}
                            width={width}
                            height={height}
                            image={image}
                            fromItem={`${id}-slide-${fromIndex}`}
                            currentItem={`${id}-slide-${index}`}
                            toItem={`${id}-slide-${toIndex}`}
                        />
                    );
                })}
            </div>
        </figure>
    );
};

export const CarouselItem = ({
    width,
    height,
    image,
    fromItem,
    currentItem,
    toItem,
}: {
    width: number;
    height: number;
    image: string;
    fromItem: string;
    currentItem: string;
    toItem: string;
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
            <div className="absolute left-2 right-2 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a href={`#${fromItem}`} className="btn-xs btn-circle btn">
                    ❮
                </a>
                <a href={`#${toItem}`} className="btn-xs btn-circle btn">
                    ❯
                </a>
            </div>
        </div>
    );
};
