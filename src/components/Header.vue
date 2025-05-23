<script setup>
import { Setting, User } from '@element-plus/icons-vue'
import { computed } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute();

const breadcrumb = computed(() => {
  if(route){
    return route.matched || [];
  }
})
</script>



<template>
  <el-header class="color-text_light w-full h-29px flex justify-between font-700 px-0px pl-25px">
    <ul class="color-text_dark text-20px font-700 flex items-center">
      <template v-for="(item, idx) in breadcrumb" :key="item.path">
        <li v-if="idx !== 0" class="flex gap-10px">
          <router-link v-if="item.components" :to="item.path"
            :class="breadcrumb.length === idx + 1 ? 'pl-10px color-text_dark hover:color-text_dark' : 'color-text_light hover:color-text_light'"
            class="text-20px font-700 hover:opacity-80 duration-300">
            {{ item.meta.title }}
          </router-link>
          <span v-else :class="breadcrumb.length === idx + 1 ? 'pl-10px color-text_dark' : 'color-text_light'"
            class="text-20px font-700 duration-300">
            {{ item.meta.title }}
          </span>
          <span v-if="breadcrumb.length !== idx + 1">/</span>
        </li>
      </template>
    </ul>
    <div class="flex items-center justify-end gap-5px">
      <User class="mr-5px w-20px text-text_light" />
      <p class="min-w-70px mr-10px">Tom</p>
      <router-link to="/setting">
        <Setting class="color-text_light w-20px" />
      </router-link>
    </div>
  </el-header>
</template>