/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        // primary: "#020106",
        // "regal-blue": "#243c5a",
        // secondary: "#aaa6c3",
        // tertiary: "#151030",
        // "black-100": "#100d25",
        // "black-200": "#090325",
        // "white-100": "#f3f3f3",
      },
      // boxShadow: {
      //   card: "0px 35px 120px -15px #7885cc",
      // },
      screens: {
        xs: "450px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xxl: "1536px",
      },

      backgroundImage: {
        // https://csstailwind.com/3-ways-to-add-background-image-in-tailwindcss/#:~:text=You%20can%20add%20a%20custom,that%20adds%20a%20background%20image.
        //to add custom background image
        //all customs bg
        // "whole-pattern": "url('/src/assets/wholeBg.png')",
      },
    },
  },
  plugins: [],
};
