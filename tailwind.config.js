// tailwind.config.js
module.exports = {
  darkMode: "class", // Use class-based dark mode
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: {
        DEFAULT: {
          width: "3px",
          height: "3px",
        },
        thumb: {
          backgroundColor: "#888",
          borderRadius: "10px",
          hover: {
            backgroundColor: "#555",
          },
        },
        track: {
          backgroundColor: "#f1f1f1",
          borderRadius: "10px",
        },
      },
    },
  },
  plugins: [],
};
