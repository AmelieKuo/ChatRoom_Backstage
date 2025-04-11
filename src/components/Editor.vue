<script setup>
import { defineProps, defineEmits } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const props = defineProps({
  modelValue : {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const config = {
  language: 'zh',
  toolbar: ['undo', 'redo', '|', 'bold', 'italic', '|', 'bulletedList', 'numberedList', '|', 'blockQuote', 'insertTable'],
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells']
  },
  licenseKey: 'GPL',
}

const emits = defineEmits(["update:modelValue"]);

const handleChange = (value) => {
  emits('update:modelValue', value);
}

</script>


<template>
  <div class="color-black font-normal w-full h-full" :class="disabled ? 'text-gray cursor-not-allowed' : 'text-black'">
    <ckeditor :model-value="modelValue" @update:modelValue="handleChange" :editor="ClassicEditor" :config="config" :disabled :class="disabled ? 'disabled' : ''"/>
  </div>
</template>


<style scoped>
:deep(.ck.ck-editor__editable.ck-focused:not(.ck-editor__nested-editable)){
  border-color: var(--main_green);
  box-shadow: 0 0 0 0px var(--main_green);
}

:deep(.ck-content ol),
:deep(.ck-content ul) {
  list-style-position: inside !important;
}

:deep(.ck-editor__editable .ck-list-bogus-paragraph) {
  display: inline-block;
}
</style>
