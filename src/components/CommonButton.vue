<script setup>
import { computed, toRefs, defineProps } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: () => '',
  },
  name: {
    type: String,
    default: () => '按鈕',
  },
  size: {
    type: String,
    default: () => '',
  },
});

const { type, name } = toRefs(props)


const btnType = computed(() => {
  switch (type.value) {
    case 'primary':
      return 'primary';
    case 'success':
      return 'success';
    case 'warning':
      return 'warning';
    case 'danger':
      return 'danger';
    case 'info':
      return 'info';

    // 自訂顏色
    case 'edit':
      return '#2684FF';
    case 'view':
      return '#909399';
    default:
      return 'primary';
  }
});


</script>

<template>
  <el-button :size :type="type !== 'edit' && type !== 'view' ? btnType : ''"
    :color="type === 'edit' || type === 'view' ? btnType : ''" :class="size === '' ? 'h-26px' : ''" class="color-white rounded-5px">
    {{ name }}
  </el-button>
</template>

<style scoped>
</style>