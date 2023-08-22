<script setup>

import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

import FileForm from '@/components/file/FileForm.vue'
import { useFile } from '@/composables/files.js'

const props = defineProps({
    container: Object
})

const router = useRouter()

const { createFile } = useFile()

const file = ref({
  is_fts: true,
  exclude_nav: false,
  container_id: props.container.id,
  props: {}
})

const { setErrorFromResponse } = inject('errors')

const create = async () => {
  try {
    const { data } = await createFile(props.container, file)
    router.push({name: 'show-content', params: {id: data.id}})
  } catch (e) {
    setErrorFromResponse(e.response)
  }
}


</script>

<template>
    <h1>Add file</h1>
    <FileForm 
      :file="file" 
      :container="container"
      :action="'Add file'"
      @submit-file="create" 
    />
</template>
