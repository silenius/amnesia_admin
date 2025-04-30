<script setup>

import { ref, inject, toValue } from 'vue'
import { useRouter } from 'vue-router'

import FolderForm from '../../components/folder/FolderForm.vue'
import { useCreateFolder } from '../../composables/useCreateFolder.js'

const props = defineProps({
    container: Object
})

const { setErrorFromResponse } = inject('errors')

const router = useRouter()

const { create_folder, folder, error } = useCreateFolder()

const create = async () => {
  await create_folder(props.container)

  if (!toValue(error)) {
    router.push(`/${folder.value.id}/browse`)
  } else {
    setErrorFromResponse(error.value.response)
  }
}

</script>

<template>
    <FolderForm 
      :folder="folder" 
      :action="'Add folder'"
      @submit-folder="create" 
    />
</template>
