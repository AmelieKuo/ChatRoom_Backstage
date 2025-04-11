<script setup>
import { ref, defineProps, computed } from 'vue'
import { CircleCheck, Warning, CircleClose } from '@element-plus/icons-vue'
import CommonButton from '@/components/CommonButton.vue'
import { fa } from 'element-plus/es/locales.mjs'

const alertOptions = ref({
  title: '',
  content: '',
  type: '',
  showCancel: false,
  showConfirm: false,
  visible: false,
  timer: null,
})

const isVisible = ref(false)
const resolveAction = ref(null)

let autoCloseTimer = null

const handleOpen = (options = {}) => {
  return new Promise(async (resolve) => {
    alertOptions.value = { ...alertOptions.value, ...options }
    alertOptions.value.timer = options.timer / 1000 || null
    isVisible.value = true
    if (options.timer) {
      autoCloseTimer && clearTimeout(autoCloseTimer)
      autoCloseTimer = setTimeout(() => {
        handleClose();
      }, options.timer)
    }

    resolveAction.value = resolve
  })
}

const handleConfirm = () => {
  resolveAction.value?.(true)
  isVisible.value = false
  resolveAction.value = null
}

const handleClose = () => {
  resolveAction.value?.(false)
  isVisible.value = false
  resolveAction.value = null
}

defineExpose({ handleOpen })

</script>

<template>
  <Teleport to="body">
    <el-dialog v-model="isVisible" align-center center :show-close="false" width="500" custom-class="alertStyle"
      class="rounded-5px p-20px relative">
      <div class="mt--16px flex flex-col items-center gap-14px">
        <div class="w-20%">
          <CircleCheck v-if="alertOptions.type === 'success'" class="color-#a5dc86" />
          <Warning v-if="alertOptions.type === 'warning'" class="color-#f8bb86" />
          <CircleClose v-if="alertOptions.type === 'error'" class="color-#f27474" />
        </div>
        <h4 class="font-700 text-24px color-text_dark">{{ alertOptions.title }}</h4>
        <div v-if="alertOptions.content">
          {{ alertOptions.content }}
        </div>
      </div>
      <template #footer>
        <div v-if="alertOptions.showConfirm || alertOptions.showCancel" class="mt-5px">
          <CommonButton v-if="alertOptions.showCancel" @click="handleClose" type="danger" name="取消" size="large" />
          <CommonButton v-if="alertOptions.showConfirm" @click="handleConfirm" type="edit" name="確定" size="large" />
        </div>
      </template>
      <el-progress v-if="alertOptions.timer" :percentage="100" :indeterminate="true" :duration="alertOptions.timer"
        :show-text="false" class="absolute bottom-0 left-0 w-full rotate-180" />
    </el-dialog>
  </Teleport>
</template>

<style scoped>
</style>