<template>
  <div>
    <label class="block">
      <input v-model="value" type="checkbox" />
      <span>Searchable through the website</span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  is_fts: Boolean
})

const emit = defineEmits([
  'update:is_fts',
])

const value = computed({

  get() {
    return props.is_fts
  },

  set(value) {
    emit('update:is_fts', value)
  }

})

</script>
