/** 生成演示用随机整数（次要指标可用；关键 KPI 优先固定值） */
export function mockRandomInt(range = 100): number {
  return Number.parseInt((Math.random() * range).toFixed(0), 10);
}

/** 统一成功信封 */
export function mockOk<T>(data: T, message = '操作成功') {
  return {
    code: 200 as const,
    message,
    data,
  };
}
