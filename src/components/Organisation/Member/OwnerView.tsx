import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { useOrganization } from "@clerk/nextjs";
import { type OrganizationMembershipResource } from "@clerk/types";

export const MemberView = () => {
    const { organization, isLoaded } = useOrganization();
    const owner = useRef<OrganizationMembershipResource>();

    useEffect(() => {
        void (async () => {
            await organization?.getMemberships().then((memberships) => {
                memberships.map((membership) => {
                    if (membership.role === "admin") {
                        owner.current = membership;
                        return;
                    }
                });
            });
        })();
    }, [organization, isLoaded]);

    return (
        <div className="card card-compact w-full bg-[#181a1b] shadow-xl">
            <div className="card-body gap-0">
                <div className="flex justify-between">
                    <h2 className="card-title text-slate-300">
                        Organisations-Inhaber
                    </h2>
                    <span className="link-accent link inline-block align-text-bottom">
                        Inhaberschaft übertragen
                    </span>
                </div>
                <div className="h-fit pt-4">
                    <div className="flex h-full flex-row items-center gap-4">
                        <figure className="avatar h-12 w-12">
                            <Image
                                src={
                                    owner.current?.publicUserData
                                        .profileImageUrl as string
                                }
                                alt={
                                    owner.current?.publicUserData
                                        .firstName as string
                                }
                                className="rounded-full"
                                width={48}
                                height={48}
                            />
                        </figure>
                        <div>
                            <h2 className="text-blue-400">
                                {owner.current?.publicUserData.identifier}
                            </h2>
                            <p>
                                Letzter Login am Freitag, 19. Mai 2023 19:40
                                MESZ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="divider my-0 h-fit" />
            <div className="card-body rounded-b-2xl bg-[#1b1d1e]">
                <p>
                    Der Shop-Inhaber hat die Vollmacht über {organization?.name}
                    . Der Inhaber kann Mitglieder aus der Organisation entfernen
                    oder Änderungen am Online-Store vornehmen.
                </p>
            </div>
        </div>
    );
};
