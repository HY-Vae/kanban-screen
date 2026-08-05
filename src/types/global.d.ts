declare global {
  /** Vite 环境变量（build/utils wrapperEnv 默认值与此对齐） */
  export interface ViteEnv {
    VITE_APP_TITLE: string;
    VITE_PORT: number;
    VITE_PUBLIC_PATH: string;
    VITE_APP_URL: string;
    VITE_APP_BASE_API: string;
    VITE_STRICT_PORT: boolean;
    VITE_MOCK_DEV_SERVER: boolean;
    VITE_MOCK_BASE_API: string;
    VITE_CDN: boolean;
    VITE_COMPRESSION: string;
  }
}

export {};
