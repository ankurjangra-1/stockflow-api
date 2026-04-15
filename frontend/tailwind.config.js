/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#2563eb",
          600: "#1d4ed8",
          700: "#1e40af",
          900: "#0f172a",
        },
        accent: "#f97316",
        canvas: "#f8fafc",
        ink: "#0f172a",
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.10)",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at 20% 20%, rgba(37,99,235,0.20), transparent 25%), radial-gradient(circle at 80% 0%, rgba(249,115,22,0.16), transparent 28%), linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        slideUp: "slideUp 320ms ease-out",
      },
    },
  },
  plugins: [],
};
