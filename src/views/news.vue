<script setup>
import CommonTable from '@/components/CommonTable.vue'
import CommonButton from '@/components/CommonButton.vue'
import Dialog from '@/components/Dialog.vue'
import Alert from '@/components/Alert.vue'
import Pagination from '@/components/Pagination.vue'
import { computed, ref, inject } from 'vue';

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

const openDialog = async(type) => {
  dialog.value.visible = true;
  dialog.value.mode = type;

  const result = await $alert({
    title: '刪除確認',
    content: '確定要刪除這個項目嗎？',
    type: 'warning',
    showCancel: true
  })
  console.log('使用者選擇:', result ? '確定' : '取消')
}

const closeDialog = () => {
  console.log('1111')
}

</script>

<template>
  <section>
    <CommonTable :data="newsList">
      <template #header>
        <CommonButton name="新增" @click="openDialog('add')" class="h-32px!" />
      </template>
      <template #toolbar>
        <CommonButton type="view" name="查看" />
        <CommonButton type="edit" name="編輯" />
        <CommonButton type="danger" name="刪除" />
      </template>
      <template #pagination>
        <Pagination :page="searchQuery.page" :limit="searchQuery.limit" :total="dataTotal" />
      </template>
    </CommonTable>

  </section>
</template>