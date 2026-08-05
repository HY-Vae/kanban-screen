import type { NamedValueRow } from '@/api/common';
import { http } from '@/core/http';

/** 设备分类数量 */
export interface CommunityDeviceCategory {
  id: string;
  name: string;
  /** 内部设备数 */
  internal: number;
  /** 接入设备数 */
  connected: number;
}

/** 设备数量汇总 */
export interface CommunityDevicesAmount {
  total: number;
  list: CommunityDeviceCategory[];
}

/** 预警概览 */
export interface CommunityAlarmsOverview {
  total: number;
  list: NamedValueRow[];
}

/** 社区人口统计卡片 */
export interface CommunityPopulationCard {
  id: string;
  name: string;
  total: number;
  subtitle: string;
  /** 占比 0–100 */
  ratio: number;
  subTotal: number;
}

/** 设备运行指标 */
export interface CommunityDeviceMetric {
  id: string;
  label: string;
  value: number;
}

/** 设备运行状态 */
export interface CommunityDevicesStatus {
  metrics: CommunityDeviceMetric[];
  /** 安全指数 0–100 */
  securityIndex: number;
}

/** 服务项目进度 */
export interface CommunityServiceProject {
  id: string;
  name: string;
  /** 已完成占比基数 */
  completed: number;
  /** 待处理占比基数 */
  remaining: number;
}

/**
 * 查询社区设备数量
 * @returns 分类数量与合计
 */
export function getCommunityDevicesAmount(): Promise<CommunityDevicesAmount> {
  return http.get<CommunityDevicesAmount>('community/devices-amount');
}

/**
 * 查询预警概览
 * @returns 预警合计与分类列表
 */
export function getCommunityAlarmsOverview(): Promise<CommunityAlarmsOverview> {
  return http.get<CommunityAlarmsOverview>('community/alarms-overview');
}

/**
 * 查询社区人口统计
 * @returns 统计卡片列表
 */
export function getCommunityPopulationStats(): Promise<CommunityPopulationCard[]> {
  return http.get<CommunityPopulationCard[]>('community/population-stats');
}

/**
 * 查询设备运行状态
 * @returns 设备指标与安全指数
 */
export function getCommunityDevicesStatus(): Promise<CommunityDevicesStatus> {
  return http.get<CommunityDevicesStatus>('community/devices-status');
}

/**
 * 查询园区指标（玫瑰图）
 * @returns 名值列表
 */
export function getCommunityParkMetrics(): Promise<NamedValueRow[]> {
  return http.get<NamedValueRow[]>('community/park-metrics');
}

/**
 * 查询服务项目列表
 * @returns 服务项目进度
 */
export function getCommunityServiceProjects(): Promise<CommunityServiceProject[]> {
  return http.get<CommunityServiceProject[]>('community/service-projects');
}
