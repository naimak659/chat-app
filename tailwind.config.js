/** @type {import('tailwindcss').Config} */
import animations from "@midudev/tailwind-animations";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "cs-blue": "#11175D",
        "cs-gray": "#000",
        "cs-deepBlue": "#03014C",
        "cs-purple": "#5F35F5",
        warning: "#EA6C00",
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      animation: {
        jiggle: "jiggle .6s  infinite",
        scale: "scale .2s infinite",
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("tailwind-scrollbar"),
    // animations,
  ],
};
