<script setup>
import { inject, toRefs, toValue } from 'vue'
import { useRouter } from 'vue-router'
import DocumentForm from '../../components/document/DocumentForm.vue'
import { useUpdateDocument } from '../../composables/useDocument.js'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const { content: doc } = toRefs(props)

const router = useRouter()

const { setErrorFromResponse } = inject('errors')

const { update_document, error } = useUpdateDocument(doc)

const update = async() => {
  await update_document()

  if (!toValue(error)) {
    router.push(`/${doc.value.id}`)
  } else {
    setErrorFromResponse(error)
  }
}

</script>

<template>
    <DocumentForm 
      :doc="doc" 
      :action="'Update document'"
      @submit-document="update" 
    />
</template>
