/* eslint-env node */

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/styles/main.css",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffcb05",
        second: "#3d7dca",
        third: "#003a70",
        normal: "#A8A77A",
        fire: "#EE8130",
        water: "#6390F0",
        electric: "#dfbc30",
        grass: "#7AC74C",
        ice: "#97d4d2",
        fighting: "#b83e3a",
        poison: "#A33EA1",
        ground: "#E2BF65",
        flying: "#A98FF3",
        psychic: "#F95587",
        bug: "#A6B91A",
        rock: "#B6A136",
        ghost: "#735797",
        dragon: "#6F35FC",
        dark: "#705746",
        steel: "#B7B7CE",
        fairy: "#D685AD",
        none: "#BfBfBf",
        blackRgba: "rgba(0, 0, 0, 0.54)",
      },
      minHeight: {
        main: `calc(100vh - 56px - 70px )`,
      },
      keyframes: {
        loaderPokeball: {
          "0%": { fill: "#ff2a2a;" },
          "15%": { fill: "#ff7a2a;" },
          "30%": { fill: "#ffc52a;" },
          "45%": { fill: "#43ff2a;" },
          "60%": { fill: "#2a89ff;" },
          "75%": { fill: "#202082;" },
          "90%": { fill: "#6b2aff;" },
          "100%": { fill: "#e82aff;" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        slideUp: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-100px)" },
        },
        slideDown: {
          from: { transform: "translateY(-100px)" },
          to: { transform: "translateY(0)" },
        },
      },
      animation: {
        loaderPokeball: "0.7s ease-in-out infinite",
        fadeIn: "0.5s linear",
        fadeOut: "0.25s ease-out forwards",
        slideDown: "0.25s ease-out forwards",
      },
      fontFamily: {
        PocketMonk: ["pocketMonk"],
        pretendard: ["pretendard"],
      },
    },
  },
  safelist: [{ pattern: /bg-.*/ }, { pattern: /text-.*/ }],
  darkMode: ["class", '[data-mode="dark"]'],
  plugins: [require("tailwind-scrollbar")],
};
