// Dialog 通用
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { REMOVE_TOKEN } from '@/utils';

export const dialogStore = defineStore('dialog-store', () => {

  /**
   * @typedef {Object} DialogInfo 彈窗資訊
   * @property {boolean} visible
   * @property {string} mode add | edit | view
   */
  const dialogInfo = ref({
    visible: false,
    mode: 'add'
  });

  // 設定登入資訊
  async function FN_SETUP_USER_INFO(userProfileRespData) {
    USER_PROFILE.value = userProfileRespData;
  }

  // 清除 token cookie
  const FN_LOGOUT = () => {
    REMOVE_TOKEN();
    USER_PROFILE.value = {};
    localStorage.removeItem('infoCorrection');
  };

  return {
    dialogInfo,
    FN_SETUP_USER_INFO,
    FN_LOGOUT,
  };
});
