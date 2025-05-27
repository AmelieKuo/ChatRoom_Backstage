<script setup>
import CommonButton from '@/components/CommonButton.vue'
import TreeTable from '@/components/TreeTable.vue'
import Pagination from '@/components/Pagination.vue'
import { CloseBold } from '@element-plus/icons-vue'
import { computed, ref, inject, reactive } from 'vue';

const $alert = inject('$alert') 

const pageList = ref([
  {
    id: "1",
    name: "權限管理",
    url: "",
    sort: 0,
    children: [
      {
        id: "1-1",
        name: "頁面管理",
        url: "/permission/page",
        sort: 0,
        elements: [
          {
            elementID: "1111111",
            name: '新增',
            domID: 'addBtn',
            position: "header"
          },
          {
            elementID: "2222222",
            name: '編輯',
            domID: 'editBtn',
            position: "table"
          },
          {
            elementID: "2222222",
            name: '刪除',
            domID: 'delBtn',
            position: "table"
          },
        ],
      },
      {
        id: "1-2",
        name: "元件管理",
        url: "/permission/element",
        sort: 1,
      },
      {
        id: "1-3",
        name: "角色管理",
        url: "/permission/role",
        sort: 2,
      },
    ],
  },
  {
    id: "2",
    name: "會員管理",
    url: "/user",
    sort: 1,
    children: [],
  },
  {
    id: "3",
    name: "最新消息管理",
    url: "/news",
    sort: 2,
    children: [],
  },
]);

const searchQuery = ref({
  page: 1,
  limit: 10,
})

const dataTotal = computed(() => pageList.value.length)

const dialog = ref({
  visible: false,
  mode: 'add',
});

const form = reactive({
  id: "",
  name: "",
  url: '',
  parentID: "",
  sort: "",
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
};



const pageSelectList = computed(() => {
  return pageList.value.map((item) => ({
    ...item,
    value: item.id,
    label: item.name,
    disabled: item.id === form.id,
    children: item.children?.map((child) => ({
      ...child,
      value: child.id,
      label: child.name,
      disabled: child.id === form.id,
    })),
  }));
});

const elementsList = ref([
  { value: 'add', label: '新增' },
  { value: 'edit', label: '編輯' },
  { value: 'delete', label: '刪除' },
]);

const positionList = ref([
  { value: 'header', label: 'header' },
  { value: 'table', label: 'table' },
]);

</script>

<template>
  <section>
    <TreeTable :data="pageList">
      <template #header>
        <CommonButton name="新增" class="h-32px!" @click="showDialog('add')" />
      </template>

      <template #table>
        <el-table-column prop="name" label="頁面名稱" />
        <el-table-column prop="url" label="路徑" />
      </template>

      <template #toolbar="{ row, index }">
        <CommonButton type="view" name="查看" @click="showDialog('view', row, index)" />
        <CommonButton type="edit" name="編輯" @click="showDialog('edit', row, index)" />
        <CommonButton type="danger" name="刪除" @click="handleDel({ index, row })" />
      </template>

      <template #pagination>
        <Pagination :page="searchQuery.page" :limit="searchQuery.limit" :total="dataTotal" />
      </template>
    </TreeTable>

    <el-dialog :modelValue="dialog.visible" :show-close="false" width="500" class="rounded-5px p-20px">
      <template #header>
        <div class="w-full flex justify-between items-center color-text_dark">
          <h4 class="text-20px font-bold">{{ dialog.title ? dialog.title : dialog.mode === 'view' ? '查看' : dialog.mode === 'edit' ? '編輯' : '新增' }}</h4>
          <CloseBold @click="dialog.visible = false" class="w-20px color-text_light hover:opacity-80" />
        </div>
      </template>

      <el-form :model="form" label-width="auto" label-position="top" :disabled="dialog.mode === 'view'">
        <el-form-item label="頁面名稱">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="路徑">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="父層選單">
          <el-tree-select
            v-model="form.parentID"
            :data="pageSelectList"
            :render-after-expand="false"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model="form.sort" />
        </el-form-item>
      </el-form>

      <div class="flex justify-end">
        <CommonButton @click="dialog.visible = false" type="edit" :name="dialog.mode === 'view' ? '關閉' : '取消'"
          class="w-67px h-36px" />
        <CommonButton v-if="dialog.mode !== 'view'" @click="handleConfirm" type="danger" name="儲存"
          class="w-67px h-36px" />
      </div>

      <template #footer>
        <div class="bg-#F8F9FA w-full p-12px flex flex-col gap-8px">
          <p class="text-left">綁定元件</p>
          <div v-if="dialog.mode !== 'view'" class="flex items-center gap-5px">
            <el-select
              v-model="value"
              placeholder="請選擇元件"
              size="small"
              style="width: 150px"
            >
              <el-option
                v-for="item in elementsList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
  
            <el-select
              v-model="value"
              placeholder="請選擇位置"
              size="small"
              style="width: 150px"
            >
              <el-option
                v-for="item in positionList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
  
            <CommonButton v-if="dialog.mode !== 'view'" name="新增" class="h-32px!" @click="showDialog('add')" />
          </div>
          <el-table :data="form.elements" style="width: 100%"
          :header-cell-style="{ backgroundColor: '#F8F9FA'}"
          :cell-style="{ backgroundColor: '#F8F9FA' }"
          class="mt-10px">
            <el-table-column prop="name" label="元件名稱" />
            <el-table-column prop="domID" label="主鍵值" />
            <el-table-column prop="position" label="位置" />
            <el-table-column v-if="dialog.mode !== 'view'" fixed="right" label="操作" width="100">
              <template #default="{ row, $index }">
                <CommonButton type="danger" name="刪除" @click="handleDel({ $index, row })" />
              </template>
            </el-table-column>

            <template #empty>
              <div class="bg-#F8F9FA w-full h-full">
                無綁定元件
              </div>
            </template>
          </el-table>
        </div>
      </template>
    </el-dialog>

  </section>
</template>


<style scoped>
:deep(.el-table__empty-text){
  width: 100%;
}

</style>