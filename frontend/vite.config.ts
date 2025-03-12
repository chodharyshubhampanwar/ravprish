import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path"; // Import the path module

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // The crucial part!
    },
  },
});
