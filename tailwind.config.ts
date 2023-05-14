import { type Config } from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    ],
    theme: {
        extend: {
            colors: {
                daisy: {
                    border: "rgba(166, 173, 187, 0.2)",
                },
            },
        },
        screens: {
            sm: "100px",

            md: "500px",

            lg: "1000px",

            xl: "1280px",

            "2xl": "1536px",
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("daisyui"),
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-var-requires
        require("tailwind-scrollbar")({ nocompatible: true }),
    ],
} satisfies Config;
