<template>
  <div>
    <label class="block flex items-center gap-2">
      <input class="text-green-500 align-middle h-8 w-8" v-model.number="value" type="checkbox" />
      <div class="flex flex-col">
        <span class="font-bold">Breadcrumb</span>
        <p class="text-xs">If selected, a breadcrumb will be displayed.</p>
      </div>
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
