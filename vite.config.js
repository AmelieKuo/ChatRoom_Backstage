import UnoCSS from "unocss/vite";
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vite.dev/config/
export default defineConfig((config) => {
  const { mode } = config
  const viteEnv = loadEnv(mode, process.cwd())


  console.log("====================模式與環境====================");
  // console.log("env", viteEnv);
  // console.log("command", command);
  // console.log("mode", mode);
  // console.log("isOpenProxy", isOpenProxy);
  // console.log("viteEnvConfig", viteEnvConfig);
  // console.log("=================================================");

  return {
    base: viteEnv.VITE_BASE_URL,
    server: {
      host: "0.0.0.0",
      open: true,
      // proxy: createViteProxy(viteEnv.VITE_HTTP_PROXY, viteEnvConfig),
      https: viteEnv.VITE_HTTP_SSL === "Y",
    },
    plugins: [
      vue(),
      UnoCSS(),
    ],
    resolve: {
      alias: [{ find: "@", replacement: `${path.resolve(process.cwd())}/src` }],
    },
  }
})
