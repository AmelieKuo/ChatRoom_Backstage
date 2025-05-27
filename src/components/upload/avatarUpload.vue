<script setup>
import { defineProps, defineEmits, computed, ref } from 'vue'
import CommonButton from '@/components/CommonButton.vue'
// import type { UploadProps, UploadUserFile } from 'element-plus';

defineProps({
  imgSrc: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 42,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(['update:modelValue'])

const fileList = ref([]);

const uploadFile = (options) => {
  const formData = new FormData();
  formData.append('files', options.file);

  const imgUrl = window.URL.createObjectURL(options.file);
  // const { result: fileInfo } = await 

  // const newFileList = JSON.parse(JSON.stringify(fileList.value));

  console.log(options);
  // newFileList.pop();
  const newFileList = [];
  newFileList.push({
    status: 'success',
    uid: options.file.uid,
    filePath: imgUrl,
    // name: fileInfo[0].fileName,
    // filePath: fileInfo[0].filePath,
    // url: `${baseUrl}/${fileInfo[0].filePath}`,
    // id: fileInfo[0].id
  });

  // let uploadFilePath;
  // let uploadFileList;
  // uploadFilePath = newFileList;

  emits('update:modelValue', newFileList[0]);
};

const handleExceed = (files) => {
  emits('update:modelValue', {});
  uploadFile(files[0])
}

</script>

<template>
  <div class="flex items-center gap-10px h-full">
    <el-avatar :size fit="cover" :src="imgSrc ? imgSrc : 'images/avatar.svg'" />
    <el-upload
      v-if="!disabled"
      v-model:file-list="fileList"
      class="h-full flex flex-col items-start justify-between"
      :http-request="uploadFile"
      :limit="1"
      :on-exceed="handleExceed"
      :show-file-list="false"
    >
      <CommonButton type="view" name="上傳圖片" />
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500KB.
        </div>
      </template>
    </el-upload>
  </div>
</template>