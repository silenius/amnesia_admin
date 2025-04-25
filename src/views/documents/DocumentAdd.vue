<script setup>

import { ref, toValue, inject } from 'vue'
import { useRouter } from 'vue-router'

import DocumentForm from '../../components/document/DocumentForm.vue'
import { useCreateDocument } from '../../composables/useCreateDocument.js'

const props = defineProps({
  container: Object
})

const { setErrorFromResponse } = inject('errors')

const router = useRouter()

const { create_document, data, doc, error } = useCreateDocument()

const create = async () => {
  await create_document(props.container)

  if (!toValue(error)) {
    router.push(`/${data.value.id}`)
  } else {
    setErrorFromResponse(error.value.response)
  }
}
</script>

<template>
  <DocumentForm 
  :doc="doc" 
  :container="container"
  :action="'Add document'"
  @submit-document="create" 
/>
</template>
