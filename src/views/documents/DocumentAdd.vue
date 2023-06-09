<script setup>

import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

import DocumentForm from '@/components/document/DocumentForm.vue'
import { useDocument } from '@/composables/documents.js'

const props = defineProps({
  container: Object
})

const router = useRouter()

const { createDocument } = useDocument()

const doc = ref({
  is_fts: true,
  exclude_nav: false,
  container_id: props.container.id,
  breadcrumb: true
})

const { errors, setError } = inject('errors')

const create = async () => {
  try {
    const { data } = await createDocument(props.container, doc)
    router.push({name: 'show-content', params: {id: data.id}})
  } catch (e) {
    // TODO
    console.log(e)
  }
}
</script>

<template>
  <h1>Add document</h1>

  <DocumentForm 
    :doc="doc" 
    :container="container"
    :action="'Add document'"
    @submit-document="create" 
  />
</template>
