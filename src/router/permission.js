import { userAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';
import { ElMessage } from 'element-plus';
import { jwtDecode } from 'jwt-decode';

const permission = (router) => {
  router.beforeEach((to, from) => {
    const userStore = userAuthStore();
    const { USER_PROFILE, USER_PERMISSION } = storeToRefs(userStore);
    const { getToken } = userStore;

    const whitePath = ['/login'];
    const token = getToken();

    // 若已有 token，無法進入登入頁需導向首頁
    if (to.path === '/login' && token) {
      return { path: '/' };
    }

    // 非白名單且沒有 token，導向登入
    if (!whitePath.includes(to.path) && !token) {
      return { path: '/login' };
    }

    // 有登入，檢查頁面權限
    if (token && to.path !== '/' && to.path !== '/setting') {
      const decoded = jwtDecode(token);
      const userPermission = USER_PERMISSION.value.length ? USER_PERMISSION.value : decoded?.roleModule || [];
  
      if(!userPermission.some(item => item.url === to.path)){
        ElMessage.error('該頁面沒有訪問權限');
        return { path: '/' };
      }
    }

    return true;
  });
};

export default permission;
