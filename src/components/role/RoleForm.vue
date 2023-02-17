<script setup>
import { ref, inject, onMounted, computed } from 'vue'
import NameField from '@/components/role/NameField.vue'
import DescriptionField from '@/components/role/DescriptionField.vue'

import { useRole } from '@/composables/roles.js'

const props = defineProps({
  role: {
    type: Object,
    required: true
  },
  action: {
    type: String,
    default: 'Submit'
  }
})

const emit = defineEmits([
  'submit-role'
])

const errors = inject('errors')

</script>

<template>
  <form @submit.prevent="$emit('submit-role')">
    <NameField v-model:name="role.name" />
    <DescriptionField v-model:description="role.description" />
    <button type="submit" class="rounded w-fit hover:bg-green-200 bg-green-100 px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {{ action }}
    </button>
  </form>
</template>
