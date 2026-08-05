import type { EChartsOption } from 'echarts';

import echarts from '@/plugins/echarts';

/**
 * 构建环比迷你象形柱 option
 * @param value 0–100 进度
 * @returns ECharts option
 */
export function buildTrendPictorialBarOption(value: number): EChartsOption {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow', shadowStyle: { shadowColor: '#66FFFF', shadowBlur: 10 } },
      formatter: (data) => {
        const items = Array.isArray(data) ? data : [data];
        let tip = '';
        items.forEach((item) => {
          if (item.seriesType === 'bar') {
            tip += '<div class="echarts-tip-div">';
            tip += `<div class="left">${item.marker}${item.seriesName}：</div>`;
            tip += `<div class="right">${item.value}%</div>`;
            tip += '</div>';
          }
        });
        return tip;
      },
    },
    grid: { top: '9%', right: '0%', left: '0%', bottom: '0%', containLabel: false },
    xAxis: [{ type: 'category', show: false }],
    yAxis: [{ type: 'value', show: false, max: 100 }],
    series: [
      {
        name: '环比',
        type: 'bar',
        barWidth: 30,
        showBackground: true,
        backgroundStyle: { color: 'transparent' },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FEDB65' },
            { offset: 1, color: '#66FFFF' },
          ]),
        },
        data: [value],
        z: 0,
      },
      {
        type: 'pictorialBar',
        barWidth: 30,
        itemStyle: { color: '#0D3770' },
        symbolRepeat: true,
        symbolMargin: 3,
        symbol: 'rect',
        symbolSize: [30, 4],
        data: [value],
        z: 1,
      },
    ],
    animationDuration: 0,
    animationDurationUpdate: 1000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
  };
}
