import { defineFakeRoute } from 'vite-plugin-fake-server/client';

import { mockOk, mockRandomInt } from './_shared';

const BASE_URL = '/mock/community';

export default defineFakeRoute([
  {
    url: `${BASE_URL}/devices-amount`,
    method: 'GET',
    response: () =>
      mockOk({
        total: 4260,
        list: [
          { id: 'device-1', name: '门禁设备', internal: 62, connected: 38 },
          { id: 'device-2', name: '监控摄像', internal: 45, connected: 55 },
          { id: 'device-3', name: '烟感报警', internal: 70, connected: 30 },
          { id: 'device-4', name: '环境监测', internal: 40, connected: 60 },
        ].map((item) => ({
          ...item,
          internal: mockRandomInt(40) + 30,
          connected: mockRandomInt(40) + 30,
        })),
      }),
  },
  {
    url: `${BASE_URL}/alarms-overview`,
    method: 'GET',
    response: () =>
      mockOk({
        total: 500000,
        list: [
          { id: 'alarm-1', name: '入侵告警', value: 3200 },
          { id: 'alarm-2', name: '设备离线', value: 1800 },
          { id: 'alarm-3', name: '火灾预警', value: 960 },
          { id: 'alarm-4', name: '环境监测', value: 1420 },
        ].map((item) => ({ ...item, value: mockRandomInt(9999) })),
      }),
  },
  {
    url: `${BASE_URL}/population-stats`,
    method: 'GET',
    response: () =>
      mockOk([
        {
          id: 'pop-1',
          name: '园区总人口',
          total: 12860,
          subtitle: '常驻人口',
          ratio: 72,
          subTotal: 9260,
        },
        {
          id: 'pop-2',
          name: '今日访客',
          total: 1860,
          subtitle: '预约访客',
          ratio: 58,
          subTotal: 1080,
        },
        {
          id: 'pop-3',
          name: '在岗员工',
          total: 6420,
          subtitle: '打卡人数',
          ratio: 81,
          subTotal: 5200,
        },
        {
          id: 'pop-4',
          name: '临时人员',
          total: 420,
          subtitle: '施工人员',
          ratio: 35,
          subTotal: 148,
        },
      ]),
  },
  {
    url: `${BASE_URL}/devices-status`,
    method: 'GET',
    response: () =>
      mockOk({
        metrics: [
          { id: 'metric-1', label: '正常运行总数', value: 86 },
          { id: 'metric-2', label: '故障总数', value: mockRandomInt(20) },
          { id: 'metric-3', label: '离线总数', value: mockRandomInt(20) },
          { id: 'metric-4', label: '维护总数', value: mockRandomInt(20) },
        ],
        securityIndex: 92,
      }),
  },
  {
    url: `${BASE_URL}/park-metrics`,
    method: 'GET',
    response: () =>
      mockOk([
        { id: 'metric-area', name: '园区面积', value: 8600 },
        { id: 'metric-green', name: '绿化面积', value: 3200 },
        { id: 'metric-road', name: '道路面积', value: 1800 },
        { id: 'metric-ev', name: '新能源车', value: 460 },
        { id: 'metric-security', name: '安防在线率', value: 9800 },
        { id: 'metric-visitor', name: '访客通行', value: 1260 },
      ]),
  },
  {
    url: `${BASE_URL}/service-projects`,
    method: 'GET',
    response: () =>
      mockOk(
        Array.from({ length: 15 }, (_, index) => ({
          id: `service-${index + 1}`,
          name: `服务项目-${index + 1}`,
          completed: mockRandomInt(60) + 20,
          remaining: mockRandomInt(40) + 10,
        }))
      ),
  },
]);
