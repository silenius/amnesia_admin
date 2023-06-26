<template>
  <div>
    <label class="block flex items-center gap-2">
      <InputCheckbox @change="(n) => value = n" :default="value"/>
      <div class="flex flex-col">
        <span class="font-bold">Breadcrumb</span>
        <p class="text-xs">If selected, a breadcrumb will be displayed.</p>
      </div>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InputCheckbox from '@/components/form/InputCheckbox.vue'

const props = defineProps({
  breadcrumb: {
    type: Boolean,
    default: null
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
    value = value === 'null' ? null : value === 'true' ? true : false
    emit('update:breadcrumb', value)
  }

})

</script>
