<script setup>

import { ref, toValue, inject } from 'vue'
import { useRouter } from 'vue-router'

import DocumentForm from '../../components/document/DocumentForm.vue'
import { useCreateDocument } from '../../composables/useDocument.js'

const props = defineProps({
  container: Object
})

const { setErrorFromResponse } = inject('errors')

const router = useRouter()

const { create_document, doc, error } = useCreateDocument()

const create = async () => {
  await create_document(props.container)

  if (!toValue(error)) {
    router.push(`/${doc.value.id}`)
  } else {
    setErrorFromResponse(error.value.response)
  }
}
</script>

<template>
  <DocumentForm 
    :doc="doc" 
    :action="'Add document'"
    @submit-document="create" 
  />
</template>
