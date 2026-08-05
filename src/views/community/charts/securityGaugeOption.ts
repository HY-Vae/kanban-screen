import type { EChartsOption } from 'echarts';

/**
 * 构建安全指数半圆仪表盘 option
 * @param securityIndex 安全指数 0–100
 * @returns ECharts option
 */
export function buildSecurityGaugeOption(securityIndex: number): EChartsOption {
  const ratio = Math.min(Math.max(securityIndex, 0), 100) / 100;

  return {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 1,
        splitNumber: 8,
        axisLine: {
          lineStyle: { width: 12, color: [[1, '#05C1D3']] },
        },
        pointer: {
          show: false,
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: { color: 'auto' },
        },
        axisTick: {
          length: 44,
          distance: -44,
          lineStyle: { color: 'auto', width: 1 },
        },
        splitLine: {
          length: 24,
          distance: -24,
          lineStyle: { color: 'auto', width: 8, miterLimit: 12 },
        },
        progress: {
          show: true,
          width: 14,
          itemStyle: { color: '#707070' },
        },
        axisLabel: { show: false },
        detail: {
          fontSize: 24,
          offsetCenter: [0, '9%'],
          valueAnimation: true,
          formatter(value: number) {
            return `${Math.round(value * 100)}\n安全指数`;
          },
          color: '#05C1D3',
        },
        data: [ratio],
      },
    ],
  };
}
