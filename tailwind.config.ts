import { type Config } from "tailwindcss";

export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./node_modules/tailwind-datepicker-react/dist/**/*.js",
    ],
    theme: {
        screens: {
            sm: "100px",

            md: "500px",

            lg: "1000px",

            xl: "1280px",

            "2xl": "1536px",
        },
    },
    plugins: [
        /*
        require("@tailwindcss/typography"),*/
        require("daisyui"),
        require("tailwind-scrollbar")({ nocompatible: true }),
    ],
} satisfies Config;
