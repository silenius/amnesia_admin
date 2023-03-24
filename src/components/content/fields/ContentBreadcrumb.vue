<template>
  <div>
    <label class="block">
      <input v-model.number="value" type="checkbox" />
      <span>Breadcrumb</span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  breadcrumb: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits([
  'update:breadcrumb',
])

const value = computed({

  get() {
    return props.breadcrumb
  },

  set(value) {
    emit('update:breadcrumb', value)
  }

})

</script>
