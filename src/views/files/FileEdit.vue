<script setup>
import { inject, toRefs, toValue } from 'vue'
import { useRouter } from 'vue-router'
import FileForm from '../../components/file/FileForm.vue'
import { useUpdateFile } from '../../composables/useFile.js'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const { content: file } = toRefs(props)

const router = useRouter()

const { setErrorFromResponse } = inject('errors')

const { update_file, error } = useUpdateFile(file)

const update = async() => {
  await update_file()

  if (!toValue(error)) {
    router.push(`/${file.value.id}`)
  } else {
    setErrorFromResponse(error.value.response)
  }
}

</script>

<template>
    <FileForm 
      :file="file" 
      :action="'Update file'"
      @submit-file="update" 
    />
</template>
