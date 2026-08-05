import type { EChartsOption } from 'echarts';

import echarts from '@/plugins/echarts';

/**
 * 构建园区进出口双向条形 option
 * @param importAmount 进口额
 * @param exportAmount 出口额（展示为负向条）
 * @returns ECharts option
 */
export function buildParkTradeBarOption(importAmount: number, exportAmount: number): EChartsOption {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    grid: { top: 0, left: 0, right: -100, bottom: 0, containLabel: false },
    xAxis: { show: false, type: 'value' },
    yAxis: { show: false, type: 'category', data: ['进出口金额'] },
    series: [
      {
        name: '进口额',
        type: 'bar',
        barMaxWidth: 24,
        barGap: '-100%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#1B3052' },
            { offset: 1, color: '#32A5DE' },
          ]),
        },
        data: [importAmount],
      },
      {
        name: '出口额',
        type: 'bar',
        barMaxWidth: 23,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#1B3052' },
            { offset: 1, color: '#3684F2' },
          ]),
        },
        data: [-exportAmount],
      },
    ],
  };
}
