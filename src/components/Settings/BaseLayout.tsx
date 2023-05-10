import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

export const BaseLayout = (props: { children: JSX.Element }) => {
    const router = useRouter();
    const { user, isLoaded, isSignedIn } = useUser();
    const path = router.pathname.split("/").slice(-1)[0];

    if (!isLoaded) return <h1>Loading</h1>;
    if (isLoaded && !isSignedIn) {
        void router.push("/");
    }

    return (
        <div className="h-full w-full bg-base-200">
            <div className="flex flex-col p-7 sm:mx-5 md:mx-20 lg:mx-40">
                <div className="flex flex-row items-center">
                    <Image
                        src={user?.profileImageUrl as string}
                        alt={`${user?.username as string}'s Profile Picture`}
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
                <div className="flex flex-row">
                    <div className="mr-10 w-2/6 min-w-[200px] max-w-[300px] text-white">
                        <nav>
                            <ul className="flex flex-col gap-1">
                                <li
                                    className={`rounded p-1 hover:bg-stone-600 hover:bg-opacity-30 ${
                                        path === "profile"
                                            ? "bg-stone-600 bg-opacity-20"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href="/settings/profile"
                                        className="flex flex-row items-center gap-2"
                                    >
                                        <span>Öffentliches Profil</span>
                                    </Link>
                                </li>
                                <li
                                    className={`rounded p-1 hover:bg-stone-600 hover:bg-opacity-30 ${
                                        path === "account"
                                            ? "bg-stone-600 bg-opacity-20"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href="/settings/account"
                                        className="flex flex-row items-center gap-2"
                                    >
                                        <span>Konto</span>
                                    </Link>
                                </li>

                                <div className="divider my-0" />

                                <li
                                    className={`rounded p-1 hover:bg-stone-600 hover:bg-opacity-30 ${
                                        path === "billing"
                                            ? "bg-stone-600 bg-opacity-20"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href="/settings/billing"
                                        className="flex flex-row items-center gap-2"
                                    >
                                        <span>Abrechnungspläne</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="h-fit w-full">{props.children}</div>
                </div>
            </div>
        </div>
    );
};
