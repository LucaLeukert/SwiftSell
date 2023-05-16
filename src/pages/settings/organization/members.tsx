import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";
import { type UserResource } from "@clerk/types";
import { useUser } from "@clerk/nextjs";

const Members = () => {
    const { user, isLoaded } = useUser();

    return (
        <>
            <Head>
                <title>Abrechnungspläne</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full">
                <Navbar />
                <BaseLayout user={user as UserResource} isLoaded={isLoaded}>
                    <section>
                        <h1 className="text-2xl">Abrechnungspläne</h1>
                        <div className="divider my-2" />
                        <form>
                            <div>
                                <dl>
                                    <dt>
                                        <label>OrganizationMembers</label>
                                    </dt>
                                </dl>
                            </div>
                        </form>
                    </section>
                </BaseLayout>
            </main>
        </>
    );
};

export default Members;
