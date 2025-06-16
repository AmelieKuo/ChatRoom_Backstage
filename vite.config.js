import UnoCSS from "unocss/vite";
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig((config) => {
  const { mode } = config;
  const viteEnv = loadEnv(mode, process.cwd());


  console.log("====================模式與環境====================");
  console.log("mode", mode);
  console.log("env", viteEnv);
  // console.log("=================================================");

  return {
    base: viteEnv.VITE_BASE_URL,
    server: {
      host: "0.0.0.0",
      open: true,
      proxy: viteEnv.VITE_HTTP_PROXY === "Y"
        ? {
            [viteEnv.VITE_PROXY_PATTERN]: {
              target: viteEnv.VITE_PROXY_TARGET,
              changeOrigin: true,
              rewrite: path =>
                path.replace(
                  new RegExp(`^${viteEnv.VITE_PROXY_PATTERN}`),
                  `${viteEnv.VITE_PROXY_PATTERN}`
                ),
            },
          }
        : undefined,  
      https: viteEnv.VITE_HTTP_SSL === "Y",
    },
    plugins: [
      vue(),
      UnoCSS(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            AppTitle: viteEnv.VITE_APP_TITLE,
          },
        },
      }),
    ],
    resolve: {
      alias: [{ find: "@", replacement: `${path.resolve(process.cwd())}/src` }],
    },
  }
})
