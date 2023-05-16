import { type AppType } from "next/app";
import "@uploadthing/react/styles.css";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import React from "react";
import { Toaster } from "react-hot-toast";

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <ClerkProvider>
            <Toaster />
            <Component {...pageProps} />
        </ClerkProvider>
    );
};

export default api.withTRPC(MyApp);
