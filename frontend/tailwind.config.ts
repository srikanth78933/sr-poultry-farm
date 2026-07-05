import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        forest:      "#14532d",
        "forest-deep": "#0a3b1e",
        "amber-farm": "#d97706",
        "amber-deep": "#b45309",
        cream:       "#fdf6e3",
        kraft:       "#f5ead0",
        soil:        "#fafaf5",
        // keep farm.* aliases for any remaining code
        farm: {
          green:     "#14532d",
          greenDark: "#0a3b1e",
          gold:      "#d97706",
          cream:     "#fdf6e3",
          kraft:     "#f5ead0",
          soil:      "#fafaf5",
          muted:     "#5a7a62",
          sand:      "#c4b5a0",
          brown:     "#4a3728",
          brownDark: "#2c1e16",
          border:    "#14532d1f",
          red:       "#b91c1c",
          warm:      "#f5ead0",
          parchment: "#fdf6e3",
          leaf:      "#5a7a62",
        },
      },
      fontFamily: {
        serif:   ['"Crimson Pro"', "ui-serif", "Georgia", "serif"],
        sans:    ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        telugu:  ["Ramabhadra", '"Noto Sans Telugu"', "serif"],
        display: ['"Crimson Pro"', "Georgia", "serif"],
      },
      boxShadow: {
        craft: "0 1px 0 rgb(20 83 45 / 0.04), 0 8px 24px -12px rgb(20 83 45 / 0.15)",
        lift:  "0 10px 40px -18px rgb(20 83 45 / 0.35)",
      },
      borderRadius: {
        sm: "0.1875rem",
      },
    },
  },
  plugins: [],
};
export default config;
