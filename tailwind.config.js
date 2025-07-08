/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#BFD8EB", // Powder Blue (Keep - soft and versatile)
        accent: "#CDEAC0", // Mint Green (Keep - gentle and fresh)
        secondaryAccent: "#E4D9F9", // Slightly lighter lavender for better card contrast
        warning: "#FFE5B4", // Lighter pastel orange for less harshness
        error: "#FFC8C2", // Softer red to reduce visual tension
        background: "#FFFAF5", // Slightly brighter cream for better contrast with white cards
        card: "#FFFFFF", // Clean white for cards and containers
        textPrimary: "#333333", // Charcoal (Keep - excellent readability)
        textMuted: "#777777", // Slightly darker muted text for improved visibility
      },
      fontFamily: {
        heading: ["Poppins", "sans-serif"],
        body: ["Quicksand", "sans-serif"],
        soft: ["Nunito", "sans-serif"],
        modern: ["Outfit", "sans-serif"],
      },
      fontSize: {
        h1: [28, { lineHeight: "36px" }],
        h2: [24, { lineHeight: "32px" }],
        body: [16, { lineHeight: "24px" }],
        label: [14, { lineHeight: "20px" }],
      },
    },
  },
  plugins: [],
};
