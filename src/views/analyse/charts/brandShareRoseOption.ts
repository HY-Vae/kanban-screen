import type { EChartsOption } from 'echarts';

import type { NamedValue } from '@/api/common';

/**
 * 构建品牌占有率玫瑰图 option
 * @param list 品牌占比
 * @returns ECharts option
 */
export function buildBrandShareRoseOption(list: NamedValue[]): EChartsOption {
  return {
    tooltip: { trigger: 'item' },
    legend: { top: 'bottom', textStyle: { color: '#fff' } },
    series: [
      {
        name: '品牌占比',
        type: 'pie',
        radius: [25, 100],
        center: ['50%', '45%'],
        roseType: 'area',
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: { formatter: '{b}: {c}%', color: '#fff' },
        data: list,
      },
    ],
  };
}
