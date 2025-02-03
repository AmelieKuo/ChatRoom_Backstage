<template>
  <section class="min-h-100vh w-full bg-white flex justify-between items-center">
    <div class="w-full p-100px flex flex-col justify-center items-center xxl:ml-10% xxl:items-start">

      <h1 class="color-main_green font-bold text-h1 mb-8px w-fit">ChatRoom 管理後台</h1>
      <span class="color-text_light font-bold text-h4 w-fit">輸入帳號密碼登入</span>
      <el-form :model="form" label-width="auto" style="width: 100%" class="mt-20px max-w-500px">
        <el-form-item label="帳號">
          <el-input v-model="form.account" placeholder="請輸入帳號" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="form.password" show-password type="password" placeholder="請輸入密碼" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="h-38px w-full">登入</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div
      class="hidden xxl:flex self-start w-fit h-80vh aspect-ratio-square bg-main_green justify-center items-center rounded-[0px_0px_0px_18px]">
      <div class="">
        <img src="/images/logo/login.png" alt="chatRoom" class="w-full">
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  account: '',
  password: '',
})

const onSubmit = () => {
  console.log('submit!')
}

</script>

<style>
</style>
