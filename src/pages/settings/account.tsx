import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";
import { useUser } from "@clerk/nextjs";
import { UserResource } from "@clerk/types";

const AccountSettings = () => {
    const { user, isSignedIn, isLoaded } = useUser();
    return (
        <>
            <Head>
                <title>Dein Konto</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full">
                <Navbar />
                <BaseLayout user={user as UserResource} isLoaded={isLoaded}>
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
