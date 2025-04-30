<script setup>

import { ref, inject, toValue } from 'vue'
import { useRouter } from 'vue-router'

import EventForm from '../../components/event/EventForm.vue'
import { useCreateEvent } from '../../composables/useCreateEvent.js'

const props = defineProps({
    container: Object
})

const { setErrorFromResponse } = inject('errors')

const router = useRouter()

const { create_event, event, error } = useCreateEvent()

const create = async () => {
  await create_event(props.container)

  if (!toValue(error)) {
    router.push(`/${event.value.id}`)
  } else {
    setErrorFromResponse(error.value.response)
  }
}

</script>

<template>
    <EventForm 
      :event="event" 
      :container="container"
      :action="'Add event'"
      @submit-event="create" 
    />
</template>
