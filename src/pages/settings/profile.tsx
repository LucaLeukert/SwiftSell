import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";
import { DebounceInput } from "react-debounce-input";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import toast from "react-hot-toast";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Datepicker from "tailwind-datepicker-react";
import { withServerSideAuth } from "@clerk/nextjs/ssr";

export const getServerSideProps = withServerSideAuth(
    async (context) => {
        const { sessionId, userId, getToken } = context.auth;
        const { user, session } = context;
        console.log(
            "Available during SSR:",
            sessionId,
            userId,
            await getToken()
        );
        console.log("Available during SSR:", user, session);
    },
    { loadUser: true, loadSession: true }
);

const ProfileSettings = () => {
    const { user, isSignedIn, isLoaded } = useUser();
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [showDate, setShowDate] = useState(false);

    useEffect(() => {
        if (isLoaded && isSignedIn) {
            setUsername(user.username as string);
            setFirstName(user.firstName as string);
            setLastName(user.lastName as string);
        }
    }, [isLoaded, isSignedIn]);

    const { mutate } = api.settings.mutateProfile.useMutation({
        onSuccess: () => {
            toast.success("Profil erfolgreich aktualisiert!");
        },
        onError: (error) => {
            const zodError = error.data?.zodError?.fieldErrors.user;

            if (zodError && zodError[0]) toast.error(zodError[0]);
            else toast.error(error.message);
        },
    });

    return (
        <>
            <Head>
                <title>Dein Profil</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full">
                <Navbar />
                <BaseLayout>
                    <section>
                        <h1 className="text-2xl">Öffentliches Profil</h1>
                        <div className="divider my-2" />
                        <form
                            onSubmit={(event) => {
                                event.preventDefault();

                                mutate({
                                    user: {
                                        username,
                                        firstName,
                                        lastName,
                                    },
                                });
                            }}
                        >
                            <div className="flex flex-col gap-6 sm:w-full md:w-full lg:w-[300px] xl:w-[450px]">
                                <dl>
                                    <dt className="mb-1.5">
                                        <label className="text-lg">
                                            Öffentlicher Name
                                        </label>
                                    </dt>
                                    <dd>
                                        <DebounceInput
                                            debounceTimeout={200}
                                            className="input-bordered input mr-3 h-8 w-full bg-base-300"
                                            placeholder={
                                                user?.username as string
                                            }
                                            value={username}
                                            onChange={(event) =>
                                                setUsername(event.target.value)
                                            }
                                            type="text"
                                        />
                                        <p className="my-1 !text-xs text-gray-500">
                                            Ihr Name kann auf SwiftSell Stores
                                            erscheinen, wenn sie einen Kauf auf
                                            einem SwiftSell Autorisierten Store
                                            tätigen. Sie können ihn jederzeit
                                            ändern.
                                        </p>
                                    </dd>
                                </dl>
                                <div className="flex flex-row">
                                    <div className="divider divider-horizontal mx-2" />
                                    <div className="flex w-full flex-col gap-1.5">
                                        <dl className="w-full">
                                            <dt className="mb-1.5">
                                                <label className="text-lg">
                                                    Vorname
                                                </label>
                                            </dt>
                                            <dd className="h-8">
                                                <DebounceInput
                                                    debounceTimeout={200}
                                                    value={firstName}
                                                    className="input-bordered input mr-3 h-full w-full bg-base-300"
                                                    placeholder={
                                                        user?.firstName as string
                                                    }
                                                    onChange={(event) =>
                                                        setFirstName(
                                                            event.target.value
                                                        )
                                                    }
                                                    type="text"
                                                />
                                            </dd>
                                        </dl>
                                        <dl className="w-full">
                                            <dt className="mb-1.5">
                                                <label className="text-lg">
                                                    Nachname
                                                </label>
                                            </dt>
                                            <dd className="h-8">
                                                <DebounceInput
                                                    debounceTimeout={200}
                                                    className="input-bordered input mr-3 h-full w-full bg-base-300"
                                                    placeholder={
                                                        user?.lastName as string
                                                    }
                                                    value={lastName}
                                                    onChange={(event) =>
                                                        setLastName(
                                                            event.target.value
                                                        )
                                                    }
                                                    type="text"
                                                />
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                                <div>
                                    <dl>
                                        <dt>
                                            <label>Geburtstag</label>
                                        </dt>
                                        <dd className="relative h-8">
                                            <Datepicker
                                                className=""
                                                show={showDate}
                                                onChange={(date: Date) => {
                                                    console.log(date);
                                                }}
                                                options={{
                                                    language: "de",
                                                    title: "Wähle dein Geburtsdatum aus",
                                                    todayBtnText: "Heute",
                                                    clearBtn: false,
                                                    datepickerClassNames:
                                                        "top-7 shadow-xl",
                                                    weekDays: [
                                                        "Mo",
                                                        "Di",
                                                        "Mi",
                                                        "Do",
                                                        "Fr",
                                                        "Sa",
                                                        "So",
                                                    ],
                                                    theme: {
                                                        background:
                                                            "bg-base-100 dark:bg-base-300",
                                                        disabledText:
                                                            "bg-base-300",
                                                    },
                                                }}
                                                setShow={(show: boolean) => {
                                                    setShowDate(show);
                                                }}
                                            />
                                        </dd>
                                    </dl>
                                </div>
                                <button
                                    type="submit"
                                    className="btn-sm btn w-32 border-green-800 bg-green-800 font-bold text-white hover:border-green-700 hover:bg-green-700"
                                >
                                    Speichern
                                </button>
                            </div>
                        </form>
                    </section>
                </BaseLayout>
            </main>
        </>
    );
};

export default ProfileSettings;
