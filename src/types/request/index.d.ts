/** @deprecated 请改用 `@/core/http` 的 {@link ApiResult} */
export interface BaseResult<T> {
  code: number;
  data: T;
  message: string;
}
