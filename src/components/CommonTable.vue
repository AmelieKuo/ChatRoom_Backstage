<script setup>
import { toRefs } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

// const { type, name } = toRefs(props)

</script>


<template>
  <section class="p-10px flex flex-col h-full justify-between">
    <div class="h-[calc(100%-38px)]">
      <div class="mb-15px flex justify-end items-center">
        <slot name="header"></slot>
      </div>
      <el-table :data="data" style="width: 100%" height="90%"
        :header-row-style="{ color: '#A0AEC0', fontWeight: '700', fontSize: '18px'}"
        :row-style="{ fontSize: '14px', color: 'black' }">
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
              <slot name="toolbar"></slot>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <slot name="pagination"></slot>
  </section>
</template>

<style scoped>
:deep(.el-table--fit .el-table__inner-wrapper:before) {
  width: 0;
}
</style>