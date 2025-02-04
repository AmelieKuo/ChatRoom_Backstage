<script setup>
import { ref } from 'vue';

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  limit: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  }
});

const currentPage = ref(props.page);
const pageSize = ref(props.limit);

const emit = defineEmits(["update:page", "update:size"]);

const handleSizeChange = (val) => {
  pageSize.value = val;
  emit("update:size", pageSize.value);
};

const handleCurrentChange = (val) => {
  currentPage.value = val;
  emit("update:page", currentPage.value);
};

</script>

<template>
  <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total :page-sizes="[10, 20, 30]"
    :disabled layout="total, sizes, prev, pager, next, jumper"
    @size-change="handleSizeChange" @current-change="handleCurrentChange" />
</template>