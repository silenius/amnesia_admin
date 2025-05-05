<script setup>
import { inject, toValue } from 'vue'
import { useRouter } from 'vue-router'
import FolderForm from '../../components/folder/FolderForm.vue'
import { useUpdateFolder } from '../../composables/useUpdateFolder.js'

const props = defineProps({
  content: Object
})

const router = useRouter()

const { setErrorFromResponse } = inject('errors')

const { update_folder, error } = useUpdateFolder(props.content)

const update = async() => {
  await update_folder()

  if (!toValue(error)) {
    router.push(`/${props.content.id}/browse`)
  } else {
    setErrorFromResponse(error.value.response)
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
