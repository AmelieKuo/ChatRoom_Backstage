import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { userAuthStore } from '@/stores';

export function getUserPermission() {
  const userStore = userAuthStore();
  const { USER_PERMISSION } = storeToRefs(userStore);
  const permissions = USER_PERMISSION.value;

  const route = useRoute();
  const currentPath = permissions.find(item => item.url === route.path);
  
  return currentPath ? currentPath.roleModuleElement : false;
}