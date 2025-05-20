<script setup>
import { inject, toValue } from 'vue'
import { useRouter } from 'vue-router'
import FolderForm from '../../components/folder/FolderForm.vue'
import { useCreateFolder } from '../../composables/useFolder.js'

const props = defineProps({
    container: Object
})

const router = useRouter()

const { setErrorFromResponse } = inject('errors')

const { create_folder, folder, error } = useCreateFolder({
  container: props.container
})

const create = async () => {
  await create_folder(props.container)

  if (!toValue(error)) {
    router.push(`/${folder.value.id}/browse`)
  } else {
    setErrorFromResponse(error)
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
