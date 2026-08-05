import { Plugin as importToCDN } from 'vite-plugin-cdn-import';

/**
 * 可选 CDN 外链（默认关闭）。内网 Docker 部署一般不需要；仅当 VITE_CDN=true 时启用。
 */
export const cdn = importToCDN({
  prodUrl: 'https://unpkg.com/{name}@{version}/{path}',
  modules: [
    { name: 'vue', var: 'Vue', path: 'dist/vue.global.prod.js' },
    { name: 'vue-router', var: 'VueRouter', path: 'dist/vue-router.global.js' },
    { name: 'vue-demi', var: 'VueDemi', path: 'lib/index.iife.js' },
    { name: 'pinia', var: 'Pinia', path: 'dist/pinia.iife.js' },
    { name: 'axios', var: 'axios', path: 'dist/axios.min.js' },
    { name: 'dayjs', var: 'dayjs', path: 'dayjs.min.js' },
    { name: 'echarts', var: 'echarts', path: 'dist/echarts.min.js' },
  ],
});
