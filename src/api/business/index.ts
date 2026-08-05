import type { ChartSeries, MetricCard, NamedValue } from '@/api/common';
import { http } from '@/core/http';

/** 时间筛选项 */
export interface BusinessPeriodOption {
  label: string;
  value: string;
}

/** 进出口额概览 */
export interface BusinessImportExport {
  /** 合计展示字符串（翻牌用） */
  totalDisplay: string;
  importAmount: number;
  exportAmount: number;
  /** 进度条：进口为正、出口为负 */
  importBar: number;
  exportBar: number;
  periods: BusinessPeriodOption[];
}

/** 企业类型占比 */
export interface BusinessEnterpriseTypeShare extends NamedValue {
  id: string;
}

/** 企业信息概览 */
export interface BusinessEnterpriseOverview {
  taxAmount: number;
  enterpriseCount: number;
  types: BusinessEnterpriseTypeShare[];
  investmentTotal: number;
  investmentTrend: number;
  taxTotal: number;
  taxTrend: number;
  asOf: string;
}

/** 地理规划指标 */
export interface BusinessGeoMetric {
  id: string;
  label: string;
  value: string;
  color: string;
}

/** 地理规划（两行指标） */
export interface BusinessGeoPlanning {
  asOf: string;
  rows: BusinessGeoMetric[][];
}

/** 今日交易卡片明细 */
export interface BusinessDailyTradeDetail {
  id: string;
  name: string;
  amount: number;
}

/** 今日交易卡片 */
export interface BusinessDailyTradeCard {
  id: string;
  title: string;
  amount: number;
  details: BusinessDailyTradeDetail[];
}

/** 园区资产展示项 */
export interface BusinessParkAsset {
  id: string;
  title: string;
  describe: string;
  amount: number;
  image: string;
}

/** 年度税收 */
export interface BusinessAnnualTax {
  unit: string;
  periods: BusinessPeriodOption[];
  series: ChartSeries[];
}

/** 维修出口概览 */
export interface BusinessRepairExport {
  total: number;
  label: string;
  periods: BusinessPeriodOption[];
  metrics: MetricCard[];
}

/** 品类出口项 */
export interface BusinessCategoryExport {
  id: string;
  title: string;
  value: string;
  unit: string;
  /** 环比百分比 */
  trend: number;
  asOf: string;
}

/** 涉外贸易卡片 */
export interface BusinessForeignTradeCard {
  id: string;
  title: string;
  value: number;
  unit: string;
  trend: number;
  /** 迷你柱图 0–100 */
  chartValue: number;
}

/**
 * 查询园区进出口额
 * @returns 进出口合计与进度条数据
 */
export function getBusinessImportExport(): Promise<BusinessImportExport> {
  return http.get<BusinessImportExport>('business/import-export');
}

/**
 * 查询企业信息概览
 * @returns 报税、数量、类型占比与投资税收
 */
export function getBusinessEnterpriseOverview(): Promise<BusinessEnterpriseOverview> {
  return http.get<BusinessEnterpriseOverview>('business/enterprise-overview');
}

/**
 * 查询地理规划指标
 * @returns 两行设备/面积指标
 */
export function getBusinessGeoPlanning(): Promise<BusinessGeoPlanning> {
  return http.get<BusinessGeoPlanning>('business/geo-planning');
}

/**
 * 查询今日交易卡片
 * @returns 出口额 / 货量 / 车辆卡片
 */
export function getBusinessDailyTrade(): Promise<BusinessDailyTradeCard[]> {
  return http.get<BusinessDailyTradeCard[]>('business/daily-trade');
}

/**
 * 查询园区资产展示
 * @returns 员工 / 大楼 / 设备 / 报表
 */
export function getBusinessParkAssets(): Promise<BusinessParkAsset[]> {
  return http.get<BusinessParkAsset[]>('business/park-assets');
}

/**
 * 查询年度税收序列
 * @returns 单位、周期与柱状序列
 */
export function getBusinessAnnualTax(): Promise<BusinessAnnualTax> {
  return http.get<BusinessAnnualTax>('business/annual-tax');
}

/**
 * 查询维修业务出口
 * @returns 总值与验收类指标
 */
export function getBusinessRepairExport(): Promise<BusinessRepairExport> {
  return http.get<BusinessRepairExport>('business/repair-export');
}

/**
 * 查询品类出口列表
 * @returns 品类出口与环比
 */
export function getBusinessCategoryExports(): Promise<BusinessCategoryExport[]> {
  return http.get<BusinessCategoryExport[]>('business/category-exports');
}

/**
 * 查询涉外贸易卡片
 * @returns 货物贸易等卡片（含迷你图）
 */
export function getBusinessForeignTrade(): Promise<BusinessForeignTradeCard[]> {
  return http.get<BusinessForeignTradeCard[]>('business/foreign-trade');
}
