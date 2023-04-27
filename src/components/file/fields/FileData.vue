<template>
  <div>
    <label class="block">
      <span>File</span>
      <input type="file" @change="onFileChange" class="block" />
      <span class="text-red-500" v-if="errors.content">
        {{ errors.content }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const props = defineProps({
  content: File
})

const emit = defineEmits([
  'update:content',
])

const { errors, setError } = inject('errors')

const onFileChange = (event) => {
  emit('update:content', event.target.files[0])
}

</script>
