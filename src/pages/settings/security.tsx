import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";
import {
    type SessionWithActivitiesResource,
    type UserResource,
} from "@clerk/types";
import { clerkClient, useSession, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/de";
import { type GetServerSideProps } from "next";
import { buildClerkProps, getAuth } from "@clerk/nextjs/server";
import { AiOutlineEdit } from "react-icons/ai";
import toast from "react-hot-toast";

dayjs.extend(relativeTime);
dayjs.locale("de");

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { userId } = getAuth(ctx.req);
    const user = userId ? await clerkClient.users.getUser(userId) : undefined;

    return { props: { ...buildClerkProps(ctx.req, { user }) } };
};

const Security = () => {
    const { user, isSignedIn, isLoaded } = useUser();
    const { session: currentSession } = useSession();
    const [sessions, setSessions] = useState<SessionWithActivitiesResource[]>(
        []
    );
    const [isLoadingSessions, setIsLoadingSessions] = useState(true);

    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;

        if (isLoaded && (!isSignedIn || !user)) {
            void router.push("/sign-in");
        }

        void user?.getSessions().then((fetchedSessions) => {
            const sorted = fetchedSessions.sort((a, b) => {
                return (
                    new Date(b.lastActiveAt).getTime() -
                    new Date(a.lastActiveAt).getTime()
                );
            });
            setSessions(sorted);
            setIsLoadingSessions(false);
        });
    }, [user, isLoaded, isSignedIn, router]);

    return (
        <>
            <Head>
                <title>Sicherheit und Datenschutz</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full overflow-y-hidden bg-base-200">
                <Navbar />
                <BaseLayout user={user as UserResource} isLoaded={isLoaded}>
                    <section className="flex h-full flex-col">
                        <h1 className="text-2xl">Sicherheit</h1>
                        <div className="divider my-2" />

                        <div className="flex w-full max-w-2xl flex-col gap-6">
                            <dl>
                                <dt>
                                    <label className="text-lg">
                                        Dein Passwort
                                    </label>
                                </dt>
                                <dd>
                                    <div className="flex flex-col gap-1.5">
                                        <p className="input-bordered input flex h-10 max-w-2xl cursor-not-allowed items-center justify-between bg-base-300 text-xl text-slate-200">
                                            <span>{"•".repeat(10)}</span>
                                            <label
                                                htmlFor="reset-password-modal"
                                                className="btn-ghost btn-sm btn w-[32px] p-0"
                                            >
                                                <AiOutlineEdit className="h-2/3 w-2/3" />
                                            </label>
                                        </p>

                                        <label
                                            htmlFor="reset-password-modal"
                                            className="btn-error btn-sm btn mt-2 max-w-[200px]"
                                        >
                                            Passwort ändern
                                        </label>

                                        <ResetPasswordModal
                                            user={user as UserResource}
                                        />
                                    </div>
                                </dd>
                            </dl>

                            <dl>
                                <dt className="mb-1.5">
                                    <label className="text-lg">
                                        Deine Geräte
                                    </label>
                                </dt>
                                <dd>
                                    <div className="flex flex-1 flex-col gap-5">
                                        {isLoadingSessions && (
                                            <>
                                                <SkeletonSessionCard />
                                                <SkeletonSessionCard />
                                            </>
                                        )}
                                        {sessions.map((session) => {
                                            return (
                                                <SessionCard
                                                    key={session.id}
                                                    session={session}
                                                    currentSessionId={
                                                        currentSession?.id as string
                                                    }
                                                />
                                            );
                                        })}
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </section>
                </BaseLayout>
            </main>
        </>
    );
};

