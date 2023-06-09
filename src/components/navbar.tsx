import { type NextPage } from "next";
import Image from "next/image";
import { SignInButton, useUser } from "@clerk/nextjs";

export const Navbar: NextPage = () => {
    const { user, isSignedIn, isLoaded } = useUser();

    return (
        <div className="navbar sticky top-0 z-20 h-20 bg-base-100 px-5 shadow-xl">
            <div className="flex-1 hover:underline">
                <a className="btn-ghost btn text-xl normal-case hover:bg-transparent">
                    SwiftSell
                </a>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal px-1">
                    <li>
                        <div className="form-control sm:hidden md:flex">
                            <input
                                type="text"
                                placeholder="Suche..."
                                className="input-bordered input input-md md:w-52 lg:w-80"
                            />
                        </div>
                    </li>
                    <li>
                        {isLoaded ? (
                            isSignedIn ? (
                                <div className="over:bg-transparent avatar">
                                    {user?.profileImageUrl ? (
                                        <Image
                                            className="rounded-full"
                                            src={user?.profileImageUrl}
                                            alt={"Profile picture"}
                                            width={48}
                                            height={48}
                                        />
                                    ) : (
                                        <div className="placeholder avatar">
                                            <div className="w-[48px] rounded-full bg-neutral-focus text-neutral-content">
                                                <span className="text-2xl">
                                                    {user?.firstName?.at(0)}{" "}
                                                    {user?.lastName?.at(0)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="hover:bg-transparent">
                                    <div className="flex h-full w-full justify-center text-center hover:underline sm:hidden md:hidden lg:flex">
                                        <SignInButton>Einloggen</SignInButton>
                                    </div>
                                    <div className="btn ml-4 rounded-full">
                                        <SignInButton>
                                            Kostenlos Testen
                                        </SignInButton>
                                    </div>
                                </div>
                            )
                        ) : (
                            <div className="placeholder avatar">
                                <div className="w-[48px] rounded-full bg-neutral-focus text-neutral-content" />
                            </div>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

//user?.profileImageUrl
