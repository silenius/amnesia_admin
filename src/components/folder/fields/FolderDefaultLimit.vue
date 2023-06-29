<template>
  <div>
    <label class="block">
      <p class="font-bold">Items per page</p>
      <p class="text-xs">Number of items to show by default when browsing the
      folder.</p>
      <select class="form-select mt-2" v-model.number="value">
        <option :value="null">default</option>
        <option v-for="option in options">
          {{ option }}
        </option>
      </select> per page
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
