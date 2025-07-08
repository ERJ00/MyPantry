/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#BFD8EB", // Powder Blue
        accent: "#CDEAC0", // Mint Green
        secondaryAccent: "#E4D9F9",
        warning: "#FFE5B4", // Pastel Orange
        error: "#FFC8C2", // Soft Red
        background: "#FFFAF5", // Cream Background
        card: "#FFFFFF", // White card
        textPrimary: "#333333", // Charcoal
        textMuted: "#777777", // Dark Gray

        // ✅ Semantic cards & text colors
        cardRed: "#FFE4E1", // Light red card
        cardYellow: "#FFF9DB", // Light yellow card
        cardGreen: "#E5F9E0", // Light green card
        cardOrange: "#FFEFD5", // Light orange card

        textRed: "#C62828", // Strong red text
        textYellow: "#F9A825", // Mustard yellow text
        textGreen: "#2E7D32", // Forest green text
        textOrange: "#EF6C00", // Deep orange text
      },
      fontFamily: {
        heading: ["PlayfairBold"],
        body: ["OutfitRegular"],
        soft: ["DMSansRegular"],
        modern: ["SpaceGroteskRegular"],
      },
      borderColor: {
        background: "#FFFAF5",
      },
    },
  },
  plugins: [],
};
