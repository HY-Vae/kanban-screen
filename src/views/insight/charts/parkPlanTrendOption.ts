import type { EChartsOption } from 'echarts';

import type { ChartSeries } from '@/api/common';

/**
 * 构建园区规划双折线 option
 * @param series 入园 / 出园序列
 * @returns ECharts option
 */
export function buildParkPlanTrendOption(series: ChartSeries[]): EChartsOption {
  const enter = series.find((item) => item.name === '入园') ?? series[0];
  const leave = series.find((item) => item.name === '出园') ?? series[1];
  const labels = enter?.points.map((point) => point.label) ?? [];

  return {
    backgroundColor: 'transparent',
    grid: { top: '9%', right: 9, left: 9, bottom: '20%' },
    tooltip: {},
    legend: { show: false },
    xAxis: {
      type: 'category',
      show: true,
      data: labels,
      splitLine: { show: true, lineStyle: { color: '#333', width: 1, type: 'solid' } },
      splitArea: { show: false },
    },
    yAxis: { show: false, type: 'value' },
    series: [
      {
        name: '入园',
        type: 'line',
        data: enter?.points.map((point) => point.value) ?? [],
        smooth: true,
        symbol: 'circle',
        symbolSize: 14,
        itemStyle: { borderColor: '#16CEB9', borderWidth: 6, color: '#142745' },
        lineStyle: { color: '#16CEB9', width: 6 },
      },
      {
        name: '出园',
        type: 'line',
        data: leave?.points.map((point) => point.value) ?? [],
        smooth: true,
        symbol: 'circle',
        symbolSize: 14,
        itemStyle: { borderColor: '#32C5FF', borderWidth: 6, color: '#142745' },
        lineStyle: { color: '#32C5FF', width: 6 },
      },
    ],
  };
}
