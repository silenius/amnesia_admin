<script setup>

import { ref, provide } from 'vue'

import FolderEdit from '@/views/folders/FolderEdit.vue'
import DocumentEdit from '@/views/documents/DocumentEdit.vue'

const props = defineProps({
    content: Object
})

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

const mapping = {
  'folder': FolderEdit,
  'document': DocumentEdit
}

provide('errors', {
  errors,
  setError
})

</script>

<template>
    <h1>Edit content</h1>
    <span class="text-green-600">{{ content.title }}</span>
    <component 
      :is="mapping[content.type.name]" 
      :content="content"
    />
</template>
