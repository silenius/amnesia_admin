<template>
  <div>
    <label class="block">
      <span>Title</span>
      <input v-model.trim="value" class="block" type="text" placeholder="" />
      <span class="text-red-500" v-if="errors.title">
        {{ errors.title }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { useContent } from '@/composables/contents.js'

const props = defineProps({
  title: String
})

const emit = defineEmits([
  'update:title',
])

const { errors, setError } = inject('errors')

const { validateTitle } = useContent()

const value = computed({

  get() {
    return props.title
  },

  set(value) {
    setError('title', validateTitle(value))
    emit('update:title', value)
  }

})

</script>
