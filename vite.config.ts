import { type ConfigEnv, loadEnv, type UserConfigExport } from 'vite';

import { getPluginsList } from './build/plugins';
import { alias, pathResolve, root, wrapperEnv } from './build/utils';

/** 依赖预构建：冷启动与禁用浏览器缓存时减轻卡顿 */
const optimizeDepsInclude = ['vue', 'vue-router', 'dayjs', 'axios', 'pinia', 'vue-types', 'js-cookie', '@vueuse/core'];

export default ({ mode }: ConfigEnv): UserConfigExport => {
  const env = wrapperEnv(loadEnv(mode, root));
  const {
    VITE_CDN,
    VITE_PORT,
    VITE_COMPRESSION,
    VITE_PUBLIC_PATH,
    VITE_APP_URL,
    VITE_STRICT_PORT,
    VITE_MOCK_DEV_SERVER,
  } = env;

  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias,
    },
    server: {
      open: true,
      port: VITE_PORT,
      host: '0.0.0.0',
      strictPort: VITE_STRICT_PORT,
      cors: true,
      proxy: {
        '/api': {
          target: VITE_APP_URL,
          changeOrigin: true,
        },
        '/mock': {
          target: VITE_APP_URL,
          changeOrigin: true,
        },
      },
      warmup: {
        clientFiles: ['./index.html', './src/{views,components}/*'],
      },
    },
    preview: {
      port: VITE_PORT,
      host: '0.0.0.0',
    },
    plugins: getPluginsList(VITE_CDN, VITE_COMPRESSION, VITE_MOCK_DEV_SERVER),
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    optimizeDeps: {
      include: optimizeDepsInclude,
    },
    clearScreen: false,
    build: {
      target: 'es2015',
      outDir: 'dist',
      sourcemap: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 4000,
      rollupOptions: {
        input: {
          index: pathResolve('./index.html', import.meta.url),
        },
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: (id) => {
            if (id.includes('node_modules')) return 'vendor';
          },
        },
      },
    },
    esbuild: {
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      jsxInject: "import { h } from 'vue';",
    },
  };
};
