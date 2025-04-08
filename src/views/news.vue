<script setup>
import CommonTable from '@/components/CommonTable.vue'
import CommonButton from '@/components/CommonButton.vue'
import Dialog from '@/components/Dialog.vue'
import Editor from '@/components/Editor.vue'
import Pagination from '@/components/Pagination.vue'
import { computed, ref, inject, reactive } from 'vue';

const $alert = inject('$alert') 

const userPermission = [{
  id: "500071549886469",
  userId: "240282957271109",
  roleId: "SYS_ROLE_SYSTEM",
  name: "系統管理員",
  active: true,
  roleModule: [{
    id: "505019958599685",
    roleId: "SYS_ROLE_SYSTEM",
    moduleId: "389032908460037",
    name: "news",
    url: "/news",
    primaryKey: "news",
    description: "最新消息",
    active: true,
    roleModuleElement: [
      {
        elementID: "1111111",
        domID: 'addBtn',
        position: "header"
      },
      {
        elementID: "2222222",
        domID: 'editBtn',
        position: "table"
      },
      {
        elementID: "2222222",
        domID: 'delBtn',
        position: "table"
      },
    ]
  }]
}]

const newsList = ref([
  {
    id:'11111',
    title: '消息一',
    summary: 'XXXXXXXXXXX',
    content: 'aaaabbbccc',
    createDate: '2024-01-15',
    modDate: '2024-02-03',
    pubDate: '2024-02-03',
    active: true,
  },
  {
    id: '11111',
    title: '消息一',
    summary: 'XXXXXXXXXXX',
    content: 'aaaabbbccc',
    createDate: '2024-01-15',
    modDate: '2024-02-03',
    pubDate: '2024-02-03',
    active: true,
  },
  {
    id: '11111',
    title: '消息一',
    summary: 'XXXXXXXXXXX',
    content: 'aaaabbbccc',
    createDate: '2024-01-15',
    modDate: '2024-02-03',
    pubDate: '2024-02-03',
    active: true,
  },
  {
    id: '11111',
    title: '消息一',
    summary: 'XXXXXXXXXXX',
    content: 'aaaabbbccc',
    createDate: '2024-01-15',
    modDate: '2024-02-03',
    pubDate: '2024-02-03',
    active: true,
  },
  {
    id: '11111',
    title: '消息一',
    summary: 'XXXXXXXXXXX',
    content: 'aaaabbbccc',
    createDate: '2024-01-15',
    modDate: '2024-02-03',
    pubDate: '2024-02-03',
    active: true,
  },
  {
    id: '11111',
    title: '消息一',
    summary: 'XXXXXXXXXXX',
    content: 'aaaabbbccc',
    createDate: '2024-01-15',
    modDate: '2024-02-03',
    pubDate: '2024-02-03',
    active: true,
  },
  {
    id: '11111',
    title: '消息一',
    summary: 'XXXXXXXXXXX',
    content: 'aaaabbbccc',
    createDate: '2024-01-15',
    modDate: '2024-02-03',
    pubDate: '2024-02-03',
    active: true,
  },
  {
    id: '11111',
    title: '消息一',
    summary: 'XXXXXXXXXXX',
    content: 'aaaabbbccc',
    createDate: '2024-01-15',
    modDate: '2024-02-03',
    pubDate: '2024-02-03',
    active: true,
  },
  {
    id: '11111',
    title: '消息九',
    summary: 'XXXXXXXXXXX',
    content: 'aaaabbbccc',
    createDate: '2024-01-15',
    modDate: '2024-02-03',
    pubDate: '2024-02-03',
    active: true,
  },
  {
    id: '11111',
    title: '消息十',
    summary: 'XXXXXXXXXXX',
    content: 'aaaabbbccc',
    createDate: '2024-01-15',
    modDate: '2024-02-03',
    pubDate: '2024-02-03',
    active: true,
  },
])

const searchQuery = ref({
  page: 1,
  limit: 10,
})

const dataTotal = computed(() => newsList.value.length)

const dialog = ref({
  visible: false,
  mode: 'add',
})

const handleDel = async ({ index, row }) => {
  $alert({
    title: `確定要刪除 ${index}-${row.title} 嗎？`,
    type: 'warning',
    showCancel: true,
    timer: 3000,
  }).then((result) => {
      console.log(result)
  })
}

const showDialog = async (type) => {
  dialog.value.visible = true;
  dialog.value.mode = type;
}

const closeDialog = () => {
  console.log('1111')
}

const form = reactive({
  title: '',
  content: 'ffff',
  active: '',
})

// publicDate: '',
//   modifiedDate: '',

</script>

<template>
  <section>
    <CommonTable :data="newsList">
      <template #header>
        <CommonButton name="新增" class="h-32px!" @click="showDialog('add')" />
      </template>
      <template #toolbar="{ row, index }">
        <CommonButton type="view" name="查看" />
        <CommonButton type="edit" name="編輯" />
        <CommonButton type="danger" name="刪除" @click="handleDel({index, row})" />
      </template>
      <template #pagination>
        <Pagination :page="searchQuery.page" :limit="searchQuery.limit" :total="dataTotal" />
      </template>
    </CommonTable>

    <Dialog :visible="dialog.visible" :mode="dialog.mode" @close="closeDialog">
      <el-form :model="form" label-width="auto" label-position="top">
        <el-form-item label="標題">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="內容">
          <Editor v-model="form.content" />
        </el-form-item>
      </el-form>
    </Dialog>

  </section>
</template>