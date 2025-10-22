// vite.config.js

import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

import path from 'path'

import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Optional: read envs if config needs them
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: env.APP_PORT ? Number(env.APP_PORT) : 8080,
    },
      plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  };
});
