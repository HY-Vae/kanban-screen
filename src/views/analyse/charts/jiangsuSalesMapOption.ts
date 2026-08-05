import type { EChartsOption } from 'echarts';

/** 江苏省市散点（经度 / 纬度 / 权重） */
const JIANGSU_CITY_POINTS = [
  { name: '南京市', value: [118.7674, 32.0415, 100] },
  { name: '苏州市', value: [120.6196, 31.2994, 95] },
  { name: '无锡市', value: [120.3017, 31.5747, 90] },
  { name: '常州市', value: [119.947, 31.7799, 85] },
  { name: '镇江市', value: [119.4528, 32.2044, 80] },
  { name: '扬州市', value: [119.421, 32.3932, 75] },
  { name: '泰州市', value: [119.915, 32.4849, 70] },
  { name: '南通市', value: [120.8646, 32.0162, 65] },
  { name: '盐城市', value: [120.1399, 33.3776, 60] },
  { name: '淮安市', value: [119.0213, 33.5975, 55] },
  { name: '连云港市', value: [119.1788, 34.6, 50] },
  { name: '徐州市', value: [117.1848, 34.2618, 45] },
  { name: '宿迁市', value: [118.2752, 33.963, 40] },
];

/**
 * 构建江苏销售地图 option（需先 registerMap('jiangsu')）
 * @returns ECharts option
 */
export function buildJiangsuSalesMapOption(): EChartsOption {
  return {
    grid: { left: '4%', right: '4%', bottom: '19%', top: '20%', containLabel: true },
    geo: {
      map: 'jiangsu',
      roam: true,
      aspectScale: 1,
      zoom: 1.4,
      itemStyle: {
        areaColor: '#113F7D',
        borderColor: '#2678B6',
        borderWidth: 1,
      },
      emphasis: {
        label: { show: false, color: '#FFD700', fontSize: 14 },
        itemStyle: { areaColor: '#1E90FF' },
      },
    },
    series: [
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        symbolSize: 8,
        rippleEffect: {
          brushType: 'stroke',
          scale: 5,
          period: 3,
        },
        itemStyle: {
          color: '#FFD700',
          shadowBlur: 10,
          shadowColor: '#FFD700',
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{b}',
          color: '#FFD700',
          fontSize: 12,
          fontWeight: 'bold',
        },
        data: JIANGSU_CITY_POINTS,
        zlevel: 1,
      },
    ],
    visualMap: {
      min: 0,
      max: 100,
      text: ['高', '低'],
      realtime: false,
      calculable: true,
      inRange: { color: ['#50a3ba', '#eac736', '#d94e5d'] },
      textStyle: { color: '#fff' },
    },
  };
}
