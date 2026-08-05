import { defineFakeRoute } from 'vite-plugin-fake-server/client';

import { mockOk, mockRandomInt } from './_shared';

const BASE_URL = '/mock/parking';

const TIMELINE = ['02.01', '02.02', '02.03', '02.04', '02.05', '02.06', '02.07'];

function mockRoadStatus(): string {
  return mockRandomInt(1) === 0 ? '拥堵' : '畅通';
}

function mockSeriesPoints(): Array<{ label: string; value: number }> {
  return TIMELINE.map((label) => ({
    label,
    value: Number(mockRandomInt(999).toFixed(0)),
  }));
}

export default defineFakeRoute([
  {
    url: `${BASE_URL}/road-status`,
    method: 'GET',
    response: () =>
      mockOk({
        entrances: [
          { id: 'nw', name: '入卡口（西北门）', status: mockRoadStatus() },
          { id: 'ne', name: '入卡口（东北门）', status: mockRoadStatus() },
          { id: 'se', name: '入卡口（东南门）', status: mockRoadStatus() },
          { id: 'sw', name: '入卡口（西南门）', status: mockRoadStatus() },
        ],
        suggest: `     高峰时段大量车流量容易造成拥堵，主要由XXX企业、XXX企业的车辆构成，
            <span>可建议XXX企业向后延迟15min错峰入园。</span>
            高峰时段大量车流量容易造成拥堵， 主要由XXX企业、XXX企业的车辆构成`,
      }),
  },
  {
    url: `${BASE_URL}/monitor`,
    method: 'GET',
    response: () =>
      mockOk([
        { id: 'nw', name: '入卡口（西北门）', count: mockRandomInt(999), trend: mockRandomInt() },
        { id: 'ne', name: '入卡口（东北门）', count: mockRandomInt(999), trend: mockRandomInt() },
        { id: 'se', name: '入卡口（东南门）', count: mockRandomInt(999), trend: mockRandomInt() },
        { id: 'sw', name: '入卡口（西南门）', count: mockRandomInt(999), trend: mockRandomInt() },
      ]),
  },
  {
    url: `${BASE_URL}/flow-rate`,
    method: 'GET',
    response: () =>
      mockOk({
        overview: [
          { key: 'peak-enter', label: '最高进园车流量', value: 8620 },
          { key: 'peak-leave', label: '最高出园车流量', value: 7940 },
        ],
        series: [
          { name: '入园', points: mockSeriesPoints() },
          { name: '出园', points: mockSeriesPoints() },
        ],
      }),
  },
]);
