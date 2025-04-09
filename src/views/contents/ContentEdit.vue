<script setup>

import { ref, provide } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import FolderEdit from '@/views/folders/FolderEdit.vue'
import DocumentEdit from '@/views/documents/DocumentEdit.vue'
import FileEdit from '@/views/files/FileEdit.vue'
import EventEdit from '@/views/events/EventEdit.vue'
import Breadcrumb from '@/components/breadcrumbs/Breadcrumb.vue'

import { HTTPError } from '@/composables/fetch.js'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const router = useRouter()

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

const setErrorFromResponse = async(r) => {
  const errors = await r.json()

  for (const [k, v] of Object.entries(errors)) {
    setError(k, v.join(''))
  }
}

const update = async (factory) => {
  try {
    await factory(props.content)
    router.push({name: 'show-content', params: {id: props.content.id}})
  } catch (e) {
    if (e instanceof HTTPError) {
      setErrorFromResponse(e.response)
    }
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

const doBrowse = async (id) => await router.push({
  name: 'browse-content', 
  params: { id: id }
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
      @update="update"
    />
  </div>
</template>
