import Head from "next/head";
import React from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";
import { DebounceInput } from "react-debounce-input";
import { useUser } from "@clerk/nextjs";

const ProfileSettings = () => {
    const { user, isSignedIn } = useUser();

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
                            }}
                        >
                            <div className="flex flex-col gap-6">
                                <dl>
                                    <dt className="mb-1.5">
                                        <label className="text-lg">
                                            Öffentlicher Name
                                        </label>
                                    </dt>
                                    <dd>
                                        <DebounceInput
                                            debounceTimeout={200}
                                            className="input-bordered input mr-3 h-8 w-full max-w-xs bg-base-300"
                                            placeholder={
                                                user?.username as string
                                            }
                                            onChange={(event) => {
                                                console.log(event.target.value);
                                            }}
                                            type="text"
                                        />
                                        <p className="my-1 text-xs text-gray-500">
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
                                                    className="input-bordered input mr-3 h-full w-full max-w-xs bg-base-300"
                                                    placeholder={
                                                        user?.firstName as string
                                                    }
                                                    onChange={(event) => {
                                                        console.log(
                                                            event.target.value
                                                        );
                                                    }}
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
                                                    className="input-bordered input mr-3 h-full w-full max-w-xs bg-base-300"
                                                    placeholder={
                                                        user?.lastName as string
                                                    }
                                                    onChange={(event) => {
                                                        console.log(
                                                            event.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                />
                                            </dd>
                                        </dl>
                                    </div>
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
