import path from "node:path";

import svgr from "@svgr/rollup";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  },
  server: {
    host: true,
    port: 3000,
  },
});
