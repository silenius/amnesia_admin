<script setup>

import { provide, toRefs, ref, toValue } from 'vue'

import FolderAdd from '../folders/FolderAdd.vue'
import DocumentAdd from '../documents/DocumentAdd.vue'
import FileAdd from '../files/FileAdd.vue'
import EventAdd from '../events/EventAdd.vue'
import Breadcrumb from '../../components/breadcrumbs/Breadcrumb.vue'

import { useContent } from '../../composables/useContent.js'

const props = defineProps({
  content_id: {
    type: Number,
    required: true
  },
  type: {
    String,
    required: true
  }
})

const { content_id } = toRefs(props)
const { content } = useContent(content_id)

const errors = ref({})

const setError = (key, value) => {
  if (value === false) {
    delete errors.value[key]
  } else {
    errors.value[key] = value
  }
}

const setErrorFromResponse = async(error) => {
  const error_value = toValue(error)

  for (const [k, v] of Object.entries(error_value.data)) {
    setError(k, v.join(''))
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
  <div class="m-4" v-if="content">
    <Breadcrumb 
      :content="content" 
      @navigate="(content) => $router.push(`/${content.id}`)"
      class="p-2 shadow-md mb-4"
    />

    <component 
      :is="mapping[props.type]" 
      :container="content"
    />

  </div>
</template>
