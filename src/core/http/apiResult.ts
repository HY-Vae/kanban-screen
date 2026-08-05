import { API_SUCCESS_CODE } from './constants';

/**
 * 统一 API 结果信封
 */
export interface ApiResult<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/**
 * 判断响应体是否为统一 API 结果信封
 * @param value 待检测值
 * @returns 是否为 {@link ApiResult}
 */
export function isApiResultEnvelope(value: unknown): value is ApiResult {
  return (
    typeof value === 'object' && value !== null && 'code' in value && typeof (value as ApiResult).code === 'number'
  );
}

/**
 * 是否为业务成功码
 * @param code 业务码
 */
export function isApiSuccessCode(code: number): boolean {
  return code === API_SUCCESS_CODE;
}
