import { type NextPage } from "next";
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/clerk-react";

export const ProfilePicture: NextPage = () => {
    const { user, isSignedIn, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="placeholder avatar">
                <div className="w-[48px] rounded-full bg-neutral-focus text-neutral-content" />
            </div>
        );
    }

    if (isLoaded && isSignedIn && !user?.profileImageUrl) {
        return (
            <div className="placeholder avatar">
                <div className="w-[48px] rounded-full bg-neutral-focus text-neutral-content">
                    <span className="text-2xl">
                        {user?.firstName?.at(0)} {user?.lastName?.at(0)}
                    </span>
                </div>
            </div>
        );
    }

    if (isLoaded && !isSignedIn) {
        return (
            <div className="flex flex-row hover:bg-transparent">
                <div className="hover:underline sm:hidden md:hidden lg:flex">
                    <SignInButton>Einloggen</SignInButton>
                </div>
                <div className="btn ml-4 rounded-full">
                    <SignUpButton>Kostenlos Testen</SignUpButton>
                </div>
            </div>
        );
    }

    return (
        <div className="dropdown-end dropdown aspect-square h-full">
            <label
                tabIndex={0}
                className="btn-ghost btn-circle avatar btn h-full w-full"
            >
                <div className="w-5/6 rounded-full">
                    <Image
                        className="rounded-full"
                        src={user?.profileImageUrl}
                        alt={"Profile picture"}
                        width={48}
                        height={48}
                    />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="dropdown-content menu rounded-box menu-compact mt-5 w-52 bg-base-100 p-2 shadow-2xl"
            >
                <li>
                    <Link href={"/"} className="justify-between">
                        Profil
                        <span className="badge">Neu</span>
                    </Link>
                </li>
                <li>
                    <Link href={"/settings/profile"}>Einstellungen</Link>
                </li>
                <li>
                    <SignOutButton>Abmelden</SignOutButton>
                </li>
            </ul>
        </div>
    );
};
