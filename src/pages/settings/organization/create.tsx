import Head from "next/head";
import React, { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { Navbar } from "~/components/Navbar/Navbar";
import { BaseLayout } from "~/components/Settings/BaseLayout";
import { type UserResource } from "@clerk/types";
import { useUser } from "@clerk/nextjs";
import { type UploadRouter } from "~/server/uploadthing";
import toast from "react-hot-toast";
import { DebounceInput } from "react-debounce-input";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Image from "next/image";
import { z } from "zod";
import { AiOutlineClose } from "react-icons/ai";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineCreate } from "react-icons/md";

const Create = () => {
    const { user, isLoaded } = useUser();
    const [name, setName] = useState("");
    const [image, setImage] = useState("");

    return (
        <>
            <Head>
                <title>Abrechnungspläne</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen w-full">
                <Navbar />
                <BaseLayout user={user as UserResource} isLoaded={isLoaded}>
                    <>
                        <div className="breadcrumbs text-sm">
                            <ul>
                                <li>
                                    <CgOrganisation className="mr-2 h-4 w-4" />
                                    <span>Organisation</span>
                                </li>
                                <li>
                                    <MdOutlineCreate className="mr-2 h-4 w-4" />
                                    <span>Erstellen</span>
                                </li>
                            </ul>
                        </div>
                        <section>
                            <h1 className="text-2xl">Organization</h1>
                            <div className="divider my-2" />

                            <div className="max-w-2xl">
                                <div className="flex flex-row gap-10">
                                    {image ? (
                                        <label
                                            htmlFor="image-modal"
                                            className="indicator cursor-pointer"
                                        >
                                            <button
                                                onClick={() => setImage("")}
                                                className="indicator-item badge-error badge h-5 w-5 p-0 shadow"
                                            >
                                                <AiOutlineClose />
                                            </button>
                                            <div className="avatar w-24 rounded-lg">
                                                <Image
                                                    src={image}
                                                    alt={"Organisations Bild"}
                                                    width={96}
                                                    height={96}
                                                />
                                            </div>
                                        </label>
                                    ) : (
                                        <div className="placeholder avatar">
                                            <div className="w-24 rounded-lg bg-neutral-focus text-neutral-content"></div>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-2.5">
                                        <h2 className="text-lg">
                                            {"Organisation's Bild"}
                                        </h2>
                                        <UploadButton<UploadRouter>
                                            endpoint="imageUploader"
                                            multiple={false}
                                            onClientUploadComplete={(res) => {
                                                if (!res) return;
                                                if (!res[0]) return;

                                                const image = res[0].fileUrl;
                                                const schema = z
                                                    .string()
                                                    .url()
                                                    .min(1);

                                                const success =
                                                    schema.safeParse(
                                                        image
                                                    ).success;

                                                if (!success) {
                                                    toast(
                                                        "Ein Fehler beim Hochladen ist aufgetreten"
                                                    );
                                                    return;
                                                }

                                                setImage(image);
                                                toast.success(
                                                    "Organisation's Bild erfolgreich hochgeladen"
                                                );
                                            }}
                                            onUploadError={() => {
                                                toast(
                                                    "Ein Fehler beim Hochladen ist aufgetreten"
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="mt-7">
                                    <label className="text-lg">
                                        {"Organisation's Name"}
                                    </label>
                                    <DebounceInput
                                        debounceTimeout={300}
                                        className="input-bordered input mt-1.5 h-10 w-full bg-base-300"
                                        value={name}
                                        onChange={(event) =>
                                            setName(event.target.value)
                                        }
                                        type="text"
                                    />
                                </div>
                                <div className="mt-7">
                                    <div className="mb-1 flex items-center justify-end">
                                        <HiOutlineInformationCircle className="mr-0.5 text-gray-500" />
                                        <p className="w-[270px] text-xs text-gray-500">
                                            Du kannst den Namen Organisation
                                            später ändern.
                                        </p>
                                    </div>
                                    <div className="flex justify-end">
                                        <button className="btn-success btn w-[288px]">
                                            {`Bestätige ${
                                                name.length >= 1
                                                    ? name
                                                    : "die Organisation"
                                            }`}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <ImageModal image={image} />
                        </section>
                    </>
                </BaseLayout>
            </main>
        </>
    );
};

const ImageModal = (props: { image: string }) => {
    return (
        <>
            <input type="checkbox" id="image-modal" className="modal-toggle" />
            <label htmlFor="image-modal" className="modal cursor-pointer">
                <label className="modal-box w-fit" htmlFor="">
                    <figure>
                        <Image
                            src={props.image}
                            alt={"Organisations Bild"}
                            className="mx-auto"
                            width={300}
                            height={300}
                        />
                    </figure>
                </label>
            </label>
        </>
    );
};
export default Create;
