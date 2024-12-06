/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      width: {
        35: "35%",
      },
      height: {
        500: "500px",
      },
    },
  },
  plugins: [],
};
