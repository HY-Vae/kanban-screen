import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/** 启动 node 进程时所在工作目录 */
export const root: string = process.cwd();

/**
 * 根据路径片段生成绝对路径
 * @param dir 路径片段，默认当前 build 目录
 * @param metaUrl 模块 url；在 build 外调用时必传 import.meta.url
 */
export const pathResolve = (dir = '.', metaUrl = import.meta.url) => {
  const currentFileDir = dirname(fileURLToPath(metaUrl));
  const buildDir = resolve(currentFileDir, 'build');
  const resolvedPath = resolve(currentFileDir, dir);
  if (resolvedPath.startsWith(buildDir)) {
    return fileURLToPath(metaUrl);
  }
  return resolvedPath;
};

/** 路径别名 */
export const alias: Record<string, string> = {
  '@': pathResolve('../src'),
};

/**
 * 将 Vite loadEnv 结果转为类型化配置（含默认值）
 * @param envConf 原始环境变量
 */
export const wrapperEnv = (envConf: Record<string, string>): ViteEnv => {
  const ret: ViteEnv = {
    VITE_APP_TITLE: '智慧管理大屏',
    VITE_PORT: 5173,
    VITE_PUBLIC_PATH: '/',
    VITE_APP_URL: 'http://localhost:8801',
    VITE_APP_BASE_API: '/api',
    VITE_STRICT_PORT: false,
    VITE_MOCK_DEV_SERVER: true,
    VITE_MOCK_BASE_API: '/mock',
    VITE_CDN: false,
    VITE_COMPRESSION: 'gzip',
  };

  for (const envName of Object.keys(envConf)) {
    let realName: string | boolean | number = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    (ret as Record<string, string | boolean | number>)[envName] = realName;
    if (typeof realName === 'string') {
      process.env[envName] = realName;
    } else {
      process.env[envName] = JSON.stringify(realName);
    }
  }
  return ret;
};
