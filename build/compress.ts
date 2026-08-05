import type { Plugin } from 'vite';
import compressPlugin from 'vite-plugin-compression';

/**
 * 构建产物压缩；`none` 关闭
 * @param compress 环境变量 VITE_COMPRESSION
 */
export function configCompressPlugin(compress: string): Plugin | Plugin[] | null {
  if (!compress || compress === 'none') return null;

  if (compress.includes('gzip')) {
    return compressPlugin({
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    });
  }

  return null;
}
