import type { NamedValue } from '@/api/common';
import { http } from '@/core/http';

/** 设备销量统计 */
export interface AnalyseDeviceSalesStats {
  totalDeviceSales: number;
  yearlyGrowthRate: number;
}

/** 公司销量占比项 */
export interface AnalyseCompanySalesItem {
  name: string;
  amount: number;
  percent: number;
}

/**
 * 查询销售设备总量
 * @returns 销量与同比
 */
export function getAnalyseDeviceSalesStats(): Promise<AnalyseDeviceSalesStats> {
  return http.get<AnalyseDeviceSalesStats>('analyse/device-sales-stats');
}

/**
 * 查询公司销量占比
 * @returns 公司销量列表
 */
export function getAnalyseCompanySalesDistribution(): Promise<AnalyseCompanySalesItem[]> {
  return http.get<AnalyseCompanySalesItem[]>('analyse/company-sales-distribution');
}

/**
 * 查询品牌占有率
 * @returns 品牌占比
 */
export function getAnalyseBrandsDistribution(): Promise<NamedValue[]> {
  return http.get<NamedValue[]>('analyse/brands-distribution');
}

/**
 * 查询中部展示指标
 * @returns 展示指标列表
 */
export function getAnalyseShowcaseMetrics(): Promise<NamedValue[]> {
  return http.get<NamedValue[]>('analyse/showcase-metrics');
}

/**
 * 查询区域销量占比
 * @returns 城市销量
 */
export function getAnalyseRegionSalesRatio(): Promise<NamedValue[]> {
  return http.get<NamedValue[]>('analyse/region-sales-ratio');
}

/**
 * 查询数据占有率
 * @returns 占有率列表
 */
export function getAnalyseShareRatio(): Promise<NamedValue[]> {
  return http.get<NamedValue[]>('analyse/share-ratio');
}

/**
 * 查询品牌分析展示
 * @returns 品牌分析列表
 */
export function getAnalyseBrandShowcase(): Promise<NamedValue[]> {
  return http.get<NamedValue[]>('analyse/brand-showcase');
}

/**
 * 查询数据展示统计
 * @returns 统计列表
 */
export function getAnalyseShowStatistics(): Promise<NamedValue[]> {
  return http.get<NamedValue[]>('analyse/show-statistics');
}
