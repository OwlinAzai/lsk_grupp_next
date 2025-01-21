import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-oswald)"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brown: "#371710",
        yellow: "#FCCA27",
        gray: "#E4E4E4",
        black: "#000000",
        white: "#FFFFFF",
        textgray: "#3E4239",
      },
    },
  },
  plugins: [],
} satisfies Config;
