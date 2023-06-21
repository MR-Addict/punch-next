/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        dark: "#20232a",
        light: "#2c3036"
      },
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
      scaleUp: "scaleUp ease-out 700ms",
      scaleDown: "scaleDown ease-out 700ms",
      slideFromLeft: "slideFromLeft ease-out 700ms",
      slideFromRight: "slideFromRight ease-out 700ms",
      slideFromTop: "slideFromTop ease-out 700ms",
      slideFromBottom: "slideFromBottom ease-out 700ms"
    }
  },
  plugins: []
};
