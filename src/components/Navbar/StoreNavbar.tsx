import { type NextPage } from "next";
import { ProfilePicture } from "~/components/Navbar/ProfilePicture";
import { AiOutlineShoppingCart } from "react-icons/all";
import Link from "next/link";

export const StoreNavbar: NextPage = () => {
    return (
        <div className="navbar sticky top-0 z-[200] h-20 bg-base-100 shadow-xl">
            <div className="flex-1">
                <Link href="/" className="btn-ghost btn text-xl normal-case">
                    SwiftSell
                </Link>
            </div>
            <div className="h-full flex-none gap-6">
                <div className="dropdown-end dropdown aspect-square h-full">
                    <div className="flex h-full w-full items-center justify-center">
                        <label
                            tabIndex={0}
                            className="btn-ghost btn-circle btn"
                        >
                            <div className="indicator">
                                <AiOutlineShoppingCart className="h-7 w-7" />
                                <span className="badge badge-sm indicator-item">
                                    8
                                </span>
                            </div>
                        </label>
                    </div>
                    <div
                        tabIndex={0}
                        className="card dropdown-content card-compact mt-5 w-52 translate-x-[-7px] bg-base-100 shadow"
                    >
                        <div className="card-body">
                            <span className="text-lg font-bold">8 Items</span>
                            <span className="text-info">Subtotal: $999</span>
                            <div className="card-actions">
                                <button className="btn-primary btn-block btn">
                                    View cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <ProfilePicture />
            </div>
        </div>
    );
};

//user?.profileImageUrl
