import type { EChartsOption } from 'echarts';

import type { NamedValue } from '@/api/common';

/**
 * 构建数据占有率环形图 option
 * @param list 占有率列表
 * @returns ECharts option
 */
export function buildDataShareDonutOption(list: NamedValue[]): EChartsOption {
  return {
    tooltip: { position: 'right', trigger: 'item' },
    legend: {
      orient: 'horizontal',
      right: 0,
      left: 240,
      top: 'center',
      align: 'left',
      icon: 'circle',
      itemGap: 50,
      itemWidth: 14,
      itemHeight: 14,
      textStyle: { color: '#fff', fontSize: 14 },
      formatter(name) {
        const item = list.find((row) => row.name === name);
        return `${name}: ${item?.value ?? 0}%`;
      },
    },
    grid: {
      left: '0%',
      right: '0%',
      top: '0%',
      bottom: '0%',
      containLabel: false,
    },
    series: [
      {
        name: '数据占有率',
        type: 'pie',
        radius: ['54%', '70%'],
        center: ['24%', '50%'],
        avoidLabelOverlap: false,
        padAngle: 4,
        itemStyle: { borderRadius: 4 },
        label: { show: false, position: 'center' },
        emphasis: {
          label: {
            show: true,
            color: '#fff',
            fontSize: 29,
            fontWeight: 'lighter',
            formatter: ({ value }) => `${value}%\n总占比`,
          },
        },
        labelLine: { show: false },
        data: list,
      },
    ],
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
