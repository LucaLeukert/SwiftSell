import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";

const AccountSettings = () => {
    return (
        <>
            <Head>
                <title>Dein Profil</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full">
                <Navbar />
                <BaseLayout>
                    <div>
                        <h1 className="text-2xl">Konto</h1>
                        <div className="divider my-2" />
                    </div>
                </BaseLayout>
            </main>
        </>
    );
};

export default AccountSettings;
