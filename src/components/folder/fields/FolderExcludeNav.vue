<template>
  <div>
    <label class="block">
      <input v-model="value" type="checkbox" />
      <span>Exclude from navigation tree</span>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  exclude_nav: Boolean
})

const emit = defineEmits([
  'update:exclude_nav',
])

const value = computed({

  get() {
    return props.exclude_nav
  },

  set(value) {
    emit('update:exclude_nav', value)
  }

})

</script>
