<script setup>

import { useRouter } from 'vue-router'

import EventForm from '@/components/event/EventForm.vue'
import { useEvent } from '@/composables/events.js'

const props = defineProps({
    content: Object
})

const router = useRouter()

const { updateEvent } = useEvent()

const update = async () => {
  try {
    await updateEvent(props.content)
    router.push({name: 'contents', params: {id: props.content.id}})
  } catch (e) {
    // TODO
    console.log(e)
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
