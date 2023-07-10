<template>
  <div>
    <label class="block flex items-center gap-2">
      <InputCheckbox @change="(n) => value = n" :checked="value"/>
      <div class="flex flex-col">
        <span class="font-bold">Polymorphic loading</span>
        <p class="text-xs" v-if="value">
          Loading of inheritance hierarchies is enabled. You can
          afterwards select which specific content should be included within the query.
        </p> 
        <p v-else class="text-xs">
          No loading of inheritance hierarchies will be done.
        </p>
      </div>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InputCheckbox from '@/components/form/InputCheckbox.vue'

const props = defineProps({
  polymorphic_loading: Boolean
})

const emit = defineEmits([
  'update:polymorphic_loading',
])

const value = computed({

  get() {
    return props.polymorphic_loading
  },

  set(value) {
    value = value === 'true' ? true : false
    emit('update:polymorphic_loading', value)
  }

})
</script>
