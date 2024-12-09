import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist",
    assetsDir: ".",
    minify: true,
    sourcemap: false,
  },
});
