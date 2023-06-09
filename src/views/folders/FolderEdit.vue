<script setup>
import { useRouter } from 'vue-router'

import FolderForm from '@/components/folder/FolderForm.vue'
import { useFolder } from '@/composables/folders.js'

const props = defineProps({
  content: Object
})

const router = useRouter()

const { updateFolder } = useFolder()

const update = async () => {
  await updateFolder(props.content)
  router.push({name: 'show-content', params: {id: props.content.id}})
}

</script>

<template>
    <h1>Edit folder</h1>
    <FolderForm 
      :folder="content" 
      :action="'Update folder'"
      @submit-folder="update" 
    />
</template>
