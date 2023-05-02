import Head from "next/head";
import { Navbar } from "~/components/navbar";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import { useEffect, useState } from "react";
import { renderProduction } from "~/utils/handlebars";

const ShopView = () => {
    const router = useRouter();
    const [renderedLayout, setRenderedLayout] = useState<string>();
    const { data, isLoading } = api.shop.getShopInfo.useQuery({
        shopName: router.query.shop as string,
    });

    useEffect(() => {
        if (!data || !data.handlebar) return;

        console.log(data.handlebar);

        setRenderedLayout(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            renderProduction(JSON.parse(JSON.stringify(data.handlebar)))
        );
    }, [isLoading, data]);

    return (
        <>
            <Head>
                <title>SwiftSell - {router.query.shop}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full overscroll-none bg-white">
                <Navbar />
                {renderedLayout ? (
                    <iframe
                        className="h-[calc(100%-80px)] w-full"
                        srcDoc={renderedLayout}
                    />
                ) : (
                    <div className="flex h-[calc(100%-80px)] w-full items-center justify-center text-3xl text-slate-700">
                        <h1>Loading...</h1>
                    </div>
                )}
            </main>
        </>
    );
};

export default ShopView;
