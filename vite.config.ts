import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        "/api/monitor": {
          target: env.VITE_MONITOR_API_TARGET,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/monitor/, "/monitor"),
          secure: true,
        },
      },
    },
  };
});
