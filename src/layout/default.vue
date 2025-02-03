<script setup>
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'

</script>


<template>
  <section class="w-full max-h-100vh bg-#F8F9FA">
    <el-container class="h-100vh p-15px">

      <Aside />

      <el-container class="flex-col">
        <Header />

        <el-main class="h-100% p-[25px_0px_0px_25px] font-700">
          <RouterView class="bg-white rounded-15px h-100%" />
        </el-main>
      </el-container>
    </el-container>
  </section>
</template>


<style>
/* *{
  outline: 1px solid greenyellow;
} */

</style>