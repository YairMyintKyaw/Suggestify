/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#606C38",
        darkGreen: "#283618",
        primary: "#FEFAE0",
        brown: "#DDA15E",
        red: "#EB0B0B",
      },
    },
    fontFamily: {
      openSans: ["Open Sans"],
      helvetica_compressed: "Helvetica_compressed",
    },
  },
  plugins: [],
};
