const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",

  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "base-black": "#333333",
        "base-gray-1": "#646464",
        "base-gray-2": "#979797",
        "base-gray-3": "#CACACA",
        "base-gray-4": "#F2F2F2",
        "base-gray-5": "#F5F5F5"
      },
      fontFamily: {
        source: ["source-sans-pro", ...defaultTheme.fontFamily.sans],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
  ],
};