import type { EChartsOption } from 'echarts';

import type { NamedValueRow } from '@/api/common';

const ROSE_COLORS = ['#3D7FFF', '#00FFFF', '#FF1190', '#FEDB65', '#FE9B45', '#44D7B6'];

/**
 * 构建园区指标玫瑰图 option
 * @param metrics 名值列表
 * @returns ECharts option
 */
export function buildMetricsRoseOption(metrics: NamedValueRow[]): EChartsOption {
  return {
    backgroundColor: 'transparent',
    grid: { top: 0, right: 0, bottom: 0, left: 0, containLabel: true },
    tooltip: { trigger: 'item' },
    series: [
      {
        name: '园区指标',
        type: 'pie',
        radius: [14, 104],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: { borderRadius: 4 },
        data: metrics.map((item, index) => ({
          name: item.name,
          value: item.value,
          itemStyle: { color: ROSE_COLORS[index % ROSE_COLORS.length], borderRadius: 10 },
        })),
        label: { distanceToLabelLine: 4, position: 'insideBottom' },
        labelLine: { show: true, length: 1, length2: 0, smooth: true },
      },
    ],
  };
}
