<script setup>

import { ref, provide } from 'vue'

import FolderEdit from '@/views/folders/FolderEdit.vue'

const props = defineProps({
    content: Object
})

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

const mapping = {
    'folder': FolderEdit
}

provide('errors', {
  errors,
  setError
})

</script>

<template>
    <h1>Edit content</h1>
    <component :is="mapping[content.type.name]" :content="content" v-if="content" />

</template>
