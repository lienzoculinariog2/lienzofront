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
        'primary-bg': {
          100: '#8C8C8C',
          200: '#7A7A7A',
          300: '#696969',
          400: '#575757',
          500: '#131313',  //Color base
          600: '#0F0F0F',
          700: '#0B0B0B',
          800: '#080808',
          900: '#040404',
        },
        'secondary-bg': {
          100: '#E9E9E9',
          200: '#D7D7D7',
          300: '#C5C5C5',
          400: '#A1A1A1',
          500: '#717171',  //Color base
          600: '#616161',
          700: '#525252',
          800: '#434343',
          900: '#353535',
        },
        'text-primary': {
          100: '#FFFFFF',
          200: '#FAFAFA',
          300: '#F5F5F5',
          400: '#EBEBEB',
          500: '#D9D9D9',  //Color base
          600: '#C4C4C4',
          700: '#ADADAD',
          800: '#8A8A8A',
          900: '#6E6E6E',
        },
        'text-secondary': {
          100: '#FFFFFF',
          200: '#F9F9F9',
          300: '#F5F5F5',
          400: '#E6E6E6',
          500: '#D7D7D7',  //Color base
          600: '#C8C8C8',
          700: '#B4B4B4',
          800: '#969696',
          900: '#6C6C6C',
        },
        "daily-menu": {
          100: '#FCE0E0',
          200: '#FAC0C0',
          300: '#F8A0A0',
          400: '#F76060',
          500: '#F93131',  //Color base
          600: '#DC2727',
          700: '#BD1D1D',
          800: '#9E1414',
          900: '#800A0A',
        },
        "celiac": {
          100: '#FFF8EC',
          200: '#FFF3D9',
          300: '#FFEECA',
          400: '#FFE7A2',
          500: '#FFE074',  //Color base
          600: '#DBC263',
          700: '#B8A453',
          800: '#958742',
          900: '#726932',
        },
        "vegetarian": {
          100: '#CFF8D3',
          200: '#A9F0B1',
          300: '#84E791',
          400: '#57D365',
          500: '#70D17D',  //Color base
          600: '#5EB169',
          700: '#4B9255',
          800: '#387341',
          900: '#26542D',
        },
        'low-calories': {
          100: '#EDF6FF',
          200: '#D4EBFF',
          300: '#BBDFFF',
          400: '#96CBFF',
          500: '#C2E5FF',  //Color base
          600: '#8EB4E8',
          700: '#7498C2',
          800: '#5B7C9C',
          900: '#436077',
        },
        'vegan': {
          100: '#C7F8C7',
          200: '#A5F2A5',
          300: '#83E583',
          400: '#55D455',
          500: '#2EA53E',  //Color base
          600: '#248431',
          700: '#196324',
          800: '#11461A',
          900: '#092911',
        },
      },
    },
  },
  plugins: [],
}






