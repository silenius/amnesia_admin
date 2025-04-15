<script setup>

import { provide, ref } from 'vue'
import { useRouter } from 'vue-router'

import FolderAdd from '@/views/folders/FolderAdd.vue'
import DocumentAdd from '@/views/documents/DocumentAdd.vue'
import FileAdd from '@/views/files/FileAdd.vue'
import EventAdd from '@/views/events/EventAdd.vue'
import Breadcrumb from '@/components/breadcrumbs/Breadcrumb.vue'

import { HTTPError } from '@/composables/fetch.js'

const props = defineProps({
  content: Object,
  type: String
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

const create = async(factory, obj) => {
  try {
    const { data } = await factory(props.content, obj)
    router.push({name: 'contents', params: {id: data.id}})
  } catch (e) {
    if (e instanceof HTTPError) {
      setErrorFromResponse(e.response)
    }
  }
}

const mapping = {
  folder: FolderAdd,
  document: DocumentAdd,
  file: FileAdd,
  event: EventAdd
}

provide('errors', {
  errors,
  setError,
  setErrorFromResponse
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
      :is="mapping[props.type]" 
      :container="content"
      @create="create"
    />

  </div>

</template>
