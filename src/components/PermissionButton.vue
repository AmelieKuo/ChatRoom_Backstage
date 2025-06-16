<script setup>
import { ref, defineProps, defineEmits, computed } from 'vue';
import { getUserPermission } from '@/composables';
import CommonButton from '@/components/CommonButton.vue';
import elementList from '@/mocks/permission/element.json';

const userPermission = computed(() => getUserPermission());

const props = defineProps({
  row: Object,
  index: Number,
  position: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['btn-event']);

const getBtnClass = (domID) => {
  switch (domID) {
    case 'addBtn':
      return '';
    case 'editBtn':
      return 'edit';
    case 'delBtn':
      return 'danger';
    default:
      return 'primary';
  }
};

const headerButtons = computed(() => {
  const tempBtns = userPermission.value?.filter(item => item.position === 'header') || [];
    const userBtns = tempBtns.map(btn => {
      const element = elementList.find(el => el.domID === btn.domID);
      if (!element) return null;

      return {
        ...btn,
        class: getBtnClass(btn.domID), 
        name: element.name,
        notes: element.notes || '',
      };
    });
  return userBtns;
});

const tableButtons = computed(() => {
  const tempBtns = userPermission.value?.filter(item => item.position === 'table') || [];
    const userBtns = tempBtns.map(btn => {
      const element = elementList.find(el => el.domID === btn.domID);
      if (!element) return null;

      return {
        ...btn,
        class: getBtnClass(btn.domID), 
        name: element.name,
        notes: element.notes || '',
      };
    });
  return userBtns;
});

const handleClick = (domID) => {
  emit('btn-event', {
    domID: domID,
    row: props.row,
    index: props.index
  });
};

</script>

<template>
  <div v-if="props.position === 'header'" class="flex justify-between">
    <template v-for="btn in headerButtons" :key="btn.domID">
      <CommonButton
        :type="btn.class"
        :name="btn.name"
        class="h-32px!"
        @click="handleClick(btn.domID)"
      />
    </template>
  </div>

  <div v-else class="flex justify-between">
    <CommonButton type="view" name="查看" @click="handleClick('view')"/>
    <template v-for="btn in tableButtons" :key="btn.domID">
      <CommonButton
        :type="btn.class"
        :name="btn.name"
        @click="handleClick(btn.domID)"
      />
    </template>
  </div>
</template>