module.exports = {
  content: ["./src/**/*.{html,js,njk}"],
  theme: {
    extend: {
      colors: {
        midnight: "#1b1d21",
        fog: "#f5f5f7",
        accent: "#0a84ff",
        accentSoft: "#5eb7ff",
        highlight: "#64d2ff",
        surface: "#22252b",
        surfaceSoft: "#292c33",
        surfaceHighlight: "#31343c",
        border: "#3b3e46"
      },
      fontFamily: {
        sans: [
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        mono: ["JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
        display: ["SF Pro Display", "Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 40px 80px -40px rgba(10, 16, 28, 0.75)",
        subtle: "0 25px 50px -35px rgba(6, 8, 12, 0.6)",
        immersion: "0 50px 120px -60px rgba(6, 8, 14, 0.65)"
      }
    }
  },
  plugins: []
};
