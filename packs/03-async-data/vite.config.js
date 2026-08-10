import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vitest config lives inline here (the `test` key).
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/shared/setupTests.js",
    css: false,
  },
});
