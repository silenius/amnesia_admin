<script setup>

import { ref, provide, computed, onMounted } from 'vue'

import FolderForm from '@/components/folder/FolderForm.vue'

const props = defineProps({
    container: Object
})

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

const folder = ref({})

const createFolder = () => {
  console.log('CREATE')
}

provide('errors', {
  errors,
  setError
})

</script>

<template>
    <h1>Add folder</h1>
    <FolderForm 
      :folder="folder" 
      :action="'Add folder'"
      @submit-folder="createFolder" 
    />
</template>
