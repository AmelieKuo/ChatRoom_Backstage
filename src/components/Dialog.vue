<script setup>
import { ref, defineProps, computed } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  mode: {
    type: String,
    default: 'add',
  },
  title: {
    type: String,
    default: '',
  },
});

const currentVisible = computed(() => {
  return props.visible
})

const currentMode = computed(() => {
  switch (props.mode) {
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
  <el-dialog v-model="currentVisible" :show-close="false" width="500" class="rounded-5px p-20px">
    <template #header="{ close, titleId, titleClass }">
      <div class="w-full flex justify-between items-center">
        <h4 class="color-text_dark text-20px font-bold color-text_dark">{{ currentMode }}{{ props.title }}</h4>
        <CloseBold class="w-20px color-text_light hover:opacity-80" />
      </div>
    </template>
    <slot />
  </el-dialog>
</template>