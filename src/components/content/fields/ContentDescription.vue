<template>
  <div>
    <label class="block">
      <span>Description</span>
      <textarea v-model.trim="value" class="block" type="text" placeholder=""></textarea>
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
