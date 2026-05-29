// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: [
    "shimmer", 
    "shimmer-gold", 
    "animated-gradient"
  ],
  theme: {
    extend: {
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "spin-fast": {
          "5%": { transform: "rotate(-8deg)" },
          "100%": { transform: "rotate(5deg)" },
        },
        "gradient-move": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        "spin-fast": "spin-fast 5s linear infinite",
        "gradient-move": "gradient-move 6s ease infinite",
      },
    },
  },
  plugins: [],
};
