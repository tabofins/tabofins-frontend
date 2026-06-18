import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: "#040d1f",
                deep: "#070f2a",
                electric: "#1a6cff",
                gold: "#f0b429",
                gold2: "#ffd166",
                tfsgreen: "#00e5a0",
            },
            fontFamily: {
                syne: ["Syne", "sans-serif"],
                dm: ["DM Sans", "sans-serif"],
            },
        },
    },
    plugins: [],
};
export default config;