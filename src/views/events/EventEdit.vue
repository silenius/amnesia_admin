<script setup>
import { inject, toRefs, toValue } from 'vue'
import { useRouter } from 'vue-router'
import EventForm from '../../components/event/EventForm.vue'
import { useUpdateEvent } from '../../composables/useEvent.js'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const { content: event} = toRefs(props)

const router = useRouter()

const { setErrorFromResponse } = inject('errors')

const { update_event, error } = useUpdateEvent(event)

const update = async() => {
  await update_event()

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
      :action="'Update event'"
      @submit-event="update" 
    />
</template>
