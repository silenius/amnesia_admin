<script setup>

import { watch, toRefs, ref, provide } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import FolderEdit from '@/views/folders/FolderEdit.vue'
import DocumentEdit from '@/views/documents/DocumentEdit.vue'
import FileEdit from '@/views/files/FileEdit.vue'
import EventEdit from '@/views/events/EventEdit.vue'
import Breadcrumb from '@/components/breadcrumbs/Breadcrumb.vue'

import { useContent } from '../../composables/useContent.js'

import { HTTPError } from '@/composables/fetch.js'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const { content } = toRefs(props)

const router = useRouter()

const errors = ref({})

const setError = (key, value) => {
  if (value === false) {
    delete errors.value[key]
  } else {
    errors.value[key] = value
  }
}

const setErrorFromResponse = async(r) => {
  const errors = await r.json()

  for (const [k, v] of Object.entries(errors)) {
    setError(k, v.join(''))
  }
}

const mapping = {
  folder: FolderEdit,
  document: DocumentEdit,
  file: FileEdit,
  event: EventEdit
}

provide('errors', {
  errors,
  setError
})

</script>

<template>
  <div class="m-4">
    <Breadcrumb 
      :content="content" 
      @navigate="(content) => $router.push(`/${content.id}`)"
      class="p-2 shadow-md mb-4"
    />

    <component 
      :is="mapping[content.type.name]" 
      :content="content"
    />
  </div>
</template>
