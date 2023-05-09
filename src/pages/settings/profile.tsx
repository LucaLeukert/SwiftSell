import Head from "next/head";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Navbar } from "~/components/Navbar/Navbar";
import Link from "next/link";
import { BiUser } from "react-icons/all";

const ProfileSettings = () => {
    const { user, isSignedIn, isLoaded } = useUser();

    if (!isLoaded) return <h1>Loading</h1>;

    return (
        <>
            <Head>
                <title>Dein Profil</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full">
                <Navbar />
                <div className="h-full w-full bg-base-200">
                    <div className="mx-40 flex flex-col p-7">
                        <div className="flex flex-row items-center">
                            <Image
                                src={user?.profileImageUrl as string}
                                alt={`${
                                    user?.username as string
                                }'s Profile Picture`}
                                width={60}
                                height={60}
                                className="avatar mr-5 rounded-full shadow"
                            />
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold">
                                    {`${user?.firstName as string} ${
                                        user?.lastName as string
                                    }`}{" "}
                                    <span className="font-normal">
                                        ({user?.username as string})
                                    </span>
                                </h1>
                                <span>Ihr persönliches Konto</span>
                            </div>
                        </div>
                        <div className="divider my-3" />
                        <div className="w-2/6 min-w-[200px] max-w-[300px] text-white">
                            <nav>
                                <ul>
                                    <li className="w-full rounded bg-black p-1 hover:bg-gray-700">
                                        <Link href="/settings/profile">
                                            <span>
                                                <BiUser />
                                            </span>
                                            Profil
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/settings/account">
                                            Konto
                                        </Link>
                                    </li>

                                    <div className="divider" />

                                    <li>
                                        <Link href="/settings/billing">
                                            Abrechnung und Pläne
                                        </Link>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default ProfileSettings;
