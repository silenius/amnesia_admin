<template>
  <div>
    <label class="block">
      <input class="align-middle mr-2" v-model="value" type="checkbox" />
      <span class="font-bold">Exclude from navigation tree</span>
      <p class="text-xs">If selected, this item will not appear in the navigation tree.</p>
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
