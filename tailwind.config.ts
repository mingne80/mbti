import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17202A",
        line: "#D9E0E7",
        panel: "#F7F9FB",
        brand: "#2F6F73",
        coral: "#D96C5F",
        amber: "#D89B32",
        plum: "#7B5EA7"
      }
    }
  },
  plugins: []
};

export default config;
