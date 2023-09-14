<script setup>

import EventForm from '@/components/event/EventForm.vue'
import { useEvent } from '@/composables/events.js'

const props = defineProps({
    content: Object
})

const emit = defineEmits(['update'])

const { updateEvent } = useEvent()

</script>

<template>
    <h1>Update event</h1>
    <EventForm 
      :event="content" 
      :action="'Update event'"
      @submit-event="$emit('update', updateEvent)" 
    />
</template>
