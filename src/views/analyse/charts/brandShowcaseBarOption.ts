import type { EChartsOption } from 'echarts';

import type { NamedValue } from '@/api/common';
import { graphicLinearGradient } from '@/utils/chart';

/**
 * 构建品牌分析三角柱 option
 * @param list 品牌分析
 * @returns ECharts option
 */
export function buildBrandShowcaseBarOption(list: NamedValue[]): EChartsOption {
  return {
    tooltip: { trigger: 'axis' },
    title: {
      text: '单位：(万元)',
      textStyle: { color: '#83A2C0FF', fontSize: 12 },
      top: '4%',
      left: '2%',
    },
    grid: {
      left: '9%',
      right: '2%',
      bottom: '9%',
      top: '19%',
      containLabel: false,
    },
    xAxis: {
      data: list.map((item) => item.name),
      type: 'category',
      axisLine: { symbol: 'none', lineStyle: { color: '#50637A' } },
      axisTick: { show: false },
      axisLabel: { interval: 0, color: '#fff', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#fff', fontSize: 12 },
      splitLine: { lineStyle: { color: '#50637A', type: 'dashed' } },
    },
    series: [
      {
        name: '数据分析',
        data: list.map((item) => item.value),
        type: 'pictorialBar',
        color: '#00F7FF',
        barWidth: 40,
        symbol: 'triangle',
        label: { show: true, position: 'top', color: '#fff' },
      },
    ],
    visualMap: {
      show: false,
      showLabel: false,
      type: 'piecewise',
      pieces: [
        {
          min: 0,
          max: 100,
          label: '低',
          color: graphicLinearGradient('#FF6363', 'rgba(255,99,99,0.2)') as unknown as string,
        },
        {
          min: 100,
          max: 300,
          label: '低中',
          color: graphicLinearGradient('#FFCC00', 'rgba(255,204,0,0.2)') as unknown as string,
        },
        {
          min: 300,
          max: 500,
          label: '中',
          color: graphicLinearGradient('#00FFFF', 'rgba(0,255,255,0.2)') as unknown as string,
        },
        {
          min: 500,
          max: 700,
          label: '中高',
          color: graphicLinearGradient('#00CCFF', 'rgba(0,204,255,0.2)') as unknown as string,
        },
        {
          min: 700,
          max: 1000,
          label: '高',
          color: graphicLinearGradient('#0096FF', 'rgba(0,150,255,0.2)') as unknown as string,
        },
      ],
      seriesIndex: 0,
    },
  };
}
