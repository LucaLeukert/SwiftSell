import { type NextPage } from "next";
import { ProfilePicture } from "~/components/Navbar/ProfilePicture";

export const Navbar: NextPage = () => {

    return (
      <div className="navbar sticky top-0 z-[200] h-20 bg-base-100">
          <div className="flex-1">
              <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
          </div>
          <div className="flex-none gap-6 h-full">
              <div className="form-control sm:hidden md:flex justify-center h-full">
                  <input type="text" placeholder="Search" className="input input-bordered md:input-md lg:input-lg !h-2/3" />
              </div>
              <ProfilePicture/>
          </div>
      </div>
    );
};

//user?.profileImageUrl
