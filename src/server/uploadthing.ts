import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { getAuth } from "@clerk/nextjs/server";

const f = createUploadthing();

export const uploadRouter = {
    imageUploader: f
        .fileTypes(["image"])
        .maxSize("32MB")
        .middleware((req) => {
            const user = getAuth(req);

            if (!user) throw new Error("Unauthorized");

            return { userId: user.userId };
        })
        .onUploadComplete(({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);
        }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
