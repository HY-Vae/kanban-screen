import type { ChartSeries, MetricCard } from '@/api/common';
import { http } from '@/core/http';

/** 卡口道路状态项 */
export interface ParkingRoadEntrance {
  id: string;
  name: string;
  status: string;
}

/** 道路状态概览 */
export interface ParkingRoadStatus {
  entrances: ParkingRoadEntrance[];
  suggest: string;
}

/** 卡口车辆监控项 */
export interface ParkingTollgateMonitor {
  id: string;
  name: string;
  count: number;
  /** 环比百分比 */
  trend: number;
}

/** 车流量统计 */
export interface ParkingTrafficStatistics {
  overview: MetricCard[];
  series: ChartSeries[];
}

/**
 * 查询道路卡口状态
 * @returns 卡口列表与调度建议
 */
export function getParkingRoadStatus(): Promise<ParkingRoadStatus> {
  return http.get<ParkingRoadStatus>('parking/road-status');
}

/**
 * 查询卡口车辆监控
 * @returns 各卡口车流量监控
 */
export function getParkingTollgateMonitor(): Promise<ParkingTollgateMonitor[]> {
  return http.get<ParkingTollgateMonitor[]>('parking/monitor');
}

/**
 * 查询车流量统计
 * @returns 进出园指标与近 7 天序列
 */
export function getParkingTrafficStatistics(): Promise<ParkingTrafficStatistics> {
  return http.get<ParkingTrafficStatistics>('parking/flow-rate');
}
