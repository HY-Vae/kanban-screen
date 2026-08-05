import type { EChartsOption } from 'echarts';

import { graphicLinearGradient } from '@/utils/chart';

/**
 * 构建服务项目完成度堆叠条 option
 * @param completedPercent 已完成占比 0–100
 * @param remainingPercent 待处理占比 0–100
 * @returns ECharts option
 */
export function buildServiceRatioBarOption(completedPercent: number, remainingPercent: number): EChartsOption {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'line' },
    },
    grid: {
      top: 0,
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: false,
    },
    xAxis: { show: false, type: 'value' },
    yAxis: { show: false, type: 'category' },
    series: [
      {
        name: '已完成',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          formatter: ({ value }) => `${value}%`,
          fontWeight: 1000,
          fontSize: 14,
        },
        emphasis: { focus: 'series' },
        itemStyle: {
          borderRadius: [4],
          color: graphicLinearGradient('#17EAFE', '#009CD7', [0, 0, 1, 0]),
        },
        barWidth: 20,
        data: [completedPercent],
      },
      {
        name: '待处理',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
          formatter: ({ value }) => `${value}%`,
          fontWeight: 1000,
          fontSize: 14,
        },
        itemStyle: {
          borderRadius: [4],
          color: graphicLinearGradient('#00FFBC', '#09ADA7', [0, 0, 1, 0]),
        },
        barWidth: 20,
        emphasis: { focus: 'series' },
        data: [remainingPercent],
      },
    ],
  };
}
