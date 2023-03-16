<script setup>

import FolderForm from '@/components/folder/FolderForm.vue'
import { useFolder } from '@/composables/folders.js'

const props = defineProps({
  content: Object
})

const { updateFolder } = useFolder()

const update = async () => await updateFolder(props.content)

</script>

<template>
    <h1>Edit folder</h1>
    <span class="text-blue-600">{{ content.title }}</span>
    <FolderForm 
      :folder="content" 
      :action="'Update folder'"
      @submit-folder="update" 
    />
</template>
