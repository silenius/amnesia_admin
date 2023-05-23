<script setup>

import { ref, provide } from 'vue'

import FolderEdit from '@/views/folders/FolderEdit.vue'
import DocumentEdit from '@/views/documents/DocumentEdit.vue'
import FileEdit from '@/views/files/FileEdit.vue'
import EventEdit from '@/views/events/EventEdit.vue'

const props = defineProps({
  content: Object
})

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

const mapping = {
  folder: FolderEdit,
  document: DocumentEdit,
  file: FileEdit,
  event: EventEdit
}

provide('errors', {
  errors,
  setError
})

</script>

<template>
  <component 
    :is="mapping[content.type.name]" 
    :content="content"
  />
</template>
