<script setup>
import { ref, defineProps, computed } from 'vue'
import { CircleCheck, Warning, CircleClose } from '@element-plus/icons-vue'
import CommonButton from '@/components/CommonButton.vue'

// const prop = defineProps({
//   visible: {
//     type: Boolean,
//     default: false,
//   },
//   title: {
//     type: String,
//     default: '新增',
//   },
//   content: {
//     type: String,
//     default: '',
//   },
//   type: {
//     type: String,
//     default: 'success',
//   },
//   timerProgressBar: {
//     type: Boolean,
//     default: false,
//   },
// });

const alertOptions = ref({
  title: '',
  content: '',
  type: '',
  showCancel: false,
  visible: false,
})

const isVisible = ref(false)

const open = (options = {}) => {
  return new Promise(async (resolve) => {
    alertOptions.value = { ...alertOptions.value, ...options }
    isVisible.value = true
    resolveAction = resolve
  })
}

defineExpose({ open })

</script>

<template>
  <Teleport to="body">
    <transition name="fade">
      <el-dialog v-show="isVisible" align-center center :show-close="false" width="500" custom-class="alertStyle"
        class="rounded-5px p-20px">
        <div class="mt--16px flex flex-col items-center gap-14px">
          <el-icon class="text-center" :size="100">
            <CircleCheck v-if="type === 'success'" class="color-#a5dc86" />
            <Warning v-if="type === 'warning'" class="color-#f8bb86" />
            <CircleClose v-if="type === 'error'" class="color-#f27474" />
          </el-icon>
          <h4 class="font-700 text-24px color-text_dark">{{ title }}</h4>
          <div v-if="content">
            {{ content }}
          </div>
        </div>
        <el-progress :percentage="100" :indeterminate="true" :duration="5" />
        <template #footer>
          <div class="mt-5px">
            <CommonButton name="取消" size="large" />
            <CommonButton type="danger" name="取消" size="large" />
            <CommonButton type="edit" name="確定" size="large" />
          </div>
        </template>
      </el-dialog>
    </transition>
  </Teleport>
</template>

<style scoped>
</style>