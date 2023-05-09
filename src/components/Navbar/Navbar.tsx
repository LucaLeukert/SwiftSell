import { type NextPage } from "next";
import { ProfilePicture } from "~/components/Navbar/ProfilePicture";

export const Navbar: NextPage = () => {
    return (
        <div className="navbar sticky top-0 z-[200] h-20 bg-base-100 shadow-xl">
            <div className="flex-1">
                <a className="btn-ghost btn text-xl normal-case">SwiftSell</a>
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
