import type { EChartsOption } from 'echarts';

import { graphicLinearGradient } from '@/utils/chart';

/**
 * 构建设备内外部占比条形 option
 * @param internalPercent 内部设备占比 0–100
 * @param connectedPercent 接入设备占比 0–100
 * @returns ECharts option
 */
export function buildDeviceRatioBarOption(internalPercent: number, connectedPercent: number): EChartsOption {
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
        name: '内部',
        type: 'bar',
        stack: 'total',
        label: { show: false },
        emphasis: { focus: 'series' },
        itemStyle: {
          borderRadius: [10],
          color: graphicLinearGradient('#17EAFE', '#009CD7', [0, 0, 1, 0]),
        },
        barWidth: 20,
        data: [internalPercent],
      },
      {
        name: '接入',
        type: 'bar',
        stack: 'total',
        label: { show: false },
        itemStyle: {
          borderRadius: [10],
          color: graphicLinearGradient('#00FFBC', '#09ADA7', [0, 0, 1, 0]),
        },
        barWidth: 20,
        emphasis: { focus: 'series' },
        data: [connectedPercent],
      },
    ],
  };
}
