<script setup>
import { reactive, inject, ref } from 'vue';
import permissions from '@/mocks/user.json';
import { createFakeJWT } from '@/utils';
import { useRouter } from 'vue-router'
import { userAuthStore } from '@/stores';
const userStore = userAuthStore();
const { setToken } = userStore;
const router = useRouter();

const form = reactive({
  account: 'Test',
  password: '123456',
});

const formRef = ref(null);
const formRule = {
  account: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
  ],
};

const $alert = inject('$alert');

// 取出特定使用者權限
const getUserPermission = (account) => permissions.find(p => p.account === account);

  const onSubmit = async () => {
  if (!formRef.value) return;
  try {
    await formRef.value.validate();

    if (form.account !== 'Test' && form.account !== 'Staff') {
      $alert({
        title: `帳號不存在`,
        type: 'error',
        showCancel: false,
        showConfirm: false,
        timer: 1000,
      });
      return;
    }

    const permission = getUserPermission(form.account);
    const token = createFakeJWT(permission);
    setToken(token);

    $alert({
      title: `登入成功`,
      type: 'success',
      showCancel: false,
      showConfirm: false,
      timer: 1000,
    });

    router.push('/');

  } catch (error) {
    console.log(error);
  }
};


</script>

<template>
  <section class="min-h-100vh w-full bg-white flex justify-between items-center">
    <div class="w-full p-100px flex flex-col justify-center items-center xxl:ml-10% xxl:items-start">

      <h1 class="color-main_green font-bold text-h1 mb-8px w-fit">ChatRoom 管理後台</h1>
      <span class="color-text_light font-bold text-h4 w-fit">輸入帳號密碼登入</span>
      <el-form ref="formRef" :rules="formRule" :model="form" label-width="auto" style="width: 100%" class="mt-20px max-w-500px">
        <el-form-item label="帳號" prop="account">
          <el-input v-model="form.account" placeholder="請輸入帳號" />
        </el-form-item>
        <el-form-item label="密碼" prop="password">
          <el-input v-model="form.password" show-password type="password" placeholder="請輸入密碼" disabled />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="h-38px w-full">登入</el-button>
        </el-form-item>
      </el-form>

      <div class="w-full flex flex-col p-2 bg-gray-200 rounded-sm border border-dashed border-1px border-gray-400 justify-center items-center gap-10px mt-20px">
        <span @click="form.account = 'Test'" class="color-gray-9 hover:color-gray-4 cursor-pointer">測試帳號（全部權限）：Test</span>
        <span @click="form.account = 'Staff'" class="color-gray-9 hover:color-gray-4 cursor-pointer">測試帳號（部分權限）：Staff</span>
      </div>
    </div>

    <div
      class="hidden xxl:flex self-start w-fit h-80vh aspect-ratio-square bg-main_green justify-center items-center rounded-[0px_0px_0px_18px]">
      <div class="">
        <img src="/images/logo/login.png" alt="chatRoom" class="w-full">
      </div>
    </div>
  </section>
</template>

<style>
</style>
