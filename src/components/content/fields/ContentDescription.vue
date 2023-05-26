<template>
  <div class="mb-4">
    <label>
      <p>Description</p>
      <textarea v-model.trim="value" class="focus:ring-0
        focus:border-indigo-500 border-slate-300 focus:text-slate-800
        focus:bg-slate-100 bg-slate-50 w-full" type="text" placeholder=""></textarea>
      <span class="text-red-500" v-if="errors.description">
        {{ errors.description }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { useContent } from '@/composables/contents.js'

const props = defineProps({
  description: String
})

const emit = defineEmits([
  'update:description',
])

const { errors, setError } = inject('errors')

const { validateDescription } = useContent()

const value = computed({

  get() {
    return props.description
  },

  set(value) {
    setError('description', validateDescription(value))
    emit('update:description', value)
  }

})

</script>
