/** 指标卡 */
export interface MetricCard {
  key: string;
  label: string;
  value: number;
  unit?: string;
  /** 环比，可正可负 */
  trend?: number;
}

/** 图表单点 */
export interface ChartPoint {
  label: string;
  value: number;
}

/** 图表序列 */
export interface ChartSeries {
  name: string;
  points: ChartPoint[];
}

/** 名值对（饼图 / 排行等） */
export interface NamedValue {
  name: string;
  value: number;
  ratio?: number;
}

/** 带稳定 id 的名值对 */
export interface NamedValueRow extends NamedValue {
  id: string;
}
