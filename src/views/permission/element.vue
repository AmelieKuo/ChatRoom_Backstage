<script setup>
import CommonTable from '@/components/CommonTable.vue'
import CommonButton from '@/components/CommonButton.vue'
import Dialog from '@/components/Dialog.vue'
import Pagination from '@/components/Pagination.vue'
import { computed, ref, inject, reactive } from 'vue';
import elementList from '@/mocks/permission/element.json';

const $alert = inject('$alert') 

const searchQuery = ref({
  page: 1,
  limit: 10,
})

const dataTotal = computed(() => elementList.length)

const dialog = ref({
  visible: false,
  mode: 'add',
});

const form = reactive({
  id: "",
  name: "",
  domID: '',
  notes: "",
})

const formTemplate = JSON.parse(JSON.stringify(form))

const showDialog = async (type, row, idx) => {
  Object.assign(form, formTemplate)
  dialog.value.visible = true;
  dialog.value.mode = type;

  if(type === 'add')return;
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
    if (result){
      console.log('刪除', row)
      $alert({
        title: `刪除成功`,
        type: 'success',
        timer: 3000,
      })
    }
  })
}
</script>

<template>
  <section>
    <CommonTable :data="elementList">

      <template #header>
        <CommonButton name="新增" class="h-32px!" @click="showDialog('add')" />
      </template>

      <template #table>
        <el-table-column prop="name" label="元件名稱" min-width="200" />
        <el-table-column prop="domID" label="主鍵值" min-width="150" />
      </template>

      <template #toolbar="{ row, index }">
        <CommonButton type="view" name="查看" @click="showDialog('view', row, index)" />
        <CommonButton type="edit" name="編輯" @click="showDialog('edit', row, index)" />
        <CommonButton type="danger" name="刪除" @click="handleDel({ index, row })" />
      </template>

      <template #pagination>
        <Pagination :page="searchQuery.page" :limit="searchQuery.limit" :total="dataTotal" />
      </template>
    </CommonTable>

    <Dialog v-model:visible="dialog.visible" :mode="dialog.mode" @confirm="handleConfirm">
      <el-form :model="form" label-width="auto" label-position="top" :disabled="dialog.mode === 'view'">
        <el-form-item label="元件名稱">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="domID">
          <el-input v-model="form.domID" />
        </el-form-item>
        <el-form-item label="備註">
          <el-input v-model="form.notes" />
        </el-form-item>
      </el-form>
    </Dialog>

  </section>
</template>