import type { EChartsOption } from 'echarts';

import type { ChartSeries } from '@/api/common';
import { graphicLinearGradient } from '@/utils/chart';

/**
 * 构建近 7 天进出园车流量折线 option
 * @param series 入园 / 出园序列
 * @returns ECharts option
 */
export function buildTrafficFlowOption(series: ChartSeries[]): EChartsOption {
  const enter = series.find((item) => item.name === '入园');
  const leave = series.find((item) => item.name === '出园');
  const labels = enter?.points.map((point) => point.label) ?? leave?.points.map((point) => point.label) ?? [];

  return {
    backgroundColor: 'transparent',
    grid: { right: 10, left: 10, bottom: 20 },
    title: {
      text: '近7天车辆数据',
      textStyle: { fontSize: 18, color: '#fff', fontWeight: 'lighter' },
    },
    tooltip: {},
    legend: {
      data: [
        { name: '出园', icon: 'rect', itemStyle: { color: '#4182FF' } },
        { name: '入园', icon: 'rect', itemStyle: { color: '#00FFFF' } },
      ],
      icon: 'rect',
      right: 0,
      top: 0,
      itemGap: 9,
      orient: 'horizontal',
      align: 'left',
      textStyle: { fontSize: 14, color: '#fff' },
    },
    xAxis: {
      type: 'category',
      show: true,
      data: labels,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#333',
          width: 1,
          type: 'solid',
        },
      },
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
        symbolSize: 10,
        areaStyle: {
          color: graphicLinearGradient('#4182FF', 'rgba(0,255,255,0)'),
        },
        itemStyle: { borderColor: '#00FFFF', borderWidth: 4, color: '#142745' },
        lineStyle: { color: '#00FFFF', width: 3 },
      },
      {
        name: '出园',
        type: 'line',
        data: leave?.points.map((point) => point.value) ?? [],
        smooth: true,
        symbol: 'circle',
        symbolSize: 10,
        areaStyle: {
          color: graphicLinearGradient('#4182FF', 'rgba(0,255,255,0)'),
        },
        itemStyle: { borderColor: '#4182FF', borderWidth: 4, color: '#142745' },
        lineStyle: { color: '#4182FF', width: 3 },
      },
    ],
  };
}
