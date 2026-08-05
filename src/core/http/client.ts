import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type CustomParamsSerializer,
  type InternalAxiosRequestConfig,
} from 'axios';
import { stringify } from 'qs';

import { TOKEN_KEY } from '@/enums/CacheEnum';

import { isApiResultEnvelope, isApiSuccessCode } from './apiResult';
import { HTTP_TIMEOUT } from './constants';

type RequestMethods = 'get' | 'post' | 'put' | 'delete' | 'patch';

/**
 * 开发期走 mock baseURL，关闭 mock 后走业务 API 前缀
 */
function resolveHttpBaseUrl(): string {
  const useMock = import.meta.env.VITE_MOCK_DEV_SERVER === true || import.meta.env.VITE_MOCK_DEV_SERVER === 'true';
  return useMock ? import.meta.env.VITE_MOCK_BASE_API : import.meta.env.VITE_APP_BASE_API;
}

/**
 * 创建带统一 baseURL / 超时 / 序列化的 Axios 实例
 */
function createAxiosInstance(): AxiosInstance {
  return axios.create({
    baseURL: resolveHttpBaseUrl(),
    timeout: HTTP_TIMEOUT,
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json;charset=utf-8',
    },
    paramsSerializer: {
      serialize: stringify as unknown as CustomParamsSerializer,
    },
  });
}

/**
 * 大屏 HTTP 客户端：鉴权头注入 + {@link ApiResult} 解包
 */
class KanbanHttp {
  private readonly instance: AxiosInstance = createAxiosInstance();

  constructor() {
    this.attachRequestInterceptor();
    this.attachResponseInterceptor();
  }

  /**
   * GET 请求（返回解包后的 data）
   * @param url 业务 path，如 `parking/alarms`（勿带 /mock 前缀）
   * @param config Axios 配置
   */
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('get', url, config);
  }

  /**
   * POST 请求（返回解包后的 data）
   * @param url 业务 path
   * @param data 请求体
   * @param config Axios 配置
   */
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>('post', url, { ...config, data });
  }

  /**
   * 通用请求
   * @param method HTTP 方法
   * @param url 业务 path
   * @param config Axios 配置
   */
  request<T>(method: RequestMethods, url: string, config?: AxiosRequestConfig): Promise<T> {
    // 拦截器已解包信封，第二泛型指向业务 data 而非 AxiosResponse
    return this.instance.request<T, T>({ ...config, method, url });
  }

  private attachRequestInterceptor(): void {
    this.instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const accessToken = localStorage.getItem(TOKEN_KEY);
      if (accessToken) {
        config.headers.Authorization = accessToken;
      }
      return config;
    });
  }

  private attachResponseInterceptor(): void {
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => this.handleSuccess(response) as AxiosResponse,
      (error: unknown) => this.handleError(error)
    );
  }

  private handleSuccess(response: AxiosResponse): unknown {
    if (response.config.responseType === 'blob' || response.config.responseType === 'arraybuffer') {
      return response.data;
    }

    const raw = response.data;
    if (isApiResultEnvelope(raw)) {
      if (!isApiSuccessCode(raw.code)) {
        return Promise.reject(new Error(raw.message || 'Request failed'));
      }
      return raw.data;
    }

    return raw;
  }

  private handleError(error: unknown): Promise<never> {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
    }
    const message = axios.isAxiosError(error) ? error.message : 'Network error';
    return Promise.reject(new Error(message));
  }
}

/** 全局 HTTP 客户端（信封已解包） */
export const http = new KanbanHttp();
