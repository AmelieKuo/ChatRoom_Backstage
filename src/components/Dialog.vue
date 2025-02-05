<script setup>
import { ref, defineProps, computed } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'

const prop = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'add',
  },
});

const currentVisible = computed(() => {
  console.log(prop.visible)
  return prop.visible
})

const currentMode = computed(() => {
  switch (prop.mode) {
    case 'add':
      return '新增'
    case 'edit':
      return '編輯'
    case 'view':
      return '查看'
    default:
      return '新增'
  }
})

</script>

<template>
  <el-dialog v-model="currentVisible" :show-close="true" width="500" class="rounded-5px p-20px">
    <template #header="{ close, titleId, titleClass }">
      <h4 class="color-text_dark text-20px font-bold">{{ currentMode }}</h4>
    </template>
    This is dialog content.
  </el-dialog>
</template>