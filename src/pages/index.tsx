import { type NextPage } from "next";
import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { Homepage } from "~/components/Homepage/Homepage";

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
