import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";
import { UserResource } from "@clerk/types";
import { useUser } from "@clerk/nextjs";
import { AiOutlineCreditCard } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";

const BillingSettings = () => {
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
                    <>
                        <div className="breadcrumbs text-sm">
                            <ul>
                                <li>
                                    <FiSettings className="mr-2 h-4 w-4" />
                                    <span>Konto</span>
                                </li>
                                <li>
                                    <AiOutlineCreditCard className="mr-2 h-4 w-4" />
                                    <span>Abrechnung</span>
                                </li>
                            </ul>
                        </div>
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
                    </>
                </BaseLayout>
            </main>
        </>
    );
};

export default BillingSettings;
