import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato","sans-serif"],
        raleway: ["Raleway","sans-serif"]
      },
      colors:{
        nav: "#050540",
        page: "#fdfdff",
        table: "#cad6db",
        logo: "#eb0000",
        "button-hover":"#f27474",
        "default-text": "#050540"
      }
    },
  },
  plugins: [nextui()],
};
export default config;
