<script setup>
import { toRefs, defineProps } from 'vue';

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});

// const { type, name } = toRefs(props)

const logNode = (node, data) => {
  console.log('Node:', node);
  console.log('Data:', data);
};

</script>

<template>
  <section class="p-10px flex flex-col h-full justify-between">
    <div class="h-[calc(100%-38px)]">
      <div class="mb-15px flex justify-end items-center">
        <slot name="header"></slot>
      </div>

      <el-table
        :data
        style="width: 100%;"
        row-key="id"
        default-expand-all
        :header-row-style="{ color: '#A0AEC0', fontWeight: '700', fontSize: '18px'}"
        :row-style="{ fontSize: '16px', color: 'black' }"
      >
    
        <slot name="table"></slot>

        <el-table-column fixed="right" label="操作" width="230">
          <template #default="{ row, $index }">
            <div class="flex justify-between">
              <slot name="toolbar" :row="row" :index="$index"></slot>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>


    <slot name="pagination"></slot>
  </section>
</template>

<style scoped>
:deep(.el-tree) {
  --el-tree-node-content-height: 35px;
}
</style>