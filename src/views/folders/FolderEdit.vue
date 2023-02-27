<script setup>

import { ref, provide, computed, onMounted } from 'vue'

import FolderForm from '@/components/folder/FolderForm.vue'
import { useFolder } from '@/composables/folders.js'

const props = defineProps({
    content: Object
})

const { updateFolder } = useFolder()

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

provide('errors', {
  errors,
  setError
})

</script>

<template>
    <h1>Edit folder</h1>
    <FolderForm 
      :folder="content" 
      :action="'Update folder'"
      @submit-folder="updateFolder" 
    />
</template>
