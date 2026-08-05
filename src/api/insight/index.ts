import type { ChartSeries, NamedValueRow } from '@/api/common';
import { http } from '@/core/http';

/** 规模效益 */
export interface InsightScaleBenefit {
  /** 总值增幅（%） */
  totalGrowth: number;
  income: number;
  /** 超越第二名（%） */
  rankGap: number;
  expend: number;
  expendChain: number;
}

/** 年度经营收入项 */
export interface InsightYearIncomeItem {
  id: string;
  title: string;
  amount: number;
  percent: number;
}

/** 年度经营收入 */
export interface InsightYearIncome {
  list: InsightYearIncomeItem[];
  endTime: number;
}

/** 园区进出口额 */
export interface InsightParkTrade {
  amount: number;
  importAmount: number;
  exportAmount: number;
}

/** 企业信息 */
export interface InsightEnterpriseInfo {
  taxAmount: number;
  taxTotal: number;
  taxTrend: number;
  enterpriseCount: number;
  types: NamedValueRow[];
  investmentTotal: number;
  investmentTrend: number;
  asOf: string;
}

/** 园区面积项 */
export interface InsightParkArea {
  id: string;
  area: number;
  summary: string;
}

/**
 * 查询规模效益
 * @param params 查询参数（如 date）
 * @returns 规模效益指标
 */
export function getInsightScaleBenefit(params?: Record<string, unknown>): Promise<InsightScaleBenefit> {
  return http.get<InsightScaleBenefit>('insight/scale-benefit', { params });
}

/**
 * 查询年度经营收入
 * @returns 收入列表与截止时间
 */
export function getInsightYearIncome(): Promise<InsightYearIncome> {
  return http.get<InsightYearIncome>('insight/year-income');
}

/**
 * 查询园区规划趋势
 * @returns 入园 / 出园序列
 */
export function getInsightParkPlan(): Promise<ChartSeries[]> {
  return http.get<ChartSeries[]>('insight/park-plan');
}

/**
 * 查询税收概览
 * @returns 月度税收序列
 */
export function getInsightRevenueOverview(): Promise<number[]> {
  return http.get<number[]>('insight/revenue-overview');
}

/**
 * 查询园区进出口额
 * @param params 查询参数（如 date）
 * @returns 进出口指标
 */
export function getInsightParkTrade(params?: Record<string, unknown>): Promise<InsightParkTrade> {
  return http.get<InsightParkTrade>('insight/park-trade', { params });
}

/**
 * 查询企业信息
 * @returns 企业与税收指标
 */
export function getInsightEnterpriseInfo(): Promise<InsightEnterpriseInfo> {
  return http.get<InsightEnterpriseInfo>('insight/enterprise-info');
}

/**
 * 查询园区面积规划
 * @returns 面积卡片列表
 */
export function getInsightParkAreas(): Promise<InsightParkArea[]> {
  return http.get<InsightParkArea[]>('insight/park-areas');
}
