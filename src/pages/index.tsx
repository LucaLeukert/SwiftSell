import { type GetStaticProps, type InferGetServerSidePropsType } from "next";
import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { Homepage } from "~/components/Homepage/Homepage";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { appRouter } from "~/server/api/root";
import { prisma } from "~/server/db";
import superjson from "superjson";
import { api } from "~/utils/api";

export const getStaticProps: GetStaticProps = async () => {
    const helpers = createServerSideHelpers({
        router: appRouter,
        ctx: { prisma: prisma, userId: null },
        transformer: superjson,
    });

    await helpers.shop.getFeatured.prefetch();

    return {
        props: {
            trpcState: helpers.dehydrate(),
        },
        revalidate: 500,
    };
};

const Home = (props: InferGetServerSidePropsType<typeof getStaticProps>) => {
    const { data: featuredStores } = api.shop.getFeatured.useQuery();

    if (!featuredStores) return <>Loading...</>;

    return (
        <>
            <Head>
                <title>SwiftSell - Deine E-Commerce Platform</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full overscroll-none">
                <Navbar />
                <Homepage shops={featuredStores} />
            </main>
        </>
    );
};

export default Home;
