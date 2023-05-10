import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";

const BillingSettings = () => {
    return (
        <>
            <Head>
                <title>Abrechnungspläne</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full">
                <Navbar />
                <BaseLayout>
                    <section>
                        <h1 className="text-2xl">Abrechnungspläne</h1>
                        <div className="divider my-2" />
                        <form>
                            <div>
                                <dl>
                                    <dt>
                                        <label>Name</label>
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

export default BillingSettings;
