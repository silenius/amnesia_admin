<template>
  <div>
    <label class="block">
      <input class="align-middle mr-2" v-model.number="value" type="checkbox" />
      <span class="font-bold">Breadcrumb</span>
      <p class="text-xs">If selected, a breadcrumb will be displayed.</p>
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
