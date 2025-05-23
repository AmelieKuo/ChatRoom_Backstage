<script setup>
import { defineProps, defineEmits, computed } from 'vue'
import { CloseBold } from '@element-plus/icons-vue'
import CommonButton from '@/components/CommonButton.vue'

const props = defineProps({
  visible: Boolean,
  mode: {
    type: String,
    default: 'add',
  },
  title: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:visible', 'confirm'])

const currentVisible = computed(() => props.visible)

const currentMode = computed(() => {
  switch (props.mode) {
    case 'edit': return '編輯'
    case 'view': return '查看'
    default: return '新增'
  }
})

const handleClose = () => {
  emit('update:visible', false) // 這邊是元件主動幫忙關掉
}

const handleConfirm = () => {
  emit('confirm') // 讓父層做事，是否關由元件決定
  emit('update:visible', false)
}
</script>

<template>
  <el-dialog :modelValue="currentVisible" :show-close="false" width="500" class="rounded-5px p-20px">
    <template #header>
      <div class="w-full flex justify-between items-center color-text_dark">
        <h4 class="text-20px font-bold">{{ props.title ? props.title : currentMode }}</h4>
        <CloseBold @click="handleClose" class="w-20px color-text_light hover:opacity-80" />
      </div>
    </template>

    <slot />

    <template #footer>
      <div class="dialog-footer">
        <CommonButton @click="handleClose" type="edit" :name="props.mode === 'view' ? '關閉' : '取消'"
          class="w-67px h-36px" />
        <CommonButton v-if="props.mode !== 'view'" @click="handleConfirm" type="danger" name="儲存"
          class="w-67px h-36px" />
      </div>
    </template>
  </el-dialog>
</template>
