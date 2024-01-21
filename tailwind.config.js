const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{tsx,css}"],
  theme: {
    extend: {
      keyframes: {
        scaleUp: {
          from: { transform: "scale(0.8)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 }
        },
        scaleDown: {
          from: { transform: "scale(1.1)", opacity: 0 },
          to: { transform: "scale(1)", opacity: 1 }
        },
        slideFromLeft: {
          from: { transform: "translateX(-2rem)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 }
        },
        slideFromRight: {
          from: { transform: "translateX(2rem)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 }
        },
        slideFromTop: {
          from: { transform: "translateY(-2rem)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 }
        },
        slideFromBottom: {
          from: { transform: "translateY(2rem)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 }
        }
      }
    },
    animation: {
      scaleUp: "scaleUp ease-out 500ms",
      scaleDown: "scaleDown ease-out 500ms",
      slideFromLeft: "slideFromLeft ease-out 500ms",
      slideFromRight: "slideFromRight ease-out 500ms",
      slideFromTop: "slideFromTop ease-out 500ms",
      slideFromBottom: "slideFromBottom ease-out 500ms"
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        ".gradient-50": {
          backgroundImage: `linear-gradient(135deg, ${theme("colors.blue.50")}, ${theme("colors.purple.50")})`
        },
        ".gradient-100": {
          backgroundImage: `linear-gradient(135deg, ${theme("colors.blue.100")}, ${theme("colors.purple.100")})`
        }
      });
    })
  ]
};
