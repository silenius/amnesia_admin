<script setup>
import { ref, toValue, inject } from 'vue'
import { useRouter } from 'vue-router'

import FileForm from '../../components/file/FileForm.vue'
import { useCreateFile } from '../../composables/useFile.js'

const props = defineProps({
  container: Object
})

const { setErrorFromResponse } = inject('errors')

const router = useRouter()

const { create, file, error } = useCreateFile()

const do_create = async () => {
  await create(props.container)

  if (!toValue(error)) {
    router.push(`/${file.value.id}`)
  } else {
    setErrorFromResponse(error)
  }
}
</script>

<template>
  <FileForm 
    :file="file" 
    :action="'Add file'"
    @submit-file="do_create" 
  />
</template>