const ResetPasswordModal = (props: { user: UserResource }) => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPassword = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) return;
        if (newPassword !== confirmPassword) return;

        if (newPassword.length <= 7) return;

        const success = await props.user
            .updatePassword({
                currentPassword,
                newPassword,
                signOutOfOtherSessions: true,
            })
            .catch(() => {
                toast.error("Das Passwort konnte nicht geändert werden.");
                return false;
            })
            .finally(() => {
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            });

        if (success) {
            toast.success("Das Passwort wurde erfolgreich geändert.");
        }
    };

    return (
        <>
            <input
                type="checkbox"
                id="reset-password-modal"
                className="modal-toggle"
            />
            <label className="modal sm:modal-bottom md:modal-middle">
                <label htmlFor="" className="modal-box w-11/12 max-w-5xl">
                    <h1 className="mb-5 text-2xl font-bold text-slate-200">
                        Passwort ändern
                    </h1>
                    <form className="flex flex-col gap-2 text-slate-300">
                        <div className="mb-2">
                            <label className="form-control">
                                Aktuelles Passwort
                            </label>
                            <input
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                type="password"
                                className="input-bordered input mt-1 h-8 w-full"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-control">
                                Neues Passwort
                            </label>
                            <input
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                type="password"
                                className="input-bordered input mt-1 h-8 w-full"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="form-control">
                                Passwort bestätigen
                            </label>
                            <input
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                type="password"
                                className="input-bordered input mt-1 h-8 w-full"
                            />
                        </div>
                    </form>
                    <div className="modal-action gap-2">
                        <label
                            htmlFor="reset-password-modal"
                            className="btn-error btn-sm btn"
                            onClick={() => {
                                setCurrentPassword("");
                                setNewPassword("");
                                setConfirmPassword("");
                            }}
                        >
                            Abbrechen
                        </label>
                        <label
                            onClick={() => {
                                void resetPassword();
                            }}
                            htmlFor="reset-password-modal"
                            className={`btn-success btn-sm btn ${
                                currentPassword &&
                                newPassword &&
                                confirmPassword &&
                                newPassword === confirmPassword
                                    ? ""
                                    : "btn-disabled"
                            }`}
                        >
                            Ändern
                        </label>
                    </div>
                </label>
            </label>
        </>
    );
};

const SkeletonSessionCard = () => {
    return (
        <div className="flex h-[134px] gap-5 rounded-2xl border border-daisy-border bg-base-300 px-[32px] py-[16px]">
            <figure className="flex items-center">
                <LaptopSvg className="h-20 w-20" />
            </figure>
            <div className="flex flex-1 flex-col justify-center gap-1.5">
                <progress
                    className="progress h-2.5 w-56"
                    value="40"
                    max="100"
                />
                <progress
                    className="progress h-2.5 w-56"
                    value="70"
                    max="100"
                />
                <progress
                    className="progress h-2.5 w-56"
                    value="50"
                    max="100"
                />
                <progress
                    className="progress h-2.5 w-56"
                    value="80"
                    max="100"
                />
            </div>
        </div>
    );
};

