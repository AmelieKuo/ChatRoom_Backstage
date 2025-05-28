<script setup>
import CommonTable from '@/components/CommonTable.vue'
import CommonButton from '@/components/CommonButton.vue'
import Dialog from '@/components/Dialog.vue'
import Editor from '@/components/Editor.vue'
import Pagination from '@/components/Pagination.vue'
import { computed, ref, inject, reactive, watch } from 'vue';

const $alert = inject('$alert');

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
        children:[],
        elements: [
          {
            elementID: "1111111",
            name: '新增',
            domID: 'addBtn',
            position: "header"
          },
        ],
      },
      {
        id: "1-3",
        name: "角色管理",
        url: "/permission/role",
        sort: 2,
        children:[],
        elements: [],
      },
    ],
  },
  {
    id: "2",
    name: "會員管理",
    url: "/user",
    sort: 1,
    children:[],
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
    id: "3",
    name: "最新消息管理",
    url: "/news",
    sort: 2,
    children:[],
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
]);

const elementList = ref([
  {
    id: "1111111",
    name: "新增",
    domId: "addBtn",
    notes: "新增元件按鈕",
  },
  {
    id: "2222222",
    name: "編輯",
    domId: "editBtn",
    notes: "",
  },
  {
    id: "2222222",
    name: "刪除",
    domId: "delBtn",
    notes: "",
  }
]);


const searchQuery = ref({
  page: 1,
  limit: 10,
})

const dataTotal = computed(() => elementList.value.length)

const dialog = ref({
  visible: false,
  mode: 'add',
});

const form = reactive({
  id: "",
  name: "",
  domId: '',
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
    title: `確定要刪除 ${index}-${row.domId} ${row.name} 嗎？`,
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

const currentElementList = computed(() => {
  console.log(currentElement.value);
  return elementList.value.filter(item => item.name.includes(searchQuery.value.name || ''));
});

const currentElement = ref(null);

const defaultProps = {
  children: 'children',
  label: 'name',
  disabled: () => {
    return dialog.value.mode === 'view';
  }
}

const treeRef = ref();
const tree2Ref = ref(); 

function clickNode(data) {
  const checkedKeys = treeRef.value.getCheckedKeys()
  if(checkedKeys.includes(data.id)) {
    currentElement.value = data.elements || [];
  } else {
    currentElement.value = [];
  }
}

</script>

<template>
  <section>
    <CommonTable :data="elementList">

      <template #header>
        <CommonButton name="新增" class="h-32px!" @click="showDialog('add')" />
      </template>

      <template #table>
        <el-table-column prop="name" label="角色名稱" min-width="200" />
        <el-table-column prop="domId" label="主鍵值" min-width="150" />
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
        <el-form-item label="角色名稱">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="主鍵值">
          <el-input v-model="form.domId" />
        </el-form-item>
        <el-form-item label="備註">
          <el-input v-model="form.notes" />
        </el-form-item>
        <el-form-item label="擁有權限">
          <div :class="dialog.mode === 'view' ? 'bg-#f0f2f5' : 'bg-white'" class="w-full flex justify-between items-start gap-5px border-1px border-solid border-#E4E7ED rounded-5px p-10px">
            <div class="flex-1 border-r-1px border-r-solid border-r-#E4E7ED pr-10px">
              <p class="border-b-1px border-b-solid border-b-#E4E7ED color-black">瀏覽頁面權限{{ dialog.mode }}</p>
              <el-tree
                style="width: 100%;"
                :data="pageList"
                :disabled="dialog.mode === 'view'"
                show-checkbox
                node-key="id"
                :props="defaultProps"
                default-expand-all
                :highlight-current="dialog.mode !== 'view'"
                :check-on-click-node="true"
                :expand-on-click-node="false"
                :accordion="false"
                ref="treeRef"
                @node-click="clickNode"
              />
            </div>
            <div class="w-[calc(50%-10px)]">
              <p class="border-b-1px border-b-solid border-b-#E4E7ED color-black">操作權限</p>
              <el-tree
                style="width: 100%;"
                :data="currentElement"
                :disabled="dialog.mode === 'view'"
                show-checkbox
                node-key="id"
                :props="defaultProps"
                default-expand-all
                :highlight-current="dialog.mode !== 'view'"
                :check-on-click-node="true"
                :expand-on-click-node="false"
                :accordion="false"
              />
            </div>
            <div>
  
            </div>
          </div>
        </el-form-item>
      </el-form>
    </Dialog>

  </section>
</template>


<style scoped>
:deep(.el-tree){
  background: transparent;
  --el-tree-node-hover-bg-color: transparent;
}

:deep(.el-tree.is-disabled){
  --el-tree-node-hover-bg-color: transparent;
}

:deep(.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content){
  background-color: #f1fefe;
}

:deep(.el-tree-node[aria-disabled="false"] .el-tree-node__content:hover) {
  background-color: #f5f7fa !important;
  cursor: pointer;
};

:deep(.el-tree-node[aria-disabled="true"] .el-tree-node__content:hover) {
  background-color: transparent !important;
  cursor: not-allowed;
};

</style>