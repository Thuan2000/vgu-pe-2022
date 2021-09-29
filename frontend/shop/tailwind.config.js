module.exports = {
  mode: "jit",
  purge: {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        "3xl": "1900px",
      },
      spacing: {
        17: "70px",
      },
      fontFamily: {
        body: ["Open Sans", "system-ui", "sans-serif"],
        heading: ["Open Sans", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: "13px",
        sm: "14px",
        heading: "14px",
        paragraph: "14px",
        md: "16px",
        "display-1": "40px",
        "display-2": "32px",
        "display-3": "26px",
        "special-heading": "16px",
      },
      colors: {
        "dark-blue": "#15114E",
        light: {
          DEFAULT: "#FFFFFF",
          300: "#F1F3F3",
        },
        green: {
          DEFAULT: "#00D796",
          10: "#E7F5F1",
          hover: "#02BF86",
          active: "#01AC75",
        },
        blue: {
          DEFAULT: "#349EFF",
          hover: "#218BEC",
          active: "#107ADB",
          300: "#3C64B1",
        },
        gray: {
          10: "#EEF2F5",
          100: "#C5CDD4",
          200: "#B0BDC6",
          300: "#82868C",
          400: "#555F6F",
        },
        semibold: "#15114E",
        red: {
          DEFAULT: "#FF3346",
        },
      },
      textColor: {
        semibold: "#15114E",
      },
      fontColor: {
        semibold: "#15114E",
      },
    },
  },
  // plugins: [require("tailwindcss-rtl")]
};
