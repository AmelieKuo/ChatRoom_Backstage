<script setup>
import { onMounted, ref, inject } from 'vue';
import CommonButton from '@/components/CommonButton.vue';
import Dialog from '@/components/Dialog.vue';
const $alert = inject('$alert') 

const isView = ref(true);

const roleList = [
  { label: '系統管理員', value: 'SYSTEM' },
  { label: '一般管理員', value: 'ADMIN' },
  { label: '使用者', value: 'USER' },
]

const userStore = {
  name: 'John Doe',
  account: 'johndoe',
  role: ['ADMIN', 'USER', 'SYSTEM'],
}

const user = ref({})

const handleCancel = () =>{
  user.value = userStore;
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
})

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
    // 登出
  })
}

const handleClose = () => {
  passwordForm.value.is = '';
  passwordForm.value.oldPassword = '';
  passwordForm.value.newPassword = '';
  passwordForm.value.checkPassword = '';
  dialog.value.visible = false;
}

onMounted(() => {
  user.value = JSON.parse(JSON.stringify(userStore));
})

</script>

<template>
  <section class="p-10px flex justify-between items-start">
    <!-- 個人資料 -->
    <div class="w-300px">
      <el-form :model="user" label-width="auto" label-position="top">
        <el-form-item label="登入姓名">
          <span v-if="isView">{{ user.name }}</span>
          <el-input v-else v-model="user.name" />
        </el-form-item>
        <el-form-item label="登入帳戶">
          <span>{{ user.account }}</span>
        </el-form-item>
        <el-form-item label="登入權限">
          <ul v-if="isView" class="w-full flex gap-5px">
            <li v-for="(role, idx) in user.role" :key="idx">
              {{ roleList.find(item => item.value === role)?.label }}
              <span v-if="idx !== user.role.length - 1">,</span>
            </li>
          </ul>
          <el-select v-else v-model="user.role" multiple class="w-full">
            <el-option v-for="role in roleList" :key="role" :label="role.label" :value="role.value"
              :disabled="role.value === 'SYSTEM'" />
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <!-- 按鈕 -->
    <div class="flex justify-end">
      <CommonButton v-if="isView" @click="isView = !isView" type="edit" name="修改個人資料" class="h-36px" />
      <CommonButton v-else @click="handleSubmit" type="success" name="儲存" class="h-36px" />
      <CommonButton v-if="!isView" @click="handleCancel" type="info" name="取消" class="h-36px" />
      <CommonButton v-if="isView" @click="dialog.visible = true" type="danger" name="修改密碼" class="h-36px" />
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