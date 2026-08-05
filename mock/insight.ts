import { defineFakeRoute } from 'vite-plugin-fake-server/client';

import { mockOk, mockRandomInt } from './_shared';

const BASE_URL = '/mock/insight';

const MONTH_LABELS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

function buildMonthSeries(name: string) {
  return {
    name,
    points: MONTH_LABELS.map((label) => ({ label, value: mockRandomInt() })),
  };
}

export default defineFakeRoute([
  {
    url: `${BASE_URL}/scale-benefit`,
    method: 'GET',
    response: () =>
      mockOk({
        totalGrowth: 128,
        income: 865420000,
        rankGap: 112,
        expend: 420180000,
        expendChain: 98,
      }),
  },
  {
    url: `${BASE_URL}/year-income`,
    method: 'GET',
    response: () =>
      mockOk({
        list: Array(4)
          .fill(0)
          .map((_, index) => ({
            id: `income-${index + 1}`,
            title: `经营总收入-${index + 1}`,
            amount: mockRandomInt(9999999),
            percent: mockRandomInt(),
          })),
        endTime: Date.now(),
      }),
  },
  {
    url: `${BASE_URL}/park-plan`,
    method: 'GET',
    response: () => mockOk([buildMonthSeries('入园'), buildMonthSeries('出园')]),
  },
  {
    url: `${BASE_URL}/revenue-overview`,
    method: 'GET',
    response: () =>
      mockOk(
        Array(12)
          .fill(0)
          .map(() => mockRandomInt(9999))
      ),
  },
  {
    url: `${BASE_URL}/park-trade`,
    method: 'GET',
    response: () =>
      mockOk({
        amount: 56800000,
        importAmount: 24600,
        exportAmount: 32200,
      }),
  },
  {
    url: `${BASE_URL}/enterprise-info`,
    method: 'GET',
    response: () =>
      mockOk({
        taxAmount: 1286000,
        taxTotal: 86200,
        taxTrend: -12,
        enterpriseCount: 1260,
        types: [
          { id: 'type-state', name: '国营企业', value: 180 },
          { id: 'type-private', name: '私营企业', value: 980 },
        ],
        investmentTotal: 4200,
        investmentTrend: 123,
        asOf: '2021.12.30',
      }),
  },
  {
    url: `${BASE_URL}/park-areas`,
    method: 'GET',
    response: () =>
      mockOk(
        Array(9)
          .fill(0)
          .map((_, index) => ({
            id: `area-${index + 1}`,
            area: mockRandomInt(99999),
            summary: '建成投产面积',
          }))
      ),
  },
]);
