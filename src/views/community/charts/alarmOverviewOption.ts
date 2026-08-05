import type { EChartsOption } from 'echarts';

import type { NamedValueRow } from '@/api/common';

const ALARM_COLORS = ['#3D7FFF', '#00FFFF', '#FF1190', '#FEDB65'];

/**
 * 构建预警概览极坐标柱状 option
 * @param total 历史预警总数
 * @param list 分类预警
 * @returns ECharts option
 */
export function buildAlarmOverviewOption(total: number, list: NamedValueRow[]): EChartsOption {
  return {
    title: {
      text: String(total),
      subtext: '历史预警数',
      left: 'center',
      top: 'center',
      textStyle: { color: '#fff', fontSize: 34 },
      subtextStyle: { color: '#fff', fontSize: 16 },
    },
    grid: { containLabel: false },
    polar: { radius: [60, '100%'] },
    angleAxis: { show: false, startAngle: 90 },
    radiusAxis: { show: false, type: 'category' },
    tooltip: {},
    series: {
      type: 'bar',
      data: list.map((item, index) => ({
        name: item.name,
        value: item.value,
        itemStyle: { color: ALARM_COLORS[index % ALARM_COLORS.length], borderRadius: 10 },
      })),
      barWidth: 20,
      barGap: 0,
      coordinateSystem: 'polar',
      label: { show: true, position: 'middle' },
    },
  };
}
