<script setup>
import CommonTable from '@/components/CommonTable.vue'
import CommonButton from '@/components/CommonButton.vue'
import Dialog from '@/components/Dialog.vue'
import Editor from '@/components/Editor.vue'
import Pagination from '@/components/Pagination.vue'
import { computed, ref, inject, reactive } from 'vue';
import newsList from '@/mocks/news.json';


const $alert = inject('$alert') 

const searchQuery = ref({
  page: 1,
  limit: 10,
})

const dataTotal = computed(() => newsList.length)

const dialog = ref({
  visible: false,
  mode: 'add',
});

const form = reactive({
  title: '',
  summary: '',
  content: '',
  active: true,
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
    title: `確定要刪除 ${index}-${row.title} 嗎？`,
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
    <CommonTable :data="newsList">

      <template #header>
        <CommonButton name="新增" class="h-32px!" @click="showDialog('add')" />
      </template>

      <template #table>
        <el-table-column prop="title" label="標題" min-width="200" />
        <el-table-column prop="summary" label="摘要" min-width="150">
          <template #default="{ row }">
            <p class="truncate">{{ row.summary }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="active" label="狀態" width="150">
          <template #default="{ row }">
            <el-tag :type="row.active ? 'success' : 'danger'">{{ row.active ? '已公開' : '未公開' }}</el-tag>
          </template>
        </el-table-column>
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
        <el-form-item label="標題">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="摘要">
          <el-input v-model="form.summary" />
        </el-form-item>
        <el-form-item label="內文">
          <Editor v-model="form.content" :disabled="dialog.mode === 'view'" />
        </el-form-item>
        <el-form-item v-if="dialog.mode !== 'add' && form.active" label="發布日期">
          <p>{{ form.publicDate }}</p>
        </el-form-item>
        <el-form-item v-if="dialog.mode !== 'add'" label="修改日期">
          <p>{{ form.modifiedDate }}</p>
        </el-form-item>
        <el-form-item label="狀態">
          <el-switch v-model="form.active" />
        </el-form-item>
      </el-form>
    </Dialog>

  </section>
</template>