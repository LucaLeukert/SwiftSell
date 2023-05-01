import Head from "next/head";
import { Navbar } from "~/components/navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ShopView = () => {
    const router = useRouter();

    /*useEffect(() => {
        console.log(router.query.shop);
        if (router.query.shop === undefined) {
            void router.push("/");
        }
    }, [router]);*/

    return (
        <>
            <Head>
                <title>SwiftSell - {router.query.shop}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full overscroll-none">
                <Navbar />
            </main>
        </>
    );
};

export default ShopView;
