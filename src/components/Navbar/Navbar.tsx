import { type NextPage } from "next";
import { ProfilePicture } from "~/components/Navbar/ProfilePicture";
import Link from "next/link";

export const Navbar: NextPage = () => {
    return (
        <div className="navbar sticky top-0 z-[200] h-20 bg-base-100 shadow-xl">
            <div className="flex-1">
                <Link href="/" className="btn-ghost btn text-xl normal-case">
                    SwiftSell
                </Link>
            </div>
            <div className="h-full flex-none gap-6">
                <div className="form-control h-full justify-center sm:hidden md:flex">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input-bordered input !h-5/6 md:input-md lg:input-lg xl:w-80"
                    />
                </div>
                <ProfilePicture />
            </div>
        </div>
    );
};

//user?.profileImageUrl
