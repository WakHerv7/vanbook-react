/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        "vanbook-primary": '#2E2F5B',
        "vanbook": {
          "100": '#2E2F5B33',
          "300": '#2E2F5B55',
          "500": '#2E2F5B',
        }
      },
    },
  },
  plugins: [],
};