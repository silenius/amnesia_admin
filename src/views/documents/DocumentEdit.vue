<script setup>

import { inject } from 'vue'
import { useRouter } from 'vue-router'

import DocumentForm from '@/components/document/DocumentForm.vue'
import { useDocument } from '@/composables/documents.js'

const props = defineProps({
  content: Object
})

const { setErrorFromResponse } = inject('errors')

const router = useRouter()

const { updateDocument } = useDocument()

const update = async () => {
  try {
    await updateDocument(props.content)
    router.push({name: 'show-content', params: {id: props.content.id}})
  } catch (e) {
    setErrorFromResponse(e.response)
  }
}

</script>

<template>
  <DocumentForm 
  :doc="content" 
  :action="'Update document'"
  @submit-document="update" 
/>
</template>
