import { defineFakeRoute } from 'vite-plugin-fake-server/client';

import { mockOk, mockRandomInt } from './_shared';

const BASE_URL = '/mock/business';

const PERIODS = [
  { label: '2020.09', value: '2020-09' },
  { label: '2021.03', value: '2021-03' },
  { label: '2021.09', value: '2021-09' },
];

const TAX_MONTHS = [
  '2021.01',
  '2021.02',
  '2021.03',
  '2021.04',
  '2021.05',
  '2021.06',
  '2021.07',
  '2021.08',
  '2021.09',
  '2021.10',
  '2021.11',
  '2021.12',
];

/** 大额金额（演示翻牌 / KPI） */
function mockMoney() {
  return 1_000_000_000 + mockRandomInt(999_999_999);
}

/** 带符号的环比百分比 */
function mockTrend(range = 40) {
  return mockRandomInt(range) - Math.floor(range / 2);
}

/** 一位小数金额文案 */
function mockDecimal(max = 999) {
  return `${mockRandomInt(max)}.${String(mockRandomInt(99)).padStart(2, '0')}`;
}

export default defineFakeRoute([
  {
    url: `${BASE_URL}/import-export`,
    method: 'GET',
    response: () => {
      const importAmount = mockMoney();
      const exportAmount = mockMoney();
      return mockOk({
        totalDisplay: String(1_000_000 + mockRandomInt(999_999)),
        importAmount,
        exportAmount,
        importBar: 200 + mockRandomInt(300),
        exportBar: -(100 + mockRandomInt(200)),
        periods: PERIODS,
      });
    },
  },
  {
    url: `${BASE_URL}/enterprise-overview`,
    method: 'GET',
    response: () => {
      const stateOwned = 200 + mockRandomInt(300);
      const privateOwned = 200 + mockRandomInt(400);
      return mockOk({
        taxAmount: mockMoney(),
        enterpriseCount: stateOwned + privateOwned,
        types: [
          { id: 'type-state', name: '国营企业', value: stateOwned },
          { id: 'type-private', name: '私营企业', value: privateOwned },
        ],
        investmentTotal: mockMoney(),
        investmentTrend: mockTrend(200),
        taxTotal: mockMoney(),
        taxTrend: mockTrend(200),
        asOf: '2021.12.30',
      });
    },
  },
  {
    url: `${BASE_URL}/geo-planning`,
    method: 'GET',
    response: () =>
      mockOk({
        asOf: '2021.12.30',
        rows: [
          [
            { id: 'geo-1', label: '设备总数', value: String(500 + mockRandomInt(400)), color: '#ff7e5f' },
            { id: 'geo-2', label: '在线设备', value: String(400 + mockRandomInt(300)), color: '#ff7e5f' },
            { id: 'geo-3', label: '离线设备', value: String(50 + mockRandomInt(100)), color: '#fff' },
            { id: 'geo-4', label: '告警设备', value: String(10 + mockRandomInt(50)), color: '#08D9F1' },
          ],
          [
            {
              id: 'geo-5',
              label: '规划面积',
              value: `${(5 + mockRandomInt(5) + mockRandomInt(9) / 10).toFixed(1)}k㎡`,
              color: '#ff7e5f',
            },
            { id: 'geo-6', label: '已验收', value: String(400 + mockRandomInt(300)), color: '#2a65ea' },
            { id: 'geo-7', label: '建设中', value: String(40 + mockRandomInt(80)), color: '#fff' },
            { id: 'geo-8', label: '待规划', value: String(10 + mockRandomInt(40)), color: '#08D9F1' },
          ],
        ],
      }),
  },
  {
    url: `${BASE_URL}/daily-trade`,
    method: 'GET',
    response: () => {
      const buildDetails = (prefix: string, names: string[]) =>
        names.map((name, index) => ({
          id: `${prefix}-${index + 1}`,
          name,
          amount: 50 + mockRandomInt(150),
        }));

      const cards = [
        {
          id: 'daily-export',
          title: '今日出口额 / 万元',
          details: buildDetails('cat', ['机电', '轻工', '化工', '其他']),
        },
        {
          id: 'daily-cargo',
          title: '今日货量/吨',
          details: buildDetails('cargo', ['集装箱', '散货', '冷链', '其他']),
        },
        {
          id: 'daily-vehicle',
          title: '今日进出车辆/辆',
          details: buildDetails('veh', ['货车', '客车', '危化', '其他']),
        },
      ];

      return mockOk(
        cards.map((card) => ({
          ...card,
          amount: card.details.reduce((sum, item) => sum + item.amount, 0),
        }))
      );
    },
  },
  {
    url: `${BASE_URL}/park-assets`,
    method: 'GET',
    response: () =>
      mockOk([
        {
          id: 'asset-staff',
          title: '员工',
          describe: '相关员工',
          amount: 200 + mockRandomInt(300),
          image: '/images/business/content/bg-middle-1.png',
        },
        {
          id: 'asset-building',
          title: '智慧大楼',
          describe: '区域面积/㎡',
          amount: 10_000 + mockRandomInt(5000),
          image: '/images/business/content/bg-middle-2.png',
        },
        {
          id: 'asset-device',
          title: '智慧设备',
          describe: '设备总数',
          amount: 800 + mockRandomInt(500),
          image: '/images/business/content/bg-middle-3.png',
        },
        {
          id: 'asset-report',
          title: '数据报表',
          describe: '报表下载总数',
          amount: 100 + mockRandomInt(300),
          image: '/images/business/content/bg-middle-4.png',
        },
      ]),
  },
  {
    url: `${BASE_URL}/annual-tax`,
    method: 'GET',
    response: () =>
      mockOk({
        unit: '万元',
        periods: PERIODS,
        series: [
          {
            name: '税收',
            points: TAX_MONTHS.map((label) => ({
              label,
              value: 50 + mockRandomInt(950),
            })),
          },
        ],
      }),
  },
  {
    url: `${BASE_URL}/repair-export`,
    method: 'GET',
    response: () =>
      mockOk({
        total: 500 + mockRandomInt(500),
        label: '维修业务出口总值',
        periods: PERIODS,
        metrics: [
          {
            key: 'accept-1',
            label: '批准规划面积验收率',
            value: Number((1 + mockRandomInt(100) / 100).toFixed(2)),
            unit: '$',
          },
          {
            key: 'accept-2',
            label: '竣工验收通过率',
            value: Number((1 + mockRandomInt(100) / 100).toFixed(2)),
            unit: '$',
          },
          {
            key: 'accept-3',
            label: '专项验收完成率',
            value: Number((1 + mockRandomInt(100) / 100).toFixed(2)),
            unit: '$',
          },
        ],
      }),
  },
  {
    url: `${BASE_URL}/category-exports`,
    method: 'GET',
    response: () =>
      mockOk([
        {
          id: 'cat-food',
          title: '食品业务出口总值',
          value: mockDecimal(),
          unit: '亿 /k㎡',
          trend: mockTrend(20),
          asOf: '2021.12.30',
        },
        {
          id: 'cat-mech',
          title: '机电业务出口总值',
          value: mockDecimal(),
          unit: '亿 /k㎡',
          trend: mockTrend(20),
          asOf: '2021.12.30',
        },
        {
          id: 'cat-chem',
          title: '化工业务出口总值',
          value: mockDecimal(),
          unit: '亿 /k㎡',
          trend: mockTrend(20),
          asOf: '2021.12.30',
        },
        {
          id: 'cat-light',
          title: '轻工业务出口总值',
          value: mockDecimal(),
          unit: '亿 /k㎡',
          trend: mockTrend(20),
          asOf: '2021.12.30',
        },
      ]),
  },
  {
    url: `${BASE_URL}/foreign-trade`,
    method: 'GET',
    response: () =>
      mockOk([
        {
          id: 'foreign-1',
          title: '货物贸易涉外总额',
          value: Number(mockDecimal()),
          unit: '亿',
          trend: Number((mockTrend(80) + Math.random()).toFixed(1)),
          chartValue: 40 + mockRandomInt(50),
        },
        {
          id: 'foreign-2',
          title: '服务贸易涉外总额',
          value: Number(mockDecimal()),
          unit: '亿',
          trend: Number((mockTrend(80) + Math.random()).toFixed(1)),
          chartValue: 30 + mockRandomInt(50),
        },
      ]),
  },
]);
