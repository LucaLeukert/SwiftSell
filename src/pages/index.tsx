import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/navbar";
import { Homepage } from "~/components/homepage";
import { api } from "~/utils/api";

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>SwiftSell - Deine E-Commerce Platform</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full overscroll-none">
                <Navbar />
                <Homepage />
            </main>
        </>
    );
};

export default Home;
