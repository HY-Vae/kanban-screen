import { HeaderTypeEnum } from '@/enums/HeaderTypeEnum';
import type { RouteConfigsTable } from '@/types/router/Route';

const routes: RouteConfigsTable[] = [
  {
    path: '/portal',
    name: 'Portal',
    component: () => import('@/views/portal/index.vue'),
    meta: {
      title: '看板Demo标题',
      headerType: HeaderTypeEnum.default,
    },
  },
  {
    path: '/parking',
    name: 'Parking',
    component: () => import('@/views/parking/index.vue'),
    meta: {
      title: '智慧智能监管中心',
      subtitle: '车辆监控中心',
      headerType: HeaderTypeEnum.subtitle,
      transition: {
        enter: 'animate__bounceInUp animate__faster',
        leave: 'animate__bounceOutUp',
      },
    },
  },
  {
    path: '/analyse',
    name: 'Analyse',
    component: () => import('@/views/analyse/index.vue'),
    meta: {
      title: '数据分析',
      subtitle: '数据分析中心',
      headerType: HeaderTypeEnum.subtitle,
      transition: {
        enter: 'animate__fadeInLeft animate__faster',
        leave: 'animate__fadeOutLeft animate__faster',
      },
    },
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/views/community/index.vue'),
    meta: {
      title: '社区',
      subtitle: '社区可视化中心',
      headerType: HeaderTypeEnum.subtitle,
      transition: {
        enter: 'animate__backInLeft animate__faster',
        leave: 'animate__backOutRight animate__faster',
      },
    },
  },
  {
    path: '/business',
    name: 'Business',
    component: () => import('@/views/business/index.vue'),
    meta: {
      title: '智慧经营监管中心',
      subtitle: '园区经营可视化',
      headerType: HeaderTypeEnum.subtitle,
    },
  },
  {
    path: '/insight',
    name: 'Insight',
    component: () => import('@/views/insight/index.vue'),
    meta: {
      title: '大数据可视化中心',
      subtitle: '大数据可视化',
      headerType: HeaderTypeEnum.subtitle,
    },
  },
];

export default routes;
