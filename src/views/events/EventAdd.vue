<script setup>

import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'

import EventForm from '@/components/event/EventForm.vue'
import { useEvent } from '@/composables/events.js'

const props = defineProps({
    container: Object
})

const router = useRouter()

const { createEvent } = useEvent()

const event = ref({
  is_fts: true,
  exclude_nav: false,
  container_id: props.container.id,
  props: {}
})

const { setErrorFromResponse } = inject('errors')

const create = async () => {
  try {
    const { data } = await createEvent(props.container, event)
    router.push({name: 'contents', params: {id: data.id}})
  } catch (e) {
    setErrorFromResponse(e.response)
  }
}

</script>

<template>
    <h1>Add event</h1>
    <EventForm 
      :event="event" 
      :container="container"
      :action="'Add event'"
      @submit-event="create" 
    />
</template>
