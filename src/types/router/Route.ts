import type { RouteComponent } from 'vue-router';

import type { HeaderTypeEnum } from '@/enums/HeaderTypeEnum';

/**
 * 动画入场和离场（animate.css 类名，不含 animate__animated 前缀）
 */
interface Transition {
  enter?: string;
  leave?: string;
}

/**
 * 完整子路由的 meta 配置
 */
interface CustomizeRouteMeta {
  title?: string;
  subtitle?: string;
  transition?: Transition;
  hidden?: boolean;
  headerType?: HeaderTypeEnum | 'subtitle' | string;
}

/**
 * 整体路由配置表（包括完整子路由）
 */
export interface RouteConfigsTable {
  /** 路由地址 */
  path: string;
  /** 路由名字（保持唯一） */
  name?: string;
  /** Layout 组件 */
  component?: RouteComponent;
  /** 路由重定向 */
  redirect?: string;
  meta?: CustomizeRouteMeta;
  /** 子路由配置项 */
  children?: Array<RouteConfigsTable>;
}
