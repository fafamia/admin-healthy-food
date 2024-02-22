// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/T14%20Gen%203/Documents/back/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/T14%20Gen%203/Documents/back/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///C:/Users/T14%20Gen%203/Documents/back/vite.config.js";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "production" ? "/chd104/g3/admin/" : "/",
  build: {
    outDir: "admin"
  },
  plugins: [
    vue()
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
                    @import "./src/assets/scss/main.scss";
                `
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxUMTQgR2VuIDNcXFxcRG9jdW1lbnRzXFxcXGJhY2tcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFQxNCBHZW4gM1xcXFxEb2N1bWVudHNcXFxcYmFja1xcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvVDE0JTIwR2VuJTIwMy9Eb2N1bWVudHMvYmFjay92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJ1xyXG5cclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIGJhc2U6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcclxuICAgID8gJy9jaGQxMDQvZzMvYWRtaW4vJ1xyXG4gICAgOiAnLycsXHJcbiAgYnVpbGQ6IHtcclxuICAgIG91dERpcjogJ2FkbWluJ1xyXG4gIH0sXHJcbiAgcGx1Z2luczogW1xyXG4gICAgdnVlKCksXHJcbiAgXSxcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3NzOiB7XHJcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgIHNjc3M6IHtcclxuICAgICAgICBhZGRpdGlvbmFsRGF0YTogYFxyXG4gICAgICAgICAgICAgICAgICAgIEBpbXBvcnQgXCIuL3NyYy9hc3NldHMvc2Nzcy9tYWluLnNjc3NcIjtcclxuICAgICAgICAgICAgICAgIGAsXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgfSxcclxufSlcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFtUyxTQUFTLGVBQWUsV0FBVztBQUV0VSxTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFIbUssSUFBTSwyQ0FBMkM7QUFNcE8sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTSxRQUFRLElBQUksYUFBYSxlQUMzQixzQkFDQTtBQUFBLEVBQ0osT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osZ0JBQWdCO0FBQUE7QUFBQTtBQUFBLE1BR2xCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
