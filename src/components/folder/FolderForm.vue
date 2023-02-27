<script setup>
import { inject } from 'vue'
import ContentTitle from '@/components/content/ContentTitle.vue'
import ContentDescription from '@/components/content/ContentDescription.vue'

const props = defineProps({
  folder: {
    type: Object,
    required: true
  },
  action: {
    type: String,
    default: 'Submit'
  }
})

const emit = defineEmits([
  'submit-folder'
])

const errors = inject('errors')

</script>

<template>
  <form @submit.prevent="$emit('submit-folder')">
    <ContentTitle v-model:title="folder.title" />
    <ContentDescription v-model:description="folder.description" />
    <button type="submit" class="rounded w-fit hover:bg-green-200 bg-green-100 px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {{ action }}
    </button>
  </form>
</template>
