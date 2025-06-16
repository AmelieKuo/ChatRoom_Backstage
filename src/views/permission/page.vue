<script setup>
import PermissionButton from '@/components/PermissionButton.vue';
import CommonButton from '@/components/CommonButton.vue';
import TreeTable from '@/components/TreeTable.vue'
import Pagination from '@/components/Pagination.vue'
import { CloseBold } from '@element-plus/icons-vue'
import { computed, ref, inject, reactive } from 'vue';
import pageList from '@/mocks/permission/page.json';
import elementList from '@/mocks/permission/element.json';

const $alert = inject('$alert') 

const searchQuery = ref({
  page: 1,
  limit: 10,
})

const dataTotal = computed(() => currentPageList.value.length)

const dialog = ref({
  visible: false,
  mode: 'add',
});

const form = reactive({
  id: "",
  name: "",
  url: '',
  parentModuleId: "",
  sort: "",
  elements: [
    {
      id: 1111111,
      name: '新增',
      domID: 'addBtn',
      position: 'header',
    },
    {
      id: 2222222,
      name: '編輯',
      domID: 'editBtn',
      position: 'table',
    },
    {
      id: 3333333,
      name: '刪除',
      domID: 'delBtn',
      position: 'table',
    },
  ],
})

const formTemplate = JSON.parse(JSON.stringify(form))

// 遞迴尋找父層ID
const findParentModuleId = (id, list) => {
  for (const item of list) {
    if (item.children?.some(child => child.id === id)) {
      return item.id;
    } else if (item.children) {
      const found = findParentModuleId(id, item.children);
      if (found) return found;
    }
  }
  return '';
};

const showDialog = async (type, row, idx) => {
  Object.assign(form, formTemplate)
  dialog.value.visible = true;
  dialog.value.mode = type;

  if (type === 'add') return;

  Object.assign(form, row);
  form.parentModuleId = findParentModuleId(row.id, currentPageList.value);
}

const handleConfirm = () => {
  $alert({
    title: `儲存成功`,
    type: 'success',
    showCancel: false,
    timer: 3000,
  }).then(() => {
    dialog.value.visible = false
  })
  console.log('新增', form)
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
  return currentPageList.value.map((item) => ({
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

const elementOptions = computed(() => {
  return elementList.map(item => ({
    label: item.name,
    value: item.domID,
    id: item.id,
    name: item.name,
    notes: item.notes,
    domID: item.domID,
  }));
});

const positionList = ref([
  { value: 'header', label: 'header' },
  { value: 'table', label: 'table' },
]);

const addElement = ref({
  domID: '',
  position: '',
});

const handleAddElement = () => {
  if (!addElement.value.domID && !addElement.value.position) return;
  if( form.elements.some(item => item.domID === addElement.value.domID && item.position === addElement.value.position)) {
    $alert({
      title: `已存在相同元件`,
      type: 'warning',
      showCancel: false,
      timer: 3000,
    });
    return;
  }
  const newElement = {
    id: Date.now(),
    name: elementList.find(item => item.domID === addElement.value.domID)?.name || '未知元件',
    domID: addElement.value.domID,
    position: addElement.value.position,
  };
  form.elements.push(newElement);
};

const handleDelElement = ({ $index, row }) => {
    form.elements.splice($index, 1);
};

const currentPageList = computed(() => {
  const tempList = JSON.parse(JSON.stringify(pageList));

  // 修改首頁路徑
  tempList.forEach(item => {
    if (item.url === '/home') {
      item.url = '/';
    }
  });

  return tempList;
});

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
    <TreeTable :data="currentPageList">
      <template #header>
        <PermissionButton position="header" @btnEvent="btnHandle"/>
      </template>

      <template #table>
        <el-table-column prop="name" label="頁面名稱" />
        <el-table-column prop="url" label="路徑" />
      </template>

      <template #toolbar="{ row, index }">
        <PermissionButton position="table" @btnEvent="btnHandle" :row="row" :index="index"/>
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

      <el-form :model="form" label-width="auto" label-position="top" :disabled="dialog.mode === 'view'" @close="dialog.visible = false">
        <el-form-item label="頁面名稱">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="路徑">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item label="父層選單">
          <el-tree-select
            v-model="form.parentModuleId"
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
              v-model="addElement.domID"
              placeholder="請選擇元件"
              size="small"
              style="width: 150px"
            >
              <el-option
                v-for="item in elementOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
  
            <el-select
              v-model="addElement.position"
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
  
            <CommonButton v-if="dialog.mode !== 'view'" name="新增" class="h-32px!" @click="handleAddElement" />
          </div>

          <!-- 元件列表 -->
          <el-table :data="form.elements" style="width: 100%"
          :header-cell-style="{ backgroundColor: '#F8F9FA'}"
          :cell-style="{ backgroundColor: '#F8F9FA' }"
          class="mt-10px">
            <el-table-column prop="name" label="元件名稱">
              <template #default="{ row, $index }">
                {{ elementList.find(item => item.domID === row.domID)?.name || '未知元件' }}
              </template>
            </el-table-column>
            <el-table-column prop="domID" label="主鍵值" />
            <el-table-column prop="position" label="位置" />
            <el-table-column v-if="dialog.mode !== 'view'" fixed="right" label="操作" width="100">
              <template #default="{ row, $index }">
                <CommonButton type="danger" name="刪除" @click="handleDelElement({ $index, row })" />
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