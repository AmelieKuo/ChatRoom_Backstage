<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { userAuthStore } from '@/stores';
import { storeToRefs } from 'pinia';
import menuList from '@/mocks/permission/page.json';
import { Tools, HomeFilled, UserFilled, List, ArrowLeftBold, ArrowRightBold } from '@element-plus/icons-vue';

const router = useRouter();
const userStore = userAuthStore();
const { USER_PERMISSION } = storeToRefs(userStore);

const iconMap = {
  Tools,
  HomeFilled,
  UserFilled,
  List,
  ArrowLeftBold,
  ArrowRightBold
};

const isCollapse = ref(false);
const menu = ref(null);

const toPath = (path) => {
  if(path === '/home') {
    router.push('/');
  }else if (path) {
    router.push(path);
  }
};

// 遞迴過濾 menuList：只保留使用者有權限的項目
const currentMenu = computed(() => {
  const userUrls = USER_PERMISSION.value?.flatMap((mod) => {
    const self = mod.url;
    const subs = mod.children?.map(c => c.url) || [];
    return [self, ...subs];
  }) || [];

  const filterMenu = (items) => {
    return items
      .map(item => {

        const isHome = item.url === '/home';
        const hasAccess = userUrls.includes(item.url);
        const children = item.children ? filterMenu(item.children) : [];

        if (isHome || hasAccess || children.length) {
          return {
            ...item,
            children: children.length ? children : undefined
          };
        }

        return null;
      })
      .filter(Boolean);
  };

  return filterMenu(menuList);
});
</script>



<template>
  <el-aside :width="isCollapse ? '64px' : '200px'" class="transition-all duration-300">
    <!-- Logo + 開關 -->
    <div class="h-43px p-10px flex items-center justify-between">
      <img v-show="!isCollapse" src="/images/logo/logo_small.svg" alt="logo" class="h-full" />
      <el-button
        :icon="isCollapse ? 'ArrowRightBold' : 'ArrowLeftBold'"
        circle size="small"
        @click="isCollapse = !isCollapse"
        class="bg-transparent border-transparent"
      />
    </div>

    <!-- 選單 -->
    <el-scrollbar class="max-h-[calc(100%-43px-166px)]">
      <el-menu ref="menu" :collapse="isCollapse" :unique-opened="true" class="h-full bg-transparent border-r-0">
        
        <template v-for="(item, idx) in currentMenu" :key="idx">
          <!-- 有子層 -->
          <template v-if="item.children?.length">
            <el-sub-menu :index="item.url || String(idx)" class="color-text_light font-700 text-16px duration-300">
              <template #title>
                <div class="flex items-center color-text_light font-700 text-16px duration-300">
                  <component :is="iconMap[item.icon]" v-if="item.icon" class="w-18px mr-10px" />
                  <span v-if="!isCollapse">{{ item.name }}</span>
                </div>
              </template>
              <template v-for="(sub, sidx) in item.children" :key="`${idx}-${sidx}`">
                <template v-if="sub.children?.length">
                  <el-sub-menu :index="sub.url || `${idx}-${sidx}`" class="color-text_light font-700 text-16px duration-300">
                    <template #title>
                      <div class="flex items-center">
                        <component :is="iconMap[sub.icon]" v-if="sub.icon" class="w-18px mr-10px" />
                        <span v-if="!isCollapse">{{ sub.name }}</span>
                      </div>
                    </template>
                    <el-menu-item
                      v-for="(third, tidx) in sub.children"
                      :key="`${idx}-${sidx}-${tidx}`"
                      :index="third.url"
                      @click="toPath(third.url)"
                      class="!pl-16px color-text_light font-700 text-16px duration-300"
                    >
                      {{ third.name }}
                    </el-menu-item>
                  </el-sub-menu>
                </template>
                <el-menu-item v-else :index="sub.url" @click="toPath(sub.url)" class="!pl-16px color-text_light font-700 text-16px duration-300">
                  {{ sub.name }}
                </el-menu-item>
              </template>
            </el-sub-menu>
          </template>

          <!-- 無子層 -->
          <el-menu-item v-else :index="item.url || String(idx)" @click="toPath(item.url)" class="color-text_light font-700 text-16px duration-300">
            <component :is="iconMap[item.icon]" v-if="item.icon" class="w-18px mr-10px" />
            <span v-if="!isCollapse">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>

    <!-- 開發人員 -->
    <div
      v-show="!isCollapse"
      class="flex flex-col gap-10px p-13px rounded-15px text-white text-sm bg-main_green bg-[url('/images/spiral.svg')] bg-contain"
    >
      <div class="w-30px bg-white rounded-9px aspect-square flex justify-center items-center">
        <div class="w-16px bg-main_green text-white rounded-full flex justify-center items-center">?</div>
      </div>
      <h3 class="text-16px font-700">需要幫助嗎?</h3>
      <p>請聯絡開發人員</p>
      <el-button @click="router.push('/')" type="primary" color="#ffff">聯絡我們</el-button>
    </div>
  </el-aside>
</template>



<style scoped>
:deep(.el-sub-menu ul){
  background: transparent;
  margin-left: 48px;
  border-left: 2px solid var(--border_gray);
}

:deep(.el-menu-item.is-active){
  color: var(--text_dark);
  background: white;
  border-radius: 12px;
}

:deep(.el-menu-item.is-active svg) {
  color: var(--main_green);
}

:deep(.el-sub-menu.is-opened .el-sub-menu__title) {
  background: white;
  border-radius: 12px;
}

:deep(.el-sub-menu.is-opened .el-sub-menu__title div) {
  color: var(--main_green);
}

:deep(.el-sub-menu.is-opened .el-sub-menu__title div) {
  color: var(--main_green);
}

:deep(.el-sub-menu .el-menu-item.is-active) {
  color: var(--text_dark);
  background: transparent;
  border-radius: 12px;
}

:deep(.el-sub-menu:active){
  color: var(--text_dark);
  background: white;
  border-radius: 12px;
}

:deep(.el-sub-menu .el-menu-item) {
  height: 60px;
}

:deep(.el-sub-menu .el-menu-item:active) {
  color: var(--text_dark);
  background: transparent;
  border-radius: 0px;
}

</style>