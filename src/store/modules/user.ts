import { defineStore } from 'pinia';

import type { AuthUserProfile } from '@/api/auth';

/**
 * 登录用户资料（请求放 api/auth，登录流程完成后再写入）
 */
export const useUserStore = defineStore('userStore', {
  state: () => ({
    userinfo: null as AuthUserProfile | null,
  }),
  getters: {},
  actions: {
    /**
     * 写入用户资料
     * @param profile 用户基本信息
     */
    setUserInfo(profile: AuthUserProfile) {
      this.userinfo = profile;
    },
    /** 清空用户资料 */
    clearUserInfo() {
      this.userinfo = null;
    },
  },
});
