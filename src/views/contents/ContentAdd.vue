<script setup>

import { ref, onMounted, onUpdated, provide } from 'vue'

import FolderAdd from '@/views/folders/FolderAdd.vue'

const props = defineProps({
  content: Object,
  type: String
})

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

const mapping = {
    folder: FolderAdd
}

provide('errors', {
  errors,
  setError
})

onMounted(() => console.log('MOUNTED: ContentAdd', props.content.type.name,
  props.type))
onUpdated(() => console.log('UPDATED: ContentAdd'))
</script>

<template>
    <h1>Add content</h1>
    <component 
      :is="mapping.folder" 
      :container="content"
    />

</template>
