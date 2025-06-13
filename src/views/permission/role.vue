<script setup>
import CommonTable from '@/components/CommonTable.vue';
import CommonButton from '@/components/CommonButton.vue';
import Dialog from '@/components/Dialog.vue';
import Pagination from '@/components/Pagination.vue';
import { computed, ref, inject, reactive, nextTick } from 'vue';
import roleList from '@/mocks/permission/role.json';
import elementList from '@/mocks/permission/element.json';
import pageList from '@/mocks/permission/page.json';

const $alert = inject('$alert');

const searchQuery = ref({ page: 1, limit: 10 });
const dataTotal = computed(() => roleList.length);

const dialog = ref({ visible: false, mode: 'add' });
const pageTreeRef = ref();
const elementTreeRef = ref();

const form = reactive({
  id: '',
  name: '',
  domId: '',
  notes: ''
});

const formTemplate = JSON.parse(JSON.stringify(form));

const showDialog = async (type, row, idx) => {
  Object.assign(form, formTemplate);
  dialog.value.visible = true;
  dialog.value.mode = type;

  if (type === 'add') return;
  Object.assign(form, row);
  // 綁定頁面勾選
  const pageIds = (row.pages || []).map(p => p.id);
  await nextTick(() => {
    pageTreeRef.value.setCheckedKeys(pageIds);
  });

  // 綁定元件勾選
  const elementIds = (row.pages || [])
    .flatMap(p => (p.elements || []).map(el => `${p.id}-${el.domID}-${el.position}`));

  await nextTick(() => {
    elementTreeRef.value.setCheckedKeys(elementIds);
  });
};

const getSelectedPermissions = () => {
  return {
    pages: pageTreeRef.value.getCheckedKeys(),
    elements: elementTreeRef.value?.getCheckedKeys() || []
  };
};

const handleConfirm = () => {
  const selected = getSelectedPermissions();
  console.log('儲存角色：', { form: form, pages: selected.pages, elements: selected.elements });

  $alert({
    title: `儲存成功`,
    type: 'success',
    showCancel: false,
    timer: 3000
  });
};

const handleDel = async ({ index, row }) => {
  $alert({
    title: `確定要刪除 ${index}-${row.value} ${row.name} 嗎？`,
    type: 'warning',
    showCancel: true,
    showConfirm: true
  }).then((result) => {
    if (result) {
      console.log('刪除', row);
      $alert({ title: `刪除成功`, type: 'success', timer: 3000 });
    }
  });
};

const currentElement = ref([]);

const currentPageList = computed(() => {
  const tempList = JSON.parse(JSON.stringify(pageList));
  return tempList.filter((item) => item.url !== '/home');
});

const defaultProps = {
  children: 'children',
  label: 'name',
  disabled: () => dialog.value.mode === 'view'
};

function clickNode(data) {
  const checkedKeys = pageTreeRef.value.getCheckedKeys();

  const findPage = (id, list) => {
    for (const node of list) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findPage(id, node.children);
        if (found) return found;
      }
    }
    return null;
  };

  if (checkedKeys.includes(data.id)) {
    const node = findPage(data.id, currentPageList.value);
    currentElement.value = (node?.elements || []).map((el) => {
      const origin = elementList.find(e => e.domID === el.domID);
      return {
        id: `${data.id}-${el.domID}-${el.position}`,
        name: origin?.name || el.domID,
        domID: el.domID,
        position: el.position
      };
    });
  } else {
    currentElement.value = [];
  }
}
</script>

<template>
  <section>
    <CommonTable :data="roleList">
      <template #header>
        <CommonButton name="新增" class="h-32px!" @click="showDialog('add')" />
      </template>

      <template #table>
        <el-table-column prop="name" label="角色名稱" min-width="200" />
        <el-table-column prop="value" label="主鍵值" min-width="150" />
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
          <el-input v-model="form.value" />
        </el-form-item>
        <el-form-item label="備註">
          <el-input v-model="form.notes" />
        </el-form-item>
        <el-form-item label="擁有權限">
          <div :class="dialog.mode === 'view' ? 'bg-#f0f2f5' : 'bg-white'" class="w-full flex justify-between items-start gap-5px border-1px border-solid border-#E4E7ED rounded-5px p-10px">
            <div class="flex-1 border-r-1px border-r-solid border-r-#E4E7ED pr-10px">
              <p class="border-b-1px border-b-solid border-b-#E4E7ED color-black">瀏覽頁面權限</p>
              <el-tree
                style="width: 100%;"
                :data="currentPageList"
                :disabled="dialog.mode === 'view'"
                show-checkbox
                node-key="id"
                :props="defaultProps"
                default-expand-all
                :highlight-current="dialog.mode !== 'view'"
                :check-on-click-node="true"
                :expand-on-click-node="false"
                :accordion="false"
                ref="pageTreeRef"
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
                :check-on-click-node="true"
                :expand-on-click-node="false"
                ref="elementTreeRef"
              />
            </div>
          </div>
        </el-form-item>
      </el-form>
    </Dialog>
  </section>
</template>

<style scoped>
:deep(.el-tree) {
  background: transparent;
  --el-tree-node-hover-bg-color: transparent;
}

:deep(.el-tree.is-disabled) {
  --el-tree-node-hover-bg-color: transparent;
}

:deep(.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content) {
  background-color: #f1fefe;
}

:deep(.el-tree-node[aria-disabled="false"] .el-tree-node__content:hover) {
  background-color: #f5f7fa !important;
  cursor: pointer;
}

:deep(.el-tree-node[aria-disabled="true"] .el-tree-node__content:hover) {
  background-color: transparent !important;
  cursor: not-allowed;
}
</style>
