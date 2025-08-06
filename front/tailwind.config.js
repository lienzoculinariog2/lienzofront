/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-background": {
          100: "#8C8C8C",
          200: "#7A7A7A",
          300: "#696969",
          400: "#575757",
          500: "#131313", //Color base
          600: "#0F0F0F",
          700: "#0B0B0B",
          800: "#080808",
          900: "#040404",
        },
        "secondary-background": {
          100: "#E9E9E9",
          200: "#D7D7D7",
          300: "#C5C5C5",
          400: "#A1A1A1",
          500: "#717171", //Color base
          600: "#616161",
          700: "#525252",
          800: "#434343",
          900: "#353535",
        },
        "primary-txt": {
          100: "#FFFFFF",
          200: "#FAFAFA",
          300: "#F5F5F5",
          400: "#EBEBEB",
          500: "#D9D9D9", //Color base
          600: "#C4C4C4",
          700: "#ADADAD",
          800: "#8A8A8A",
          900: "#6E6E6E",
        },
        "secondary-txt": {
          100: "#F5F5F5",
          200: "#E6E6E6",
          300: "#D7D7D7",
          400: "#BEBEBE",
          500: "#A1A1A1", // ¡Nuevo Color Base!
          600: "#898989",
          700: "#717171",
          800: "#5A5A5A",
        },
        "daily-menu": {
          100: "#FFE6E0",
          200: "#FFCCC0",
          300: "#FFB3A1",
          400: "#F06E4A",
          500: "#D92D07", // Color base naranja
          600: "#B02506",
          700: "#871D05",
          800: "#5E1504",
          900: "#360C02",
        },
        celiac: {
          100: "#FFF5D6",
          200: "#FFE8AD",
          300: "#FFDB85",
          400: "#F7C95B",
          500: "#F2B705", // Color base amarillo
          600: "#C29304",
          700: "#916E03",
          800: "#614902",
          900: "#302401",
        },
        vegetarian: {
          100: "#E4F0D6",
          200: "#C7E0B3",
          300: "#AAD090",
          400: "#84B855",
          500: "#537902", // ¡Nuevo Color Base!
          600: "#426002",
          700: "#324801",
          800: "#213101",
          900: "#111900",
        },
        "low-calories": {
          100: "#F2D3D3",
          200: "#E0B5B5",
          300: "#CD9797",
          400: "#A45E5E",
          500: "#730202", // Color base bordo
          600: "#5F0202",
          700: "#4B0101",
          800: "#360101",
          900: "#220101",
        },
        vegan: {
          100: "#FFF0D9",
          200: "#FFE1B3",
          300: "#FFD28D",
          400: "#F2B94A",
          500: "#D98F07", // Color base dorado
          600: "#B07506",
          700: "#875B05",
          800: "#5E4103",
          900: "#362702",
        },
      },
    },
  },
  plugins: [],
};