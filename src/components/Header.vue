<script setup>
import { Setting, User } from '@element-plus/icons-vue'
</script>



<template>
  <el-header class="color-text_light w-full h-29px flex justify-between font-700">
    <p class="color-text_dark text-20px font-700">首頁</p>
    <div class="flex items-center justify-end">
      <el-icon class="mr-5px">
        <User />
      </el-icon>
      <span>Tom</span>
      <el-dropdown class="ml-20px color-text_light">
        <el-icon>
          <setting />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>修改個人資料</el-dropdown-item>
            <el-dropdown-item>修改密碼</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>