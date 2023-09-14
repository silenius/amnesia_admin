<script setup>

import { ref } from 'vue'

import EventForm from '@/components/event/EventForm.vue'
import { useEvent } from '@/composables/events.js'

const props = defineProps({
  container: Object
})

const emit = defineEmits(['create'])

const { createEvent } = useEvent()

const event = ref({
  is_fts: true,
  exclude_nav: false,
  container_id: props.container.id,
  props: {}
})

</script>

<template>
  <EventForm 
  :event="event" 
  :container="container"
  :action="'Add event'"
  @submit-event="$emit('create', createEvent, event)" 
/>
</template>
