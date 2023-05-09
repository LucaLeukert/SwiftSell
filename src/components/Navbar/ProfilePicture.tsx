import { type NextPage } from "next";
import { SignInButton, SignOutButton, SignUpButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

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
                    {user?.firstName?.at(0)}{" "}
                    {user?.lastName?.at(0)}
                </span>
              </div>
          </div>
        );
    }

    if (isLoaded && !isSignedIn) {
        return (
          <div className="hover:bg-transparent flex flex-row">
              <div
                className="hover:underline sm:hidden md:hidden lg:flex">
                  <SignInButton>Einloggen</SignInButton>
              </div>
              <div className="btn rounded-full ml-4">
                  <SignUpButton>
                      Kostenlos Testen
                  </SignUpButton>
              </div>
          </div>
        );
    }

    return (
      <div className="dropdown dropdown-end h-full aspect-square">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar h-full w-full">
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
          <ul tabIndex={0}
              className="mt-5 p-2 shadow menu menu-compact shadow-2xl dropdown-content bg-base-100 rounded-box w-52">
              <li>
                  <Link href={"/"} className="justify-between">
                      Profil
                      <span className="badge">Neu</span>
                  </Link>
              </li>
              <li><Link href={"/settings/profile"} >Einstellungen</Link></li>
              <li><SignOutButton>Abmelden</SignOutButton></li>
          </ul>
      </div>
    );
};