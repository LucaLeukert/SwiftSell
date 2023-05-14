import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { UserResource } from "@clerk/types";

export const BaseLayout = (props: {
    children: JSX.Element;
    user: UserResource;
    isLoaded: boolean;
}) => {
    const router = useRouter();
    const path = router.pathname.split("/").slice(-1)[0];

    return (
        <div
            className="h-full w-full bg-base-200"
            style={{ flexFlow: "column" }}
        >
            <div className="flex h-full flex-col sm:mx-5 sm:p-1 md:mx-10 md:p-5 lg:mx-40 lg:p-7">
                <div className="mb-6 flex flex-row items-center">
                    {!props.isLoaded ? (
                        <div className="placeholder avatar">
                            <div className="mr-5 w-[60px] rounded-full bg-neutral-focus text-neutral-content" />
                        </div>
                    ) : (
                        <Image
                            src={props.user?.profileImageUrl}
                            alt={`${
                                props.user?.username as string
                            }'s Profile Picture`}
                            width={60}
                            height={60}
                            className="avatar mr-5 rounded-full shadow"
                        />
                    )}
                    <div className="flex flex-col">
                        {!props.isLoaded ? (
                            <div className="flex flex-col gap-1">
                                <progress
                                    className="progress h-3.5 w-56"
                                    value="80"
                                    max="100"
                                />
                                <progress
                                    className="progress h-3.5 w-56"
                                    value="50"
                                    max="100"
                                />
                            </div>
                        ) : (
                            <>
                                <h1 className="text-xl font-bold">
                                    {`${props.user?.firstName as string} ${
                                        props.user?.lastName as string
                                    }`}{" "}
                                    <span className="font-normal">
                                        ({props.user?.username as string})
                                    </span>
                                </h1>
                                <span>Ihr persönliches Konto</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex h-full flex-row">
                    <div className="mr-9 w-1/2 min-w-[200px] max-w-[320px] text-white">
                        <nav>
                            <ul className="flex flex-col gap-1">
                                <li
                                    className={`rounded hover:bg-stone-600 hover:bg-opacity-30 ${
                                        path === "profile"
                                            ? "bg-stone-600 bg-opacity-20"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href="/settings/profile"
                                        className="flex flex-row items-center gap-2 p-1"
                                    >
                                        <span>Öffentliches Profil</span>
                                    </Link>
                                </li>
                                <li
                                    className={`rounded hover:bg-stone-600 hover:bg-opacity-30 ${
                                        path === "account"
                                            ? "bg-stone-600 bg-opacity-20"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href="/settings/account"
                                        className="flex flex-row items-center gap-2 p-1"
                                    >
                                        <span>Konto</span>
                                    </Link>
                                </li>
                                <li
                                    className={`rounded hover:bg-stone-600 hover:bg-opacity-30 ${
                                        path === "security"
                                            ? "bg-stone-600 bg-opacity-20"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href="/settings/security"
                                        className="flex flex-row items-center gap-2 p-1"
                                    >
                                        <span>Sicherheit und Datenschutz</span>
                                    </Link>
                                </li>

                                <li className="divider my-0" />

                                <li
                                    className={`rounded hover:bg-stone-600 hover:bg-opacity-30 ${
                                        path === "billing"
                                            ? "bg-stone-600 bg-opacity-20"
                                            : ""
                                    }`}
                                >
                                    <Link
                                        href="/settings/billing"
                                        className="flex flex-row items-center gap-2 p-1"
                                    >
                                        <span>Abrechnungspläne</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="h-full w-full">{props.children}</div>
                </div>
            </div>
        </div>
    );
};
