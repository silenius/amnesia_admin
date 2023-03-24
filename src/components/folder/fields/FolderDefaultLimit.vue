<template>
  <div>
    <label class="block">
      Default browsing limit: 
      <select class="form-select" v-model.number="value">
        <option v-for="option in options">
          {{ option }}
        </option>
      </select>
    </label>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  default_limit: {
    type: Number,
    default: 50
  }
})

const options = ref([
  10, 50, 100
])

const emit = defineEmits([
  'update:default_limit',
])

const value = computed({

  get() {
    return props.default_limit
  },

  set(value) {
    emit('update:default_limit', value)
  }

})

</script>
