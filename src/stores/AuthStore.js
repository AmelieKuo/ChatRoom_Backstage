import { defineStore } from 'pinia';
import { ref } from 'vue';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export const userAuthStore = defineStore('auth-store', () => {

  const USER_PROFILE = ref({});
  const USER_PERMISSION = ref([]);

  // 取得登入資訊
  const getToken = () => {
    const token = Cookies.get('chatroomBackStage_Token');
    if(token && USER_PROFILE.value.id === undefined) {
      setToken(token);
    }

    return typeof token === 'string' && token.length > 0 ? token : false;
  }

  const getUniquePages = (roleModule) => {
    const seen = new Set();
    const pages = [];
  
    roleModule?.forEach(role => {
      role.pages?.forEach(page => {
        if (!seen.has(page.url)) {
          seen.add(page.url);
          pages.push(page);
        }
      });
    });
  
    return pages;
  };

  // 設定登入資訊
  const setToken = (token) => {
    USER_PROFILE.value = jwtDecode(token);
    USER_PERMISSION.value = getUniquePages(USER_PROFILE.value.roleModule);
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    Cookies.set('chatroomBackStage_Token', token, { expires });
  }

  // 清除 token cookie
  const removeToken = () => {
    Cookies.remove('chatroomBackStage_Token');
    USER_PROFILE.value = {};
    USER_PERMISSION.value = []
  };

  return {
    USER_PROFILE,
    USER_PERMISSION,
    getToken,
    setToken,
    removeToken,
  };
});
