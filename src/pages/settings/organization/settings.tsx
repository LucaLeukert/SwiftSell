import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";
import { type UserResource } from "@clerk/types";
import { useOrganization, useUser } from "@clerk/nextjs";
import { CgOrganisation } from "react-icons/cg";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";

const Settings = () => {
    const { user, isLoaded } = useUser();
    const { organization } = useOrganization();

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
                                    <CgOrganisation className="mr-2 h-4 w-4" />
                                    <span>{organization?.name}</span>
                                </li>
                                <li>
                                    <HiOutlineEnvelopeOpen className="mr-2 h-4 w-4" />
                                    <span>Einladungen</span>
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
                                            <label>OrganizationMembers</label>
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

export default Settings;
