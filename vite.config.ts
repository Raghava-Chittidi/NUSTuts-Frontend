import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "https://nustuts-backend.onrender.com",
        changeOrigin: true,
      },
    },
  },
  // This is to resolve the issue with react-windowed-select causing
  // "Failed to resolve entry for package react-windowed-select."
  // https://github.com/jacobworrel/react-windowed-select/issues/127
  resolve: {
    alias: {
      "react-windowed-select": "react-windowed-select/dist/main.js",
    },
  },
});
