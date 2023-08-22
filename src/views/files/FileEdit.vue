<script setup>

import { inject } from 'vue'
import { useRouter } from 'vue-router'

import FileForm from '@/components/file/FileForm.vue'
import { useFile } from '@/composables/files.js'

const props = defineProps({
    content: Object
})

const { setErrorFromResponse } = inject('errors')

const router = useRouter()

const { updateFile } = useFile()

const update = async () => {
  try {
    await updateFile(props.content)
    router.push({name: 'show-content', params: {id: props.content.id}})
  } catch (e) {
    setErrorFromResponse(e.response)
  }
}

</script>

<template>
    <h1>Update file</h1>
    <FileForm 
      :file="content" 
      :action="'Update file'"
      @submit-file="update" 
    />
</template>
