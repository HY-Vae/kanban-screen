import type { App } from 'vue';

import { initAutofit } from '@/core/autofit';
import { setupDirective } from '@/directive';
import { useEcharts } from '@/plugins/echarts';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';

export default {
  install(app: App<Element>) {
    setupRouter(app);
    setupStore(app);
    setupDirective(app);
    useEcharts(app);
    initAutofit();
  },
};
