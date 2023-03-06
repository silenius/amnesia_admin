<template>
  <div>
    <label class="block">
      <input type="checkbox" v-model="value"/>
      <span>Polymorphic loading</span>
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
