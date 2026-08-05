import type { EChartsOption } from 'echarts';

import type { NamedValueRow } from '@/api/common';
import echarts from '@/plugins/echarts';

const TYPE_COLORS: Record<string, { solid: [string, string]; soft: [string, string] }> = {
  'type-state': {
    solid: ['#0DBBB3', '#66FFFF'],
    soft: ['#0DBBB37f', '#66FFFF7f'],
  },
  'type-private': {
    solid: ['#DEA60F', '#FFE457'],
    soft: ['#DEA60F7f', '#FFE4577f'],
  },
};

const FALLBACK = {
  solid: ['#0DBBB3', '#66FFFF'] as [string, string],
  soft: ['#0DBBB37f', '#66FFFF7f'] as [string, string],
};

/**
 * 构建企业类型双环饼图 option
 * @param types 企业类型（含稳定 id）
 * @returns ECharts option
 */
export function buildEnterpriseTypePieOption(types: NamedValueRow[]): EChartsOption {
  const outer = types.map((item) => {
    const palette = TYPE_COLORS[item.id] ?? FALLBACK;
    return {
      value: item.value,
      name: item.name,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: palette.solid[0] },
          { offset: 1, color: palette.solid[1] },
        ]),
      },
    };
  });

  const inner = types.map((item) => {
    const palette = TYPE_COLORS[item.id] ?? FALLBACK;
    return {
      value: item.value,
      name: item.name,
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: palette.soft[0] },
          { offset: 1, color: palette.soft[1] },
        ]),
      },
    };
  });

  return {
    tooltip: { trigger: 'item' },
    grid: { top: 0, left: 0, right: 0, bottom: 0, containLabel: false },
    series: [
      {
        name: '企业',
        type: 'pie',
        radius: ['74%', '100%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        emphasis: { disabled: true, scale: false, scaleSize: 0 },
        data: outer,
      },
      {
        name: '企业',
        type: 'pie',
        radius: ['54%', '74%'],
        avoidLabelOverlap: false,
        label: { show: false },
        labelLine: { show: false },
        emphasis: { disabled: true, scale: false, scaleSize: 0 },
        data: inner,
      },
    ],
  };
}
