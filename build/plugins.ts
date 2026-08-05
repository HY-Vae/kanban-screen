import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';
import UnoCSS from 'unocss/vite';
import type { PluginOption } from 'vite';
import { vitePluginFakeServer } from 'vite-plugin-fake-server';
import removeConsole from 'vite-plugin-remove-console';

import { cdn } from './cdn';
import { configCompressPlugin } from './compress';

/**
 * Vite 插件列表（大屏精简版：无 DevTools / Inspector / 启动彩虹 banner）
 * @param VITE_CDN 是否走 CDN
 * @param VITE_COMPRESSION 压缩策略
 * @param VITE_MOCK_DEV_SERVER 是否启用 fake-server
 */
export function getPluginsList(
  VITE_CDN: boolean,
  VITE_COMPRESSION: string,
  VITE_MOCK_DEV_SERVER: boolean
): PluginOption[] {
  const lifecycle = process.env.npm_lifecycle_event;

  return [
    vue(),
    vueJsx(),
    UnoCSS({
      hmrTopLevelAwait: false,
    }),
    VITE_MOCK_DEV_SERVER
      ? vitePluginFakeServer({
          logger: false,
          include: 'mock',
          infixName: false,
          enableDev: true,
        })
      : null,
    VITE_CDN ? cdn : null,
    configCompressPlugin(VITE_COMPRESSION),
    removeConsole(),
    lifecycle === 'report' ? visualizer({ open: true, brotliSize: true, filename: 'report.html' }) : null,
  ];
}
