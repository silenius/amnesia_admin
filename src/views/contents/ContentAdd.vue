<script setup>

import { provide, ref } from 'vue'

import FolderAdd from '@/views/folders/FolderAdd.vue'
import DocumentAdd from '@/views/documents/DocumentAdd.vue'
import FileAdd from '@/views/files/FileAdd.vue'

const props = defineProps({
  content: Object,
  type: String
})

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

const mapping = {
  folder: FolderAdd,
  document: DocumentAdd,
  file: FileAdd
}

provide('errors', {
  errors,
  setError
})

</script>

<template>
  <h1>Add content</h1>
  <component 
    :is="mapping[props.type]" 
    :container="content"
  />

</template>
