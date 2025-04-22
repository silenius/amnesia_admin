<script setup>

import { ref, toValue } from 'vue'
import { useRouter } from 'vue-router'

import FolderForm from '../../components/folder/FolderForm.vue'
import { useCreateFolder } from '../../composables/useCreateFolder.js'

const props = defineProps({
    container: Object
})

const router = useRouter()

const { create_folder, data, folder, error } = useCreateFolder()

const create = async () => {
  await create_folder(props.container)
  
  if (!toValue(error)) {
    router.push(`/${data.value.id}/browse`)
  }

}

</script>

<template>
    <FolderForm 
      :folder="folder" 
      :container="container"
      :action="'Add folder'"
      @submit-folder="create" 
    />
</template>
