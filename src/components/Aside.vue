<script setup>
import { useRouter } from 'vue-router'
import { Menu as IconMenu, Tools, HomeFilled, UserFilled, List } from '@element-plus/icons-vue'

const router = useRouter()

const menuList = [
  { name: '首頁', path: '/', icon: 'HomeFilled' },
  { name: '權限管理', path: '/', icon: 'Tools',
    children:[
      { name: '頁面管理', path: '/permission/page'},
      { name: '元件管理', path: '/permission/element'},
      { name: '角色權限', path: '/permission/role'}
    ]
  },
  { name: '會員管理', path: '/user', icon: 'UserFilled' },
  { name: '最新消息管理', path: '/news', icon: 'List' },
]

/** @func 前往其他頁 */ 
const toPath = (link) => {
  router.push(link)
}

</script>


<template>
  <el-aside width="200px">
    <div class="h-43px p-10px">
      <img src="/images/logo/logo_small.svg" alt="" class="h-full" />
    </div>
    <el-scrollbar class="max-h-[calc(100%-43px-166px)]">
      <el-menu :unique-opened="true" class="h-100% bg-transparent border-r-0">
        <template v-for="(first, firstIdx) in menuList" :key="firstIdx">
          <!-- 有子層 -->
          <el-sub-menu v-if="first.children" :index="String(firstIdx+1)"
            class="color-text_light font-700 text-16px duration-300">
            <template #title>
              <div @click="toPath(first.path)" class="color-text_light font-700 text-16px duration-300 flex">
                <UseIcon :name="first.icon" class="w-18px mr-10px" />
                {{ first.name }}
              </div>
            </template>
            <el-menu-item @click="toPath(second.path)" v-for="(second, secondIdx) in first.children"
              :key="secondIdx" :index="`${firstIdx + 1}-${secondIdx + 1}`"
              class="!pl-16px color-text_light font-700 text-16px duration-300">{{
              second.name }}
            </el-menu-item>
          </el-sub-menu>
          <!-- 沒有子層 -->
          <el-menu-item v-else :index="String(firstIdx + 1)" @click="toPath(first.path)"
            class="color-text_light font-700 text-16px duration-300">
            <template #title>
              <UseIcon :name="first.icon"
                class="w-18px mr-10px group-hover:color-main_green group-active:color-main_green" />
              {{ first.name }}
            </template>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>

    <div
      class="flex flex-col gap-10px p-13px rounded-15px overflow-hidden bg-main_green bg-right bg-contain bg-[url('/images/spiral.svg')]">
      <div class="w-30px bg-white rounded-9px overflow-hidden aspect-ratio-square flex justify-center items-center">
        <div
          class="w-16px aspect-ratio-square bg-main_green color-white rounded-full overflow-hidden flex justify-center items-center">
          ?</div>
      </div>
      <h3 class="text-16px font-700">需要幫助嗎?</h3>
      <p class="text-16px">請聯絡開發人員</p>
      <el-button type="primary" color="#ffff">聯絡我們</el-button>
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