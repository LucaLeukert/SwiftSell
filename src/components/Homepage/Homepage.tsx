import { useUser } from "@clerk/nextjs";
import React from "react";
import StoreView from "~/components/Homepage/StoreView";

export const Homepage = () => {
    const { isSignedIn } = useUser();

    return (
        <div className="absolute h-full w-full bg-gradient-to-b from-slate-100 to-slate-200 ">
            <section
                className="hero h-[350px] "
                style={{
                    backgroundImage: `url("/img_2.png")`,
                }}
            >
                <div className="hero-overlay bg-opacity-80 backdrop-blur-sm"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold text-slate-200">
                            SwiftSell
                        </h1>
                        <p className="mb-5 text-slate-300">
                            Willkommen bei SwiftSell - Ihrem schnellen und
                            einfachen Online-Marktplatz für alles, was Sie
                            suchen.
                        </p>

                        {isSignedIn ? (
                            <div className="form-control flex h-fit flex-row rounded-full bg-slate-100 p-1 pl-5 shadow">
                                <input
                                    placeholder="Gebe deinem Shop einen Namen"
                                    className="w-2/3 bg-transparent text-slate-700 focus:outline-none"
                                    type="text"
                                    spellCheck={true}
                                />
                                <button className="btn w-1/3 rounded-full text-slate-200 shadow">
                                    Starte deinen Shop
                                </button>
                            </div>
                        ) : (
                            <div className="form-control flex h-fit flex-row rounded-full bg-slate-100 p-1 pl-5 shadow">
                                <input
                                    placeholder="Gebe deine E-Mail ein"
                                    className="w-2/3 bg-transparent text-slate-700 focus:outline-none"
                                    type="email"
                                    spellCheck={false}
                                    autoComplete="email"
                                />
                                <button className="btn w-1/3 rounded-full text-slate-200 shadow">
                                    Kostenlos testen
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <StoreView />
        </div>
    );
};

/*{isSignedIn && (
  <div className="h-fit w-full bg-black flex gap-5">
      <h1>Dev Section</h1>
      <button
        className="btn btn-primary"
        onClick={() => {
            mutate({
                name: "Dummy Item",
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, ipsa!",
                price: 10,
                images: ["/img.png", "/img_1.png"],
                shopId: "clh2cp70s0000bxi8icdfdnwx"
            });
        }}
      >
          Create Dummy Item
      </button>
      <button
        /!* eslint-disable-next-line @typescript-eslint/no-misused-promises *!/
        onClick={async () => {
            const shops =
              await client.shop.getFeatured.query();
            console.log(shops);
        }}
        className="w-30 btn-primary btn"
      >
          Send Query (test)
      </button>
  </div>
)}*/
