<script setup>
import { onMounted, ref, inject } from 'vue';
import roleList from '@/mocks/permission/role.json';
import CommonButton from '@/components/CommonButton.vue';
import Dialog from '@/components/Dialog.vue';
import { userAuthStore } from '@/stores';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

const $alert = inject('$alert');
const router = useRouter();

const userStore = userAuthStore();
const { removeToken } = userStore;
const { USER_PROFILE } = storeToRefs(userStore);

const isView = ref(true);

const user = ref({
  name: "",
  account: "",
  role: [],
})

const handleCancel = () =>{
  user.value.name = USER_PROFILE.value.name;
  user.value.account = USER_PROFILE.value.account;
  user.value.account = USER_PROFILE.value.account;
  isView.value = true;
}

const handleSubmit = () => {
  console.log('儲存成功', user.value)
  isView.value = true;
  $alert({
    title: `儲存成功`,
    type: 'success',
    showCancel: false,
    timer: 3000,
  })
}

const dialog = ref({
  visible: false,
  mode: 'add',
  title: '修改密碼'
});

const passwordForm = ref({
  id: '',
  oldPassword: '',
  newPassword: '',
  checkPassword: '',
});

const signOut = () => {
  removeToken();
  $alert({
    title: `登出成功`,
    type: 'success',
    showCancel: false,
    timer: 3000,
  }).then(() => {
    router.push('/login');
  })
};

const handleSubmitPassword = () => {
  passwordForm.value.id = user.value.id;
  console.log('變更密碼',passwordForm.value)
  dialog.value.visible = false;
  $alert({
    title: `變更密碼成功，請登出後使用新密碼登入`,
    type: 'success',
    showCancel: false,
    timer: 3000,
  }).then(() => {
    signOut();
  })
};

const handleClose = () => {
  passwordForm.value.is = '';
  passwordForm.value.oldPassword = '';
  passwordForm.value.newPassword = '';
  passwordForm.value.checkPassword = '';
  dialog.value.visible = false;
}

onMounted(() => {
})

</script>

<template>
  <section class="p-10px flex justify-between items-start">
    <!-- 個人資料 -->
    <div class="w-300px">
      <el-form :model="user" label-width="auto" label-position="top">
        <el-form-item label="登入姓名">
          <span v-if="isView">{{ USER_PROFILE.name }}</span>
          <el-input v-else v-model="user.name" />
        </el-form-item>
        <el-form-item label="登入帳戶">
          <span>{{ USER_PROFILE.account }}</span>
        </el-form-item>
        <el-form-item label="登入權限">
          <ul v-if="isView" class="w-full flex gap-5px">
            <li v-for="(role, idx) in USER_PROFILE.roles" :key="idx">
              {{ roleList.find(item => item.value === role)?.name }}
              <span v-if="idx !== user.role.length - 1">,</span>
            </li>
          </ul>
          <el-select v-else v-model="user.role" multiple class="w-full">
            <el-option v-for="role in roleList" :key="role" :label="role.name" :value="role.value"
              :disabled="role.value === 'SYSTEM'" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- 按鈕 -->
    <div class="flex flex-col justify-start gap-15px items-end">
      <div class="flex justify-end">
        <CommonButton v-if="isView" @click="isView = !isView" type="edit" name="修改個人資料" class="h-36px" />
        <CommonButton v-else @click="handleSubmit" type="success" name="儲存" class="h-36px" />
        <CommonButton v-if="!isView" @click="handleCancel" type="info" name="取消" class="h-36px" />
        <CommonButton v-if="isView" @click="dialog.visible = true" type="danger" name="修改密碼" class="h-36px" />
      </div>
    
      <CommonButton @click="signOut" type="primary" name="登出" class="h-36px max-w-88px" />
    </div>

    <Dialog v-model:visible="dialog.visible" :mode="dialog.mode" @confirm="handleSubmitPassword" :title="dialog.title"
      @update:visible="handleClose">
      <el-form :model="passwordForm" label-width="auto" label-position="top">
        <el-form-item label="舊密碼">
          <el-input v-model="passwordForm.oldPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="新密碼">
          <el-input v-model="passwordForm.newPassword" type="password" show-password />
        </el-form-item>
        <el-form-item label="確認密碼">
          <el-input v-model="passwordForm.checkPassword" type="password" show-password />
        </el-form-item>
      </el-form>
    </Dialog>

  </section>
</template>


<style scoped>
.el-form-item--label-top .el-form-item__label{
  margin-bottom: 0px;
}

</style>