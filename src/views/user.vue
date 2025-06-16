<script setup>
import CommonTable from '@/components/CommonTable.vue'
import PermissionButton from '@/components/PermissionButton.vue'
import avatarUpload from '@/components/upload/avatarUpload.vue'
import Dialog from '@/components/Dialog.vue'
import Pagination from '@/components/Pagination.vue'
import { computed, ref, inject, reactive } from 'vue';
import userList from '@/mocks/user.json';
import roleList from '@/mocks/permission/role.json';


const $alert = inject('$alert')

const registerTypeList = [
  { label: '一般註冊', value: 0 },
  { label: '第三方註冊', value: 1 },
]

const searchQuery = ref({
  page: 1,
  limit: 10,
})

const dataTotal = computed(() => userList.length)

const dialog = ref({
  visible: false,
  mode: 'add',
});

const form = reactive({
  id:'',
  name: '',
  pic: '',
  account: '',
  content: '',
  role: [],
  registerType: 0,
  active: true,
})

const formTemplate = JSON.parse(JSON.stringify(form))

const showDialog = async (type, row, idx) => {
  Object.assign(form, formTemplate)
  dialog.value.visible = true;
  dialog.value.mode = type;

  if (type === 'add') return;
  Object.assign(form, row);
}

const handleConfirm = () => {
  console.log('儲存', form)
  $alert({
    title: `儲存成功`,
    type: 'success',
    showCancel: false,
    timer: 3000,
  }).then((result) => {
    console.log(result)
  })
}

const handleDel = async ({ index, row }) => {
  $alert({
    title: `確定要刪除 ${index}-${row.name} 嗎？`,
    type: 'warning',
    showCancel: true,
    showConfirm: true,
  }).then((result) => {
    if (result) {
      console.log('刪除', row)
      $alert({
        title: `刪除成功`,
        type: 'success',
        timer: 3000,
      })
    }
  })
}

const uploadAvatar = (file) => {
  console.log(file);
  form.pic = file.filePath
  console.log(form);
}

/** 按鈕事件 */ 
const btnHandle = (obj) => {
  switch (obj.domID)
    {
      case 'addBtn':
        showDialog('add');
        break;
      case 'editBtn':
        showDialog('edit', obj.row, obj.index)
        break;
      case 'delBtn':
        handleDel({ index:obj.index, row:obj.row })
        break;
      default:
        showDialog('view', obj.row, obj.index);
    }
};


</script>

<template>
  <section>
    <CommonTable :data="userList">

      <template #header>
        <PermissionButton position="header" @btnEvent="btnHandle"/>
      </template>

      <template #table>
        <el-table-column prop="name" label="會員名稱" min-width="160">
          <template #default="{ row }">
            <div class="flex items-center gap-10px">
              <el-avatar :size="42" fit="cover" :src="row.pic ? row.pic : 'images/avatar.svg'" />
              <span>{{ row.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="account" label="帳號" min-width="100" />
         <el-table-column prop="registerType" label="註冊類型" min-width="100">
          <template #default="{ row }">
            {{ registerTypeList.find(item => item.value === row.registerType)?.label }}
          </template>
        </el-table-column>
        <el-table-column prop="active" label="狀態" min-width="100">
          <template #default="{ row }">
            <el-tag :type="row.active ? 'success' : 'danger'">{{ row.active ? '已啟用' : '未啟用' }}</el-tag>
          </template>
        </el-table-column>
      </template>

      <template #toolbar="{ row, index }">
        <PermissionButton position="table" @btnEvent="btnHandle" :row="row" :index="index"/>
      </template>

      <template #pagination>
        <Pagination :page="searchQuery.page" :limit="searchQuery.limit" :total="dataTotal" />
      </template>
    </CommonTable>

    <Dialog v-model:visible="dialog.visible" :mode="dialog.mode" @confirm="handleConfirm">
      <el-form :model="form" label-width="auto" label-position="top" :disabled="dialog.mode === 'view'">
        <el-form-item label="會員照片">
          <avatarUpload :imgSrc="form.pic" :size="80" :disabled="dialog.mode === 'view'" @update:modelValue="uploadAvatar"/>
        </el-form-item>
        <el-form-item label="會員名稱">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="帳號">
          <el-input v-model="form.account" />
        </el-form-item>
        <el-form-item v-if="dialog.mode !== 'add'" label="註冊類型">
          <p>{{ registerTypeList.find(item => item.value === form.registerType)?.label }}</p>
        </el-form-item>
        <el-form-item label="修改日期">
          <el-checkbox-group v-model="form.roles">
            <el-checkbox v-for="role in roleList" :key="role" :label="role.name" :value="role.value"
              :disabled="role.value === 'SYSTEM'" />
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="狀態">
          <el-switch v-model="form.active" />
        </el-form-item>
      </el-form>
    </Dialog>

  </section>
</template>