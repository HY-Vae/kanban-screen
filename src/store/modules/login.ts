import { defineStore } from 'pinia';

/**
 * 登录表单暂存（登录流程未接完前先放这里）
 */
export const useLoginStore = defineStore('loginStore', {
  state: () => ({
    username: '',
    password: '',
    rememberMe: false,
    isLoading: false,
  }),
  getters: {},
  actions: {},
});
