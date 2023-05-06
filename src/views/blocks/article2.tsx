const hbs = `
    <div class="flex flex-col">
        <div class="w-full text-black">
            <h1 class="text-center font-bold text-2xl">{{title}}</h1>
            <p class="text-center text-lg">{{description}}</p>
        </div>
        <div class="w-full flex gap-14 mt-5 text-slate-300 lg:flex-row md:flex-row sm:flex-col">
            {{#with item_1 as | item |}}
                <div class="card lg:w-1/2 md:w-1/2 sm:w-full shadow lg:md:h-[350px]" style="background: {{item.background_color}}">
                    <figure class="w-full max-h-[200px] p-5">
                        <a href="/shops/{{shop_name}}/items/{{item.id}}" class="w-full h-full">
                            <img src="{{item.image}}" class="object-cover w-full h-full rounded-xl"/>
                        </a>
                    </figure>
                    <div class="divider m-0 translate-y-[-5px]"></div>
                    <div class="card-body pt-2">
                        <h2 class="card-title">{{item.name}}</h2>
                        <p class="">{{item.description}}</p>
                        <div class="card-actions justify-between items-end pt-4">
                            <div>
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                            {{#each item.categories}}
                                  <div class="badge badge-outline">{{this}}</div>
                            {{/each}}
                        </div>
                    </div>
                </div>
            {{/with}}
            {{#with item_2 as | item |}}
                <div class="card lg:w-1/2 md:w-1/2 sm:w-full shadow lg:md:h-[350px]" style="background: {{item.background_color}}">
                    <figure class="w-full max-h-[200px] p-5">
                        <a href="/shops/{{shop_name}}/items/{{item.id}}" class="w-full h-full">
                            <img src="{{item.image}}" class="object-cover w-full h-full rounded-xl"/>
                        </a>
                    </figure>
                    <div class="divider m-0 translate-y-[-5px]"></div>
                    <div class="card-body pt-2">
                        <h2 class="card-title">{{item.name}}</h2>
                        <p class="">{{item.description}}</p>
                        <div class="card-actions justify-between items-end pt-4">
                            <div>
                                <button class="btn btn-primary">Buy Now</button>
                            </div>
                            {{#each item.categories}}
                                  <div class="badge badge-outline">{{this}}</div>
                            {{/each}}
                        </div>
                    </div>
                </div>
            {{/with}}
        </div>
    </div>
`;

const block = {
    hbs,
    name: "Article #2",
    blockId: "article2",
    previewImageUrl: "https://i.imgur.com/6QUsWtK.png",
    category: "Artikel",
    defaultData: {
        title: "Unsere Artikel",
        description: "Lorem ipsum dolor sit amet.",
        shop_name: "test",
        item_1: {
            id: "default",
            image: "https://via.placeholder.com/400x145",
            name: "default",
            description: "default",
            categories: ["default"],
            background_color: "#475569",
        },
        item_2: {
            id: "default",
            image: "https://via.placeholder.com/400x145",
            name: "default",
            description: "default",
            categories: ["default"],
            background_color: "#475569",
        },
    },
    config: {
        title: {
            type: "string",
            name: "Section title",
        },
        description: {
            type: "string",
            name: "Section description",
        },
        shop_name: {
            type: "string",
            name: "Section description",
        },
        background_color: {
            type: "color",
            name: "Hintergrundfarbe",
        },
        item_1: {
            type: "item",
            name: "Item 1",
        },
    },
};

export default block;
