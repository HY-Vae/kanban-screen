import type { EChartsOption } from 'echarts';

import { graphicLinearGradient } from '@/utils/chart';

const HIGH_PERCENT_STYLE = { color: graphicLinearGradient('#00CCD2', '#00A2FF') };
const LOW_PERCENT_STYLE = { color: graphicLinearGradient('#CBB668', '#FABC00') };

/**
 * 构建经营收入环比仪表盘 option
 * @param percent 环比百分比
 * @returns ECharts option
 */
export function buildIncomeProgressOption(percent: number): EChartsOption {
  return {
    grid: { top: '9%', right: '0%', left: '0%', bottom: '0%', containLabel: false },
    series: [
      {
        type: 'gauge',
        title: { fontSize: '0.7em', color: '#fff', offsetCenter: ['0%', '14%'] },
        startAngle: 90,
        endAngle: -270,
        pointer: { show: false },
        progress: { show: true, overlap: false, roundCap: false, clip: false },
        axisLine: { lineStyle: { width: 14 } },
        splitLine: { show: false, distance: 0, length: 10 },
        axisTick: { show: false },
        axisLabel: { show: false, distance: 50 },
        detail: {
          width: 40,
          height: 40,
          fontSize: '0.8em',
          fontWeight: 0,
          color: '#fff',
          formatter: '+{value}%',
        },
        data: [
          {
            name: '环比变化',
            value: percent,
            detail: { valueAnimation: true, offsetCenter: ['0%', '-20%'] },
            itemStyle: percent >= 20 ? HIGH_PERCENT_STYLE : LOW_PERCENT_STYLE,
          },
        ],
      },
    ],
  };
}
