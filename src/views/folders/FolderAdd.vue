<script setup>

import { ref } from 'vue'

import FolderForm from '@/components/folder/FolderForm.vue'
import { useFolder } from '@/composables/folders.js'

const props = defineProps({
    container: Object
})

const { createFolder } = useFolder()

const folder = ref({})

const create = async () => {
  await createFolder(props.container, folder)
}

</script>

<template>
    <h1>Add folder</h1>
    <FolderForm 
      :folder="folder" 
      :container="container"
      :action="'Add folder'"
      @submit-folder="create" 
    />
</template>
