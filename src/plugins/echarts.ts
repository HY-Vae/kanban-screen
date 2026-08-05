import {
  BarChart,
  EffectScatterChart,
  GaugeChart,
  LineChart,
  MapChart,
  PictorialBarChart,
  PieChart,
  TreemapChart,
} from 'echarts/charts';
import {
  DataZoomComponent,
  GraphicComponent,
  GridComponent,
  LegendComponent,
  PolarComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  VisualMapComponent,
} from 'echarts/components';
import * as echarts from 'echarts/core';
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers';
import type { App } from 'vue';

const { use } = echarts;
use([
  PieChart,
  EffectScatterChart,
  BarChart,
  LineChart,
  CanvasRenderer,
  SVGRenderer,
  GridComponent,
  TreemapChart,
  TitleComponent,
  PolarComponent,
  LegendComponent,
  GraphicComponent,
  ToolboxComponent,
  TooltipComponent,
  DataZoomComponent,
  VisualMapComponent,
  PictorialBarChart,
  GaugeChart,
  MapChart,
]);

/**
 * 按需引入 echarts，并挂到 globalProperties.$echarts。
 * @see https://echarts.apache.org/handbook/zh/basics/import/#%E5%9C%A8-typescript-%E4%B8%AD%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5
 */
export function useEcharts(app: App) {
  app.config.globalProperties.$echarts = echarts;
}

export default echarts;
