import { type NextPage } from "next";
import Head from "next/head";
import { Navbar } from "~/components/navbar";
import { api } from "~/utils/api";
import { ShopCard } from "~/components/ShopCard";
import { useUser } from "@clerk/nextjs";

const Home: NextPage = () => {
    const { data } = api.featuredShops.getAll.useQuery();
    const { isSignedIn } = useUser();

    return (
        <>
            <Head>
                <title>SwiftSell - Deine E-Commerce Platform</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full overscroll-none">
                <Navbar />
                <div className="absolute h-fit w-full bg-gradient-to-b from-slate-100 to-slate-200 ">
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
                                    Willkommen bei SwiftSell - Ihrem schnellen
                                    und einfachen Online-Marktplatz für alles,
                                    was Sie suchen.
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
                                {data?.map((shop) => {
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
                                            <ShopCard
                                                shop={shop}
                                                imageWidth={300}
                                                imageHeight={200}
                                                hasBadge={true}
                                                badgeContent={"Empfohlen"}
                                                key={shop.id}
                                            />
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
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default Home;