const SessionCard = (props: {
    session: SessionWithActivitiesResource;
    currentSessionId: string;
}) => {
    const latestActivity = props.session.latestActivity;

    return (
        <div
            tabIndex={0}
            className="collapse-arrow input-bordered input rounded-box collapse h-fit max-w-2xl flex-shrink-0 border bg-base-300"
        >
            <input type="checkbox" />
            <div className="collapse-title flex items-center">
                <div className="flex gap-5">
                    <figure className="flex items-center">
                        {latestActivity.isMobile ? (
                            <PhoneSvg className="h-20 w-20" />
                        ) : (
                            <LaptopSvg className="h-20 w-20" />
                        )}
                    </figure>
                    <div className="flex-row">
                        {props.currentSessionId === props.session.id ? (
                            <div className="indicator-middle indicator">
                                <p className="mr-[60px] text-lg font-bold text-slate-300">
                                    {latestActivity.deviceType}
                                </p>
                                <span className="indicator-middle badge indicator-item">
                                    Dieses Gerät
                                </span>
                            </div>
                        ) : (
                            <p className="text-lg font-bold text-slate-300">
                                {latestActivity.deviceType}
                            </p>
                        )}
                        <div className="text-slate-300">
                            <p>{`${latestActivity.browserName as string} ${
                                latestActivity.browserVersion as string
                            }`}</p>

                            <p>{`${latestActivity.ipAddress as string} (${
                                latestActivity.city as string
                            } ${latestActivity.country as string})`}</p>
                            <p>{dayjs(props.session.lastActiveAt).fromNow()}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="collapse-content text-sm text-slate-300">
                {props.currentSessionId === props.session.id ? (
                    <div>
                        <h2 className="font-bold">Dieses Gerät</h2>
                        <p className="mb-2">
                            Du bist gerade auf diesem Gerät angemeldet
                        </p>
                    </div>
                ) : (
                    <div>
                        <h2 className="font-bold">Abmelden</h2>
                        <p className="mb-2">
                            Von Ihrem Konto auf diesem Gerät abmelden
                        </p>
                        <button
                            onClick={() => {
                                void props.session.revoke();
                            }}
                            className="btn-error btn-xs btn"
                        >
                            Von Gerät abmelden
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

type SVGProps = {
    className?: string;
};
const LaptopSvg: React.FC<SVGProps> = (props) => {
    return (
        <svg
            viewBox="569.359 86.341 83.617 48.159"
            width="83.617"
            height="48.159"
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
        >
            <path
                d="M576.994 89.845c0-1.48.189-2.122.624-2.604.499-.552 1.22-.9 2.804-.9h61.724c1.385 0 1.94.286 2.437.789.482.493.757 1.194.757 2.715v40.993c0 1.391-.202 1.957-.543 2.411a2.724 2.724 0 0 1-2.185 1.096h-62.968c-.844 0-1.6-.385-2.1-.987-.392-.472-.55-1.08-.55-2.52V89.845Z"
                fill="#343434"
            ></path>
            <path
                d="M578.397 132.865h65.54c.305 0 .59-.137.78-.371.17-.203.232-.509.232-1.423V89.848c0-1.296-.19-1.979-.645-2.445-.493-.502-1.019-.673-2.161-.673h-61.721c-1.316 0-2.025.229-2.515.772-.382.425-.525 1.027-.525 2.346v41.223c0 .903.057 1.2.214 1.399.189.246.482.395.801.395Z"
                fill="#333333"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M611.167 88.521a.272.272 0 1 0 0-.544.272.272 0 1 0 0 .544Z"
                stroke="#3434341"
                strokeWidth="0.25"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M569.359 133.252v-.468h83.617v.468s-1.857.643-3.973.86c-1.357.137-3.675.388-8.868.388h-57.433c-4.501 0-8.29-.273-10.072-.468-1.679-.183-3.271-.78-3.271-.78Z"
                fill="#222222"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M579.722 89.455h62.968v39.433h-62.968V89.455Z"
                fill="#000000"
            ></path>
        </svg>
    );
};

const PhoneSvg: React.FC<SVGProps> = (props) => {
    return (
        <svg
            viewBox="670.641 72.329 84 76"
            width="84"
            height="76"
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="m712.495 107.191.001-.037a7.82 7.82 0 0 1 .055-.574h.095c.079 0 .143.063.143.141v7.213a.141.141 0 0 1-.142.143h-.12c-.004-.002-.021-.027-.032-.304l-.002-5.127c0-.778.001-1.358.002-1.455Z"
                fill="#333333"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M697.375 99.921c-.009-.221-.057-.575-.057-.575h-.091a.142.142 0 0 0-.144.144v4.422c.001.078.098.145.179.145h.082c.003-.002.022-.027.033-.303l.002-2.944c0-.439 0-.774-.002-.852l-.002-.037Z"
                fill="#343434"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M697.375 93.917c-.009-.218-.057-.574-.057-.574h-.091a.143.143 0 0 0-.144.143v4.422c.001.081.098.147.179.147h.082c.003-.002.022-.027.033-.304l.002-2.943c0-.438 0-.774-.002-.852l-.002-.039Z"
                fill="#333333"
            ></path>
            <path
                d="M722.674 78.638c3.602 0 5.524 2.063 5.524 5.661v52.357c0 3.483-2.269 5.364-5.811 5.364h-19.379c-3.802 0-5.817-2.422-5.745-5.441V84.287c0-3.6 2.065-5.649 5.667-5.649h19.744Z"
                fill="#343434"
            ></path>
            <path
                d="M722.345 79.16c3.647 0 5.352 1.823 5.352 5.475v51.895c0 3.237-2.197 5.023-5.499 5.023H703.26c-3.267-.01-5.485-1.929-5.485-4.948V84.636c0-3.652 1.837-5.476 5.485-5.476h19.085Z"
                fill="#333333"
                stroke="#222222"
                strokeWidth="0.5"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M704.882 80.28c.204 0 .351.165.351.37v.218c0 .894.722 1.69 1.612 1.69h11.804c.889 0 1.611-.796 1.611-1.69v-.218c0-.205.163-.37.367-.37h2.995c1.578 0 2.913 1.713 2.913 3.297v53.498c0 1.713-1.439 3.37-3.339 3.37h-20.971c-2.172 0-3.352-1.313-3.343-3.226V83.577c0-1.584 1.34-3.297 2.917-3.297h3.083Z"
                fill="#000000"
            ></path>
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M715.31 81.2a.296.296 0 0 0-.203-.364.293.293 0 1 0-.161.565.293.293 0 0 0 .364-.201Zm-5.16-.161c0 .143.117.257.258.257h2.877a.257.257 0 0 0 .259-.257.257.257 0 0 0-.259-.256h-2.877a.258.258 0 0 0-.258.256Z"
            ></path>
        </svg>
    );
};

export default Security;
