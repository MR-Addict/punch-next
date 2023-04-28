/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        slideFromLeft: {
          from: { transform: 'translateX(-1rem)', opacity: 0 },
          to: { transform: 'translateX(0)', opacity: 1 }
        },
        slideFromRight: {
          from: { transform: 'translateX(1rem)', opacity: 0 },
          to: { transform: 'translateX(0)', opacity: 1 }
        },
        slideFromTop: {
          from: { transform: 'translateY(-1rem)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 }
        },
        slideFromBottom: {
          from: { transform: 'translateY(1rem)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 }
        }
      }
    },
    animation: {
      slideFromLeft: "slideFromLeft ease 700ms",
      slideFromRight: "slideFromRight ease 700ms",
      slideFromTop: "slideFromTop ease 700ms",
      slideFromBottom: "slideFromBottom ease 700ms",
    }
  },
  plugins: [],
}
