<template>
  <div>
    <label class="block flex items-center gap-2">
      <input class="align-middle h-8 w-8" type="checkbox" v-model="value"/>
      <div class="flex flex-col">
      <span class="font-bold">Polymorphic loading</span>
      <p class="text-xs">
        If selected, loading of inheritance hierarchies is enabled. You can
        afterwards select which specific content should be included within the query.
      </p>
        </div>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

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
    emit('update:polymorphic_loading', value)
  }

})
</script>
