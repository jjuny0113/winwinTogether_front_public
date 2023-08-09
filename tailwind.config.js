/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./stories/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      colors: {
        monoGray1: "#F9F9F9",
        monoGray2: "#E1E1E1",
        monoGray3: "#B5B5B5",
        monoGray4: "#767676",
        monoGray5: "#505050",
        monoGray6: "#252525",
        monoGrayDisable: "rgba(255, 255, 255, 0.6)",
        errorPink: "#E85B81",
        warnOrange: "#FFA500",
        lightGray: "#F0F0F0",

        purpleLight: "#F3EBFF", // Lavender Mist
        purpleLightHover: "#E7D7FF", // Lilac Ash
        purpleLightActive: "#DABEFF", // Periwinkle

        purpleMedium: "#CD9EFF", // Light Wisteria
        purpleLavendar: "#C083FF", // Medium Purple
        purpleLoyal: "#B46FFF", // Rich Lavender
        purpleMain: "#A75AFF", // Royal Purple
        purpleMainHover: "#9B46E4", // Main Color: Deep Orchid
        purpleMainBg: "#7843bd",
        purpleMainActive: "#8E36CC", // Dark Violet
        purplePrimaryDarker: "#822FB3", // Grape Purple
        purplePrimaryDarkerDisable: "#752798", // Dark Plum
      },
      boxShadow: {
        buttonShadow: "2px 3px 7px rgba(16, 16, 16, 0.2)",
        middleShadow: "-2px 17px 34px -7px rgba(0,0,0,0.52)",
      },
      dropShadow: {
        "3xl": "0 100px 100px rgb(0, 0, 0)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
        test: "0 100px 100px rgb(0, 0, 0)",
        textShadow: "3.6px 7.2px 21.6px rgba(16, 16, 16, 0.25)",
      },

      keyframes: {
        load: {
          "0%, 100%": {
            boxShadow:
              "0 -3em 0 0.2em, 2em -2em 0 0em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 0",
          },
          "12.5%": {
            boxShadow:
              "0 -3em 0 0, 2em -2em 0 0.2em, 3em 0 0 0, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em",
          },
          "25%": {
            boxShadow:
              "0 -3em 0 -0.5em, 2em -2em 0 0, 3em 0 0 0.2em, 2em 2em 0 0, 0 3em 0 -1em, -2em 2em 0 -1em, -3em 0 0 -1em, -2em -2em 0 -1em",
          },
          "37.5%": {
            boxShadow:
              "0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 0, 2em 2em 0 0.2em, 0 3em 0 0em, -2em 2em 0 -1em, -3em 0em 0 -1em, -2em -2em 0 -1em",
          },
          "50%": {
            boxShadow:
              "0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 0em, 0 3em 0 0.2em, -2em 2em 0 0, -3em 0em 0 -1em, -2em -2em 0 -1em",
          },
          "62.5%": {
            boxShadow:
              "0 -3em 0 -1em, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 0, -2em 2em 0 0.2em, -3em 0 0 0, -2em -2em 0 -1em",
          },
          "75%": {
            boxShadow:
              "0em -3em 0 -1em, 2em -2em 0 -1em, 3em 0em 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0.2em, -2em -2em 0 0",
          },
          "87.5%": {
            boxShadow:
              "0em -3em 0 0, 2em -2em 0 -1em, 3em 0 0 -1em, 2em 2em 0 -1em, 0 3em 0 -1em, -2em 2em 0 0, -3em 0em 0 0, -2em -2em 0 0.2em",
          },
        },
        smallLoad: {
          "0%, 100%": {
            boxShadow:
              "0 -1.5em 0 0.2em, 1em -1em 0 0em, 1.5em 0 0 -1em, 1em 1em 0 -1em, 0 1.5em 0 -1em, -1em 1em 0 -1em, -1.5em 0 0 -1em, -1em -1em 0 0",
          },
          "11.5%": {
            boxShadow:
              "0 -1.5em 0 0, 1em -1em 0 0.1em, 1.5em 0 0 0, 1em 1em 0 -1em, 0 1.5em 0 -1em, -1em 1em 0 -1em, -1.5em 0 0 -1em, -1em -1em 0 -1em",
          },
          "15%": {
            boxShadow:
              "0 -1.5em 0 -0.5em, 1em -1em 0 0, 1.5em 0 0 0.1em, 1em 1em 0 0, 0 1.5em 0 -1em, -1em 1em 0 -1em, -1.5em 0 0 -1em, -1em -1em 0 -1em",
          },
          "1.57.5%": {
            boxShadow:
              "0 -1.5em 0 -1em, 1em -1em 0 -1em, 1.5em 0em 0 0, 1em 1em 0 0.1em, 0 1.5em 0 0em, -1em 1em 0 -1em, -1.5em 0em 0 -1em, -1em -1em 0 -1em",
          },
          "50%": {
            boxShadow:
              "0 -1.5em 0 -1em, 1em -1em 0 -1em, 1.5em 0 0 -1em, 1em 1em 0 0em, 0 1.5em 0 0.1em, -1em 1em 0 0, -1.5em 0em 0 -1em, -1em -1em 0 -1em",
          },
          "61.5%": {
            boxShadow:
              "0 -1.5em 0 -1em, 1em -1em 0 -1em, 1.5em 0 0 -1em, 1em 1em 0 -1em, 0 1.5em 0 0, -1em 1em 0 0.1em, -1.5em 0 0 0, -1em -1em 0 -1em",
          },
          "75%": {
            boxShadow:
              "0em -1.5em 0 -1em, 1em -1em 0 -1em, 1.5em 0em 0 -1em, 1em 1em 0 -1em, 0 1.5em 0 -1em, -1em 1em 0 0, -1.5em 0em 0 0.1em, -1em -1em 0 0",
          },
          "87.5%": {
            boxShadow:
              "0em -1.5em 0 0, 1em -1em 0 -1em, 1.5em 0 0 -1em, 1em 1em 0 -1em, 0 1.5em 0 -1em, -1em 1em 0 0, -1.5em 0em 0 0, -1em -1em 0 0.1em",
          },
        },
      },
      animation: {
        load: "load 1.3s infinite linear",
        smallLoad: "smallLoad 1.3s infinite linear",
      },
    },
  },
  plugins: ["@key", require("tailwind-scrollbar-hide")],
};
