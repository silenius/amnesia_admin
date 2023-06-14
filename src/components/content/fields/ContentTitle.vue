<template>
  <div class="mb-4">
    <label>
      <p class="font-bold">Title</p>
      <p class="text-xs">Main content title</p>
      <input v-model.trim="value" class="focus:ring-0 focus:border-indigo-500 border-slate-300 focus:text-slate-800 focus:bg-slate-100 bg-slate-50 w-full" type="text" placeholder="" />
      <span class="text-red-500" v-if="errors.title">{{ errors.title }}</span>
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
