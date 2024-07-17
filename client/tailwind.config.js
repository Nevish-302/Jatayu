/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "prime-blue": "#120A8F",
        "font-black": "#000000",
        "font-grey": "#5E5E5E",
        "banner-grey": "#F2F2FF",
        "card-fill": "#F8F9FF",

        // dark screen
      },
      backgroundImage: {
        "gradient-prime": "linear-gradient(to top, #ff0844 0%, #ffb199 100%)",
        "gradient-hover": "linear-gradient(-60deg, #ff5858 0%, #f09819 100%)",
        "dark-side-nav":
          " linear-gradient(159.02deg, #0F123B 14.25%, #090D2E 56.45%, #020515 86.14%);",
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
    },
  },
  plugins: [],
};
