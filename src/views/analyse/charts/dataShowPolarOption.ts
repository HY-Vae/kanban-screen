import type { EChartsOption } from 'echarts';

import type { NamedValue } from '@/api/common';

/**
 * 构建数据展示统计极坐标柱 option
 * @param list 统计项
 * @returns ECharts option
 */
export function buildDataShowPolarOption(list: NamedValue[]): EChartsOption {
  const total = list.reduce((sum, item) => sum + item.value, 0);

  return {
    title: {
      text: String(total),
      left: 'center',
      top: 'center',
      textStyle: { color: '#fff', fontSize: 19 },
    },
    grid: { containLabel: false },
    polar: { radius: [40, '90%'] },
    angleAxis: { show: false, startAngle: 90 },
    radiusAxis: { show: false, type: 'category' },
    tooltip: {},
    series: {
      type: 'bar',
      data: list.map((item) => ({ name: item.name, value: item.value })),
      barWidth: 20,
      barGap: 9,
      coordinateSystem: 'polar',
      label: { show: true, position: 'middle' },
    },
    visualMap: {
      show: false,
      showLabel: false,
      type: 'piecewise',
      pieces: [
        { min: 0, max: 20, label: '低', color: '#FF6363' },
        { min: 20, max: 30, label: '低中', color: '#FFCC00' },
        { min: 30, max: 50, label: '中', color: '#00FFFF' },
        { min: 50, max: 70, label: '中高', color: '#00CCFF' },
        { min: 70, max: 100, label: '高', color: '#0096FF' },
      ],
      seriesIndex: 0,
    },
  };
}
