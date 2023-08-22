<script setup>

import { inject } from 'vue'
import { useRouter } from 'vue-router'

import EventForm from '@/components/event/EventForm.vue'
import { useEvent } from '@/composables/events.js'

const props = defineProps({
    content: Object
})

const { setErrorFromResponse } = inject('errors')

const router = useRouter()

const { updateEvent } = useEvent()

const update = async () => {
  try {
    await updateEvent(props.content)
    router.push({name: 'contents', params: {id: props.content.id}})
  } catch (e) {
    setErrorFromResponse(e.response)
  }
}

</script>

<template>
    <h1>Update event</h1>
    <EventForm 
      :event="content" 
      :action="'Update event'"
      @submit-event="update" 
    />
</template>
