import { defineFakeRoute } from 'vite-plugin-fake-server/client';

import { mockOk, mockRandomInt } from './_shared';

const BASE_URL = '/mock/analyse';

export default defineFakeRoute([
  {
    url: `${BASE_URL}/device-sales-stats`,
    method: 'GET',
    response: () =>
      mockOk({
        totalDeviceSales: 6820,
        yearlyGrowthRate: 15,
      }),
  },
  {
    url: `${BASE_URL}/company-sales-distribution`,
    method: 'GET',
    response: () =>
      mockOk([
        { name: '科技有限公司', amount: mockRandomInt(999999), percent: mockRandomInt() },
        { name: '智造有限公司', amount: mockRandomInt(999999), percent: mockRandomInt() },
        { name: '数字有限公司', amount: mockRandomInt(999999), percent: mockRandomInt() },
        { name: '物联有限公司', amount: mockRandomInt(999999), percent: mockRandomInt() },
        { name: '云端有限公司', amount: mockRandomInt(999999), percent: mockRandomInt() },
      ]),
  },
  {
    url: `${BASE_URL}/brands-distribution`,
    method: 'GET',
    response: () =>
      mockOk([
        { name: '品牌A', value: mockRandomInt() },
        { name: '品牌B', value: mockRandomInt() },
        { name: '品牌C', value: mockRandomInt() },
        { name: '品牌D', value: mockRandomInt() },
        { name: '品牌E', value: mockRandomInt() },
        { name: '品牌F', value: mockRandomInt() },
        { name: '品牌G', value: mockRandomInt() },
        { name: '品牌H', value: mockRandomInt() },
      ]),
  },
  {
    url: `${BASE_URL}/showcase-metrics`,
    method: 'GET',
    response: () =>
      mockOk(
        Array(3)
          .fill(0)
          .map((_, index) => ({
            name: `数据展示-${index + 1}`,
            value: mockRandomInt(99999),
          }))
      ),
  },
  {
    url: `${BASE_URL}/region-sales-ratio`,
    method: 'GET',
    response: () =>
      mockOk(
        ['北京', '上海', '广州', '深圳', '成都', '杭州', '武汉', '重庆', '西安', '苏州', '南京', '长沙'].map(
          (name) => ({
            name,
            value: mockRandomInt(9999),
          })
        )
      ),
  },
  {
    url: `${BASE_URL}/share-ratio`,
    method: 'GET',
    response: () =>
      mockOk(
        Array(6)
          .fill(0)
          .map((_, index) => ({
            name: `数据-${index + 1}`,
            value: mockRandomInt(),
          }))
      ),
  },
  {
    url: `${BASE_URL}/brand-showcase`,
    method: 'GET',
    response: () =>
      mockOk(
        Array(5)
          .fill(0)
          .map((_, index) => ({
            name: `品牌${index + 1}`,
            value: mockRandomInt(999),
          }))
      ),
  },
  {
    url: `${BASE_URL}/show-statistics`,
    method: 'GET',
    response: () =>
      mockOk(
        Array(6)
          .fill(0)
          .map((_, index) => ({ name: `数据展示${index + 1}`, value: mockRandomInt() }))
      ),
  },
]);
