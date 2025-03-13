const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{tsx,css}"],
  theme: {
    extend: {
      keyframes: {
        bounceInline: {
          "0%, 100%": { transform: "translateX(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" },
          "50%": { transform: "none", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" }
        },
        pluse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 }
        },
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
      bounceInline: "bounceInline 1s infinite",
      pluse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
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
          backgroundImage: `linear-gradient(135deg, ${theme("colors.blue.100")}, ${theme("colors.purple.50")})`
        },
        ".gradient-200": {
          backgroundImage: `linear-gradient(135deg, ${theme("colors.blue.200")}, ${theme("colors.purple.200")})`
        },
        ".gradient-300": {
          backgroundImage: `linear-gradient(135deg, ${theme("colors.blue.300")}, ${theme("colors.purple.300")})`
        },
        ".gradient-400": {
          backgroundImage: `linear-gradient(135deg, ${theme("colors.blue.400")}, ${theme("colors.purple.400")})`
        },
        ".gradient-500": {
          backgroundImage: `linear-gradient(135deg, ${theme("colors.blue.500")}, ${theme("colors.purple.500")})`
        },
        ".gradient-600": {
          backgroundImage: `linear-gradient(135deg, ${theme("colors.blue.600")}, ${theme("colors.purple.600")})`
        }
      });
    })
  ]
};
