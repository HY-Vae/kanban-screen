import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/error',
    redirect: '/error/404',
    meta: { hidden: true },
  },
  {
    path: '/error/403',
    name: 'ForbiddenPage',
    component: () => import('@/views/error-page/403.vue'),
    meta: { hidden: true, title: '无权限' },
  },
  {
    path: '/error/404',
    name: 'NotFoundPage',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true, title: '页面不存在' },
  },
  {
    path: '/error/500',
    name: 'ServerErrorPage',
    component: () => import('@/views/error-page/500.vue'),
    meta: { hidden: true, title: '服务器错误' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: () => import('@/views/error-page/404.vue'),
    meta: { hidden: true, title: '页面不存在' },
  },
];

export default routes;
