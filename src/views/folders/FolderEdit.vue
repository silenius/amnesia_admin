<script setup>

import { inject } from 'vue'
import { useRouter } from 'vue-router'

import FolderForm from '@/components/folder/FolderForm.vue'
import { useFolder } from '@/composables/folders.js'

const props = defineProps({
  content: Object
})

const { setErrorFromResponse } = inject('errors')

const router = useRouter()

const { updateFolder } = useFolder()

const update = async () => {
  try {
    await updateFolder(props.content)
    router.push({name: 'show-content', params: {id: props.content.id}})
  } catch (e) {
    setErrorFromResponse(e.response)
  }
}

</script>

<template>
    <FolderForm 
      :folder="content" 
      :action="'Update folder'"
      @submit-folder="update" 
    />
</template>
