<script setup>
import CommonButton from '@/components/CommonButton.vue'
import { onMounted, ref } from 'vue';

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
  }
])

</script>



<template>
  <section class="p-10px">
    <div class="mb-30px flex justify-end items-center">
      <CommonButton name="新增" />
    </div>
    <el-table :data="newsList" style="width: 100%" header-row-style="color: #A0AEC0; font-weight: 700; font-size: 18px;"
      row-style="font-size: 14px; color: black;">
      <el-table-column prop="title" label="標題" min-width="200" />
      <el-table-column prop="summary" label="摘要" min-width="150">
        <template #default="{ row }">
          <p class="truncate">{{ row.summary }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="active" label="啟用" width="150">
        <template #default="{ row }">
          <el-tag :type="row.active ? 'success' : 'danger'">{{ row.active ? '已啟用' : '未啟用' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="230">
        <template #default>
          <div class="flex justify-between">
            <CommonButton type="view" name="查看" />
            <CommonButton type="edit" name="編輯" />
            <CommonButton type="danger" name="刪除" />
          </div>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]"
      :size="size" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </section>
</template>