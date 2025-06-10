<script setup>
import { inject } from 'vue'
import NameField from '@/components/role/NameField.vue'
import DescriptionField from '@/components/role/DescriptionField.vue'

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

const { errors } = inject('errors')

</script>

<template>
  <form class="text-slate-600" @submit.prevent="$emit('submit-role')">
    <NameField v-model="role.name" />
    <DescriptionField class="mt-2" v-model="role.description" />
    <button type="submit" class="mt-4 rounded-sm w-fit hover:bg-green-200 bg-green-100 px-4 py-1 text-green-600 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      {{ action }}
    </button>
  </form>
</template>
