<script setup>
import { inject, toRefs, toValue } from 'vue'
import { useRouter } from 'vue-router'
import FolderForm from '../../components/folder/FolderForm.vue'
import { useUpdateFolder } from '../../composables/useFolder.js'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const { content: folder } = toRefs(props)

const router = useRouter()

const { setErrorFromResponse } = inject('errors')

const { update_folder, error } = useUpdateFolder(folder)

const update = async() => {
  await update_folder()

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
      :action="'Update folder'"
      @submit-folder="update" 
    />
</template>
