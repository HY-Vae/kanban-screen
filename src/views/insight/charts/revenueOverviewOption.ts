import type { EChartsOption } from 'echarts';

import { graphicLinearGradient } from '@/utils/chart';

const MONTH_LABELS = [
  '2021.01',
  '2021.02',
  '2021.03',
  '2021.04',
  '2021.05',
  '2021.06',
  '2021.07',
  '2021.08',
  '2021.09',
  '2021.10',
  '2021.11',
  '2021.12',
];

/**
 * 构建近 12 个月税收概览 option
 * @param values 月度金额（万元）
 * @returns ECharts option
 */
export function buildRevenueOverviewOption(values: number[]): EChartsOption {
  return {
    backgroundColor: 'transparent',
    grid: { top: 79, right: 9, left: 34, bottom: '24px' },
    title: {
      text: '最近12个月税收概览',
      subtext: '单位/万元',
      textStyle: { color: '#fff', fontSize: 22, fontWeight: 'lighter' },
      subtextStyle: { color: '#fff', fontSize: 12, fontWeight: 'lighter' },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: unknown): string => {
        const rows = params as Array<{ seriesName: string; marker: string; name: string; value: number }>;
        const row = rows[0];
        if (!row) {
          return '';
        }
        return `<div>${row.seriesName}</div> ${row.marker} ${row.name}  ${row.value}万元`;
      },
    },
    legend: { show: false },
    xAxis: {
      type: 'category',
      show: true,
      data: MONTH_LABELS,
      splitLine: { show: false },
    },
    yAxis: {
      show: true,
      type: 'value',
      name: '',
      nameTextStyle: { color: '#fff', padding: [0, 0, 0, 40] },
      splitLine: { show: true, lineStyle: { color: '#333', width: 1, type: 'solid' } },
    },
    series: [
      {
        name: '金额',
        type: 'bar',
        barWidth: 9,
        label: { show: true, position: 'top', color: '#fff', distance: 9 },
        itemStyle: {
          borderRadius: [0, 0, 4, 4],
          color: graphicLinearGradient('#66FFFF', '#66FFFF33'),
        },
        data: values,
      },
      {
        name: '金额',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 19,
        symbolOffset: [0, 5],
        data: values,
        itemStyle: { color: '#66FFFF' },
        lineStyle: { color: 'transparent' },
        animationDuration: 499,
        animationDelay: 644,
      },
    ],
  };
}
