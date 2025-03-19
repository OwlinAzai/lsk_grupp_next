import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'underline-gradient': 'linear-gradient(to right, #ff6800, #FCCA27)',
      },
      fontFamily: {
        sans: ["var(--font-oswald)"],
        light: ["var(--font-oswald-wght)"],
        regular: ["Oswald", "regular"],
        semiBold: ["Oswald", "semiBold"],
        bold: ["Oswald", "bold"],
      },
      fontSize: {
        "2.5xl": "1.6875rem",
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
      fontWeight: {
        light: "300", // Добавляем light начертание
        normal: "400",
        medium: "500",
        semiBold: "600",
        bold: "700",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.underline-gradient': {
          position: 'relative',
          textDecoration: 'none',
        },
        '.underline-gradient::after': {
          content: '""',
          position: 'absolute',
          left: '0',
          bottom: '-2px',
          width: '100%',
          height: '2px',
          backgroundImage: 'var(--tw-gradient-underline)',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
} satisfies Config;
