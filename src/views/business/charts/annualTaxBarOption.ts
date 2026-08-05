import type { EChartsOption } from 'echarts';

import type { ChartSeries } from '@/api/common';
import { graphicLinearGradient } from '@/utils/chart';

/**
 * 构建年度税收柱状 option
 * @param series 税收序列（取第一条）
 * @returns ECharts option
 */
export function buildAnnualTaxBarOption(series: ChartSeries[]): EChartsOption {
  const primary = series[0];
  const labels = primary?.points.map((point) => point.label) ?? [];
  const values = primary?.points.map((point) => point.value) ?? [];

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { shadowColor: '#66FFFF', shadowBlur: 10 } },
    },
    grid: { top: '9%', right: '0%', left: '6%', bottom: '9%', containLabel: false },
    xAxis: [
      {
        type: 'category',
        data: labels,
        axisTick: { alignWithLabel: true },
      },
    ],
    yAxis: [
      {
        type: 'value',
        splitLine: {
          show: true,
          lineStyle: { type: 'solid', color: '#707070', width: 2 },
        },
      },
    ],
    series: [
      {
        name: primary?.name ?? '税收',
        type: 'bar',
        barWidth: '40%',
        itemStyle: { color: graphicLinearGradient('#00CCD2', '#00A2FF') },
        label: { show: true, position: 'top', color: '#fff', fontSize: 14 },
        data: values,
      },
    ],
  };
}
