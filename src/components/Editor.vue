<script setup>
import { defineProps, defineEmits } from 'vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const props = defineProps({
  modelValue : {
    type: String,
    default: '',
  }
});

const config = {
  language: 'zh',
  toolbar: ['undo', 'redo', '|', 'heading', 'bold', 'italic', '|', 'link', 'bulletedList', 'numberedList', '|', 'blockQuote', 'insertTable', '|', 'imageUpload', 'mediaEmbed'],
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
  <div class="color-black text-black w-full">
    <ckeditor :model-value="modelValue" @update:modelValue="handleChange" :editor="ClassicEditor" :config="config" />
  </div>
</template>
