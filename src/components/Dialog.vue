<script>
import { ref, defineProps } from 'vue'
import { ElButton, ElDialog } from 'element-plus'
import { CircleCloseFilled } from '@element-plus/icons-vue'

defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

</script>

<template>
  <el-dialog v-model="visible" :show-close="true" width="500">
    <template #header="{ close, titleId, titleClass }">
      <div class="my-header">
        <h4 :id="titleId" :class="titleClass">This is a custom header!</h4>
        <el-button type="danger" @click="close">
          <el-icon class="el-icon--left">
            <CircleCloseFilled />
          </el-icon>
          Close
        </el-button>
      </div>
    </template>
    This is dialog content.
  </el-dialog>
</template>