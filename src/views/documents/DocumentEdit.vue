<script setup>

import { useRouter } from 'vue-router'

import DocumentForm from '@/components/document/DocumentForm.vue'
import { useDocument } from '@/composables/documents.js'

const props = defineProps({
    content: Object
})

const router = useRouter()

const { updateDocument } = useDocument()

const update = async () => {
  try {
    await updateDocument(props.content)
    router.push({name: 'show-content', params: {id: props.content.id}})
  } catch (e) {
    // TODO
    console.log(e)
  }
}


</script>

<template>
    <h1>Update document</h1>
    <DocumentForm 
      :doc="content" 
      :action="'Update document'"
      @submit-document="update" 
    />
</template>
