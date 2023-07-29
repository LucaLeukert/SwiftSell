import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";
import {
    OrganizationMembershipResource,
    PublicUserData,
    type UserResource,
} from "@clerk/types";
import { useOrganization, useUser } from "@clerk/nextjs";
import { CgOrganisation } from "react-icons/cg";
import { HiOutlineEnvelopeOpen } from "react-icons/hi2";
import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/de";
import relativeTime from "dayjs/plugin/relativeTime";
import { MemberView } from "~/components/Organisation/Member/OwnerView";

dayjs.extend(relativeTime);
dayjs.locale("de");

const Members = () => {
    const { user, isLoaded } = useUser();
    const {
        organization,
        isLoaded: isOrganizationLoaded,
        membership,
    } = useOrganization();
    const [memberships, setMemberships] = useState<
        OrganizationMembershipResource[]
    >([]);

    useEffect(() => {
        if (isOrganizationLoaded && organization) {
            void organization.getMemberships().then((memberships) => {
                const sorted = memberships.sort((a, b) => {
                    return (
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                    );
                });

                setMemberships(sorted);
            });
        }
    }, [organization, isOrganizationLoaded]);

    return (
        <>
            <Head>
                <title>Abrechnungspläne</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full bg-[#1f2223]">
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
                                    <span>Mitglieder</span>
                                </li>
                            </ul>
                        </div>
                        <section>
                            <h1 className="text-2xl">
                                Mitglieder und Berechtigungen
                            </h1>
                            <div className="divider my-2 h-fit" />
                            <MemberView />
                            <ul>
                                {memberships.map((membership) => {
                                    return (
                                        <li
                                            key={membership.id}
                                            className="mb-5"
                                        >
                                            <MemberShipView
                                                membership={membership}
                                            />
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    </>
                </BaseLayout>
            </main>
        </>
    );
};

const MemberShipView = (props: {
    membership: OrganizationMembershipResource;
}) => {
    const { user } = useUser();
    const userData = props.membership.publicUserData;

    const self = props.membership.publicUserData.userId === user?.id;

    return (
        <div
            tabIndex={0}
            className="collapse-arrow input-bordered input rounded-box collapse h-fit max-w-2xl flex-shrink-0 border bg-base-300"
        >
            <input type="checkbox" />
            <div className="collapse-title flex items-center">
                <div className="flex items-center gap-5">
                    <figure className="avatar h-16">
                        <Image
                            src={userData.profileImageUrl}
                            alt={userData?.firstName as string}
                            className="rounded-full"
                            width={64}
                            height={64}
                        />
                    </figure>
                    <div className="flex-row">
                        {self ? (
                            <div className="indicator-middle indicator">
                                <h1 className="mr-7 text-lg font-bold text-slate-300">
                                    {`${userData?.firstName as string} ${
                                        userData?.lastName as string
                                    }`}
                                </h1>
                                <span className="indicator-item badge indicator-middle">
                                    Sie
                                </span>
                            </div>
                        ) : (
                            <h1 className="text-lg font-bold text-slate-300">
                                {`${userData?.firstName as string} ${
                                    userData?.lastName as string
                                }`}
                            </h1>
                        )}
                        <p>{`Rolle: ${props.membership?.role}`}</p>
                        <p>{`Beigetreten ${dayjs(
                            props.membership?.createdAt
                        ).fromNow()}`}</p>
                    </div>
                </div>
            </div>
            <div className="collapse-content text-slate-300">
                {self ? (
                    <div className="max-w-xs">
                        <h2 className="font-bold">
                            {`${userData?.firstName as string} ${
                                userData?.lastName as string
                            }`}
                        </h2>
                        <p className="mb-2 text-sm">
                            Sie sind der Besitzer dieser Organisation. Sie
                            können die Organisation nicht verlassen.
                        </p>
                    </div>
                ) : (
                    <MembershipDropdown
                        userData={userData}
                        membership={props.membership}
                    />
                )}
            </div>
        </div>
    );
};

const MembershipDropdown = (props: {
    userData: PublicUserData;
    membership: OrganizationMembershipResource;
}) => {
    return (
        <div>
            <section className="max-w-xs">
                <h2 className="font-bold">Rolle ändern</h2>
                <p className="mb-2 text-sm">
                    {`Ändern Sie die Rolle von ${
                        props.userData?.firstName as string
                    } ${props.userData?.lastName as string}`}
                </p>
                <select className="select-bordered select select-sm w-full">
                    <option disabled selected>
                        Wählen Sie eine Rolle
                    </option>
                    <option>Admin</option>
                    <option disabled>Mitglied</option>
                </select>
            </section>
            <div className="divider my-2" />
            <section className="max-w-xs">
                <h2 className="font-bold">Entfernen</h2>
                <p className="mb-2 text-sm">
                    {`${props.userData?.firstName as string} ${
                        props.userData?.lastName as string
                    } aus der Organisation entfernen.`}
                </p>
                <button
                    onClick={() => {
                        void props.membership.destroy();
                    }}
                    className="btn-error btn-xs btn"
                >
                    <p className="text-sm">{`Aus ${props.membership.organization?.name} Entfernen`}</p>
                </button>
            </section>
        </div>
    );
};

export default Members;
