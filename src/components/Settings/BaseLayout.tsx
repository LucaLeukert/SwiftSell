import Image from "next/image";
import Link from "next/link";
import React, { type ReactElement } from "react";
import { useRouter } from "next/router";
import { type UserResource } from "@clerk/types";
import { type NextPage } from "next";
import { useOrganization } from "@clerk/nextjs";

export const BaseLayout = (props: {
    children: ReactElement;
    user: UserResource;
    isLoaded: boolean;
}) => {
    return (
        <div
            className="h-[calc(100%-80px)] w-full bg-base-200"
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
                                <ValidatePath
                                    name="Öffentliches Profil"
                                    expectedPath="profile"
                                    redirectPath="/settings/profile"
                                    equalClassName="bg-stone-600 bg-opacity-20"
                                    unequalClassName=""
                                />

                                <ValidatePath
                                    name="Konto"
                                    expectedPath="account"
                                    redirectPath="/settings/account"
                                    equalClassName="bg-stone-600 bg-opacity-20"
                                    unequalClassName=""
                                />

                                <ValidatePath
                                    name="Sicherheit und Datenschutz"
                                    expectedPath="security"
                                    redirectPath="/settings/security"
                                    equalClassName="bg-stone-600 bg-opacity-20"
                                    unequalClassName=""
                                />

                                <li className="divider my-0" />

                                <ValidatePath
                                    name="Abrechnungspläne"
                                    expectedPath="billing"
                                    redirectPath="/settings/billing"
                                    equalClassName="bg-stone-600 bg-opacity-20"
                                    unequalClassName=""
                                />

                                <li className="divider my-0" />

                                <OrganizationBaseLayout />
                            </ul>
                        </nav>
                    </div>
                    <div className="h-full w-full">{props.children}</div>
                </div>
            </div>
        </div>
    );
};

const OrganizationBaseLayout = () => {
    const { organization } = useOrganization();

    return (
        <li>
            <div>
                <h3 className="my-1 pl-1 text-sm text-slate-500">
                    Organisation
                </h3>
            </div>
            <ul className="flex flex-col gap-1">
                {!organization ? (
                    <ValidatePath
                        name="Erstellen"
                        expectedPath="create"
                        redirectPath="/settings/organization/create"
                        equalClassName="bg-stone-600 bg-opacity-20"
                        unequalClassName=""
                    />
                ) : (
                    <>
                        <ValidatePath
                            name="Mitglieder"
                            expectedPath="members"
                            redirectPath="/settings/organization/members"
                            equalClassName="bg-stone-600 bg-opacity-20"
                            unequalClassName=""
                        />

                        <ValidatePath
                            name="Einstellungen"
                            expectedPath="settings"
                            redirectPath="/settings/organization/settings"
                            equalClassName="bg-stone-600 bg-opacity-20"
                            unequalClassName=""
                        />
                    </>
                )}
            </ul>
        </li>
    );
};

type ValidatePathProps = {
    name: string;
    expectedPath: string;
    redirectPath: string;
    unequalClassName?: string;
    equalClassName?: string;
};

const ValidatePath: NextPage<ValidatePathProps> = (props) => {
    const router = useRouter();
    const path = router.pathname.split("/").slice(-1)[0];

    const computedClassName = `rounded hover:bg-stone-600 hover:bg-opacity-30 ${
        path === props.expectedPath
            ? (props.equalClassName as string)
            : (props.unequalClassName as string)
    }`;

    return (
        <li className={computedClassName}>
            <Link
                href={props.redirectPath}
                className="flex flex-row items-center gap-2 p-1"
            >
                <span>{props.name}</span>
            </Link>
        </li>
    );
};
