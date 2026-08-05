import type { EChartsOption } from 'echarts';

import type { NamedValue } from '@/api/common';
import { graphicLinearGradient } from '@/utils/chart';

/**
 * 构建区域销量面积折线 option
 * @param list 城市销量
 * @returns ECharts option
 */
export function buildRegionSalesLineOption(list: NamedValue[]): EChartsOption {
  return {
    grid: {
      left: '4%',
      right: '4%',
      bottom: '19%',
      top: '20%',
      containLabel: true,
    },
    title: {
      text: '单位：(万元)',
      textStyle: { color: '#83A2C0FF', fontSize: 12 },
      top: '4%',
      left: '2%',
    },
    tooltip: { trigger: 'axis' },
    legend: { show: false },
    xAxis: {
      data: list.map((item) => item.name),
      type: 'category',
      boundaryGap: false,
      axisLine: { symbol: 'none', lineStyle: { color: '#50637A' } },
      axisTick: { show: false },
      axisLabel: { interval: 0, color: '#fff', fontSize: 12, padding: [10, 0, 0, 0] },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff', fontSize: 12, padding: [0, 10, 0, 0] },
      splitLine: {
        lineStyle: { color: '#50637A', type: 'dashed' },
      },
    },
    series: [
      {
        name: '增加值',
        data: list.map((item) => item.value),
        type: 'line',
        color: '#00F7FF',
        lineStyle: { width: 2 },
        areaStyle: {
          color: graphicLinearGradient('rgba(0, 247, 255, .6)', 'rgba(0, 247, 255, .2)'),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
          shadowBlur: 10,
        },
        symbol: 'circle',
        symbolSize: 6,
      },
    ],
  };
}
