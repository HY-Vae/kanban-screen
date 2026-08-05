import { http } from '@/core/http';

/** 当前登录用户资料 */
export interface AuthUserProfile {
  userId: number;
  nickname: string;
  username: string;
  avatar: string;
}

/**
 * 查询当前用户资料
 * @returns 用户基本信息
 */
export function getAuthUserProfile(): Promise<AuthUserProfile> {
  return http.get<AuthUserProfile>('auth/profile');
}
